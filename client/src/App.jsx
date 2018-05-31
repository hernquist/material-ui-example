import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import DashboardView from './components/DashboardView/DashboardView';
import StatsView from './components/StatsView/StatsView';
import CardView from './components/CardView/CardView';
import ListView from './components/ListView/ListView';
import OrgDetails from './components/CardView/OrgDetails';
import About from './components/Common/About';
import WindowResizeTracker from './components/Common/WindowResizeTracker';
import LoadingAnimation from './components/Common/LoadingAnimation';

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
                    const numRepos = orgs.reduce((sum, org) => sum + org.repos.length, 0);
                    const cachedMessage = orgData.gitHubRequests > 0 ? '.' : ' (fetched cached data).';
                    const message = `Fetched ${numRepos} repos from ${orgs.length} orgs ` +
                        `using ${orgData.gitHubRequests} GitHub API requests ${cachedMessage}`;
                    if (orgData.gitHubRequests > 0) {
                        toastr.success(message);
                    }
                    else {
                        toastr.info(message);
                    }
                }
            }, 300);
        } catch (error) {
            toastr.error(error);
            return [];
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
                        <Route exact path="/" render={() => <DashboardView orgs={orgs} />} />
                        <Route exact path="/stats" render={() => <StatsView orgs={orgs} />} />
                        <Route exact path="/cards" render={() => <CardView orgs={orgs} />} />
                        <Route path="/cards/orgs/:id" render={props => {
                            const id = Number(props.match.params.id);
                            const org = this.state.orgs.find(o => o.id === id);
                            return <OrgDetails org={org} { ...props } />;
                        }}/>
                        
                        <Route path="/list" render={() => <ListView orgs={orgs} />} />
                        <Route exact path="/about" render={props => <About themeName={this.state.themeName} theme={themes[this.state.themeName]} updateTheme={this.updateTheme} />} />
                    </Switch>
                </main>
            );
        return (
            <MuiThemeProvider theme={themes[this.state.themeName]}>
                <WindowResizeTracker>
                    <CssBaseline />
                    <section style={{ height: "100%" }}>
                        <header>
                            <NavBar themeName={this.state.themeName} updateTheme={this.updateTheme} refresh={() => this.getOrgData(true)} />
                        </header>
                        {mainContent}
                    </section>
                </WindowResizeTracker>
            </MuiThemeProvider>
        );
    }
}

export default App;
