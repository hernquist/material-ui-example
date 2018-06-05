import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';

import MainContentContainer from './components/Common/MainContentContainer';
import DashboardView from './components/DashboardView/DashboardView';
import StatsView from './components/StatsView/StatsView';
import CardView from './components/CardView/CardView';
import ListView from './components/ListView/ListView';
import OrgDetails from './components/CardView/OrgDetails';
import About from './components/Common/About';
import WindowResizeTracker from './components/Common/WindowResizeTracker';
import LoadingAnimation from './components/Common/LoadingAnimation';
import ThemeColorBrowser from './components/Common/ThemeColorBrowser';

import getApiUrl from './getApiUrl';
import toastr from './toastr';
import NavBar from './components/Common/NavBar';

import 'toastr/build/toastr.min.css';
import 'typeface-roboto';

const themes = {
    light: createMuiTheme({
        palette: {
            type: 'light',
        },
    }),
    dark: createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                light: '#000088',
                main: '#3F51B5',
                dark: blue[100],
                contrastText: '#fff',
            },
            secondary: {
                light: deepPurple[500],
                main: orange[100],
                dark: deepPurple[50],
                contrastText: '#000',
            }
        },
    }),
    custom: createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                light: '#757ce8',
                main: '#444444',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#F96302',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
        status: {
            danger: 'red',
        },
    }),
};

const apiUrl = getApiUrl() + '/orgs';

function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    toastr.error(error);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orgs: [],
            themeName: 'custom',
        };
    }

    updateTheme = themeName => {
        this.setState({ themeName })
    }

    getOrgData = async (forceRefresh = false) => {
        try {
            this.setState({ loading: true });
            // get the orgs and repos
            const url = apiUrl + (forceRefresh ? '?refresh=true' : '');
            const orgData = (await axios.get(url)).data;
            const orgs = orgData.orgs;
            setTimeout(() => {
                this.setState({
                    loading: false,
                    orgs
                });
                if (orgs) {
                    const numRepos = orgs.reduce((sum, org) => sum + org.organization.repositories.nodes.length, 0);
                    const message = `Fetched ${numRepos} repos from ${orgs.length} orgs ` +
                        `using ${orgData.gitHubRequests} GraphQL request.`;
                    if (orgData.gitHubRequests > 0) {
                        toastr.success(message);
                    }
                    else {
                        toastr.info(message);
                    }
                }
            }, 300);
        } catch (error) {
            handleError(error);
            this.setState({ loading: false, orgs: [] });
        }
    }

    componentDidMount() {
        this.getOrgData();
    }

    render() {
        const { loading, orgs } = this.state;

        const mainContent = loading ? 
            <LoadingAnimation loading={loading} /> :
            (
                <main>
                    <Switch>
                        <Route
                            exact path="/"
                            render={routeProps => (
                                <MainContentContainer title="Dashboard">
                                    <DashboardView
                                        orgs={orgs}
                                        {...routeProps}
                                    />
                                </MainContentContainer>
                            )}
                        />
                        <Route
                            exact path="/stats"
                            render={routeProps => (
                                <MainContentContainer title="Statistics">
                                    <StatsView
                                        orgs={orgs}
                                        {...routeProps}
                                    />
                                </MainContentContainer>
                            )}
                        />
                        <Route
                            exact path="/cards"
                            render={routeProps => (
                                <MainContentContainer title="Organizations">
                                    <CardView
                                        orgs={orgs}
                                        {...routeProps}
                                    />
                                </MainContentContainer>
                            )}
                        />
                        {/* TODO: move this route to the CardView component */}
                        <Route path="/cards/orgs/:id" render={routeProps => {
                            const id = routeProps.match.params.id;
                            const org = this.state.orgs.find(o => o.organization.id === id);
                            return (
                                <OrgDetails
                                    org={org.organization}
                                    { ...routeProps }
                                />
                            );
                        }}/>
                        
                        <Route
                            path="/list"
                            render={routeProps => (
                                <MainContentContainer title="Organizations">
                                    <ListView
                                        orgs={orgs}
                                        {...routeProps}
                                />
                                </MainContentContainer>
                            )}
                        />
                        <Route
                            exact path="/about"
                            render={routeProps => (
                                <MainContentContainer title="About">
                                    <About
                                        { ...routeProps }
                                    />
                                    {process.env.NODE_ENV === 'development' ?
                                        <div style={{ marginTop: 100 }}>
                                            <ThemeColorBrowser
                                                themeName={this.state.themeName}
                                                theme={themes[this.state.themeName]}
                                                updateTheme={this.updateTheme} />
                                        </div> : null}
                                </MainContentContainer>
                            )}
                        />
                    </Switch>
                </main>
            );
        return (
            <MuiThemeProvider theme={themes[this.state.themeName]}>
                <WindowResizeTracker>
                    <CssBaseline />
                    <section style={{ height: "100%" }}>
                        <header style={{ zIndex: 10}}>
                            <NavBar
                                themeName={this.state.themeName}
                                updateTheme={this.updateTheme}
                                refresh={() => this.getOrgData(true)}
                            />
                        </header>
                        {mainContent}
                    </section>
                </WindowResizeTracker>
            </MuiThemeProvider>
        );
    }
}

export default App;
