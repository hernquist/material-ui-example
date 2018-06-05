import React from 'react';
import { List, Typography, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import toastr from '../../toastr';
import getApiUrl from '../../getApiUrl';
import { version as clientVersion } from '../../../package.json';
import BuiltWithTech from './BuiltWithTech';
import reactLogoSvg from '../../react-logo.svg';
import materialUiLogoSvg from '../../material-ui-logo.svg';
import graphqlLogoSvg from '../../graphql-logo.svg';

const apiUrl = getApiUrl();

const styles = theme => {
    return {
        version: {
            marginTop: 10,
        },
        builtWith: {
            marginTop: 50,
        },
        list: {
            maxWidth: '400px',
            margin: '0 auto',
        },
        reactLogo: {
            animation: 'App-logo-spin infinite 20s linear',
            width: 100,
            height: 100,
        },
        materialUiLogo: {
            width: 60,
            height: 60,
            marginRight: 20,
        },
        graphqlLogo: {
            width: 60,
            height: 60,
            marginRight: 20,
        },
    }
};

class About extends React.Component {
    state = {
        serverVersion: '',
    };
    componentDidMount() {
        axios.get(apiUrl + '/version')
            .then((res) => {
                this.setState({
                    serverVersion: res.data.version
                });
            })
            .catch(function (error) {
                toastr.error(error);
            });
    }
    render() {
        const { themeName, theme, updateTheme, classes } = this.props;
        return (
            <section>
                <Typography variant="caption" className={classes.version}>
                    Client Version: {clientVersion}
                </Typography>
                <Typography variant="caption" className={classes.version}>
                    Server Version: {this.state.serverVersion}
                </Typography>
                <Typography variant="headline" className={classes.builtWith}>
                    Built with:
                </Typography>
                
                <List dense={false} className={classes.list}>
                    <BuiltWithTech
                        name="React"
                        version="16.4"
                        logoSrc={reactLogoSvg}
                        logoClassName={classes.reactLogo}
                        url="https://reactjs.org/"
                    />
                    <BuiltWithTech
                        name="Material UI"
                        version="1.1"
                        logoSrc={materialUiLogoSvg}
                        logoClassName={classes.materialUiLogo}
                        url="https://material-ui.com"
                    />
                    <BuiltWithTech
                        name="graphql-request (client for GraphQL)"
                        version="1.6"
                        logoSrc={graphqlLogoSvg}
                        logoClassName={classes.graphqlLogo}
                        url="https://github.com/prismagraphql/graphql-request"
                    />
                </List>
            </section>
        );
    }
}

export default withStyles(styles)(About);
