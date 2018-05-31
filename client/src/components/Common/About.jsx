import React from 'react';
import { List, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import toastr from '../../toastr';
import getApiUrl from '../../getApiUrl';
import { version as clientVersion } from '../../../package.json';
import ThemeColorBrowser from './ThemeColorBrowser';
import BuiltWithTech from './BuiltWithTech';
import reactLogoSvg from '../../react-logo.svg';
import materialUiLogoSvg from '../../material-ui-logo.svg';

const apiUrl = getApiUrl();

const styles = theme => {
    return {
        root: {
            // backgroundColor: theme.palette.common.white,
            textAlign: 'center',
            // width: '100%',
            maxWidth: '600px',
            margin: '50px auto',
            padding: theme.spacing.unit,
            borderRadius: '10px'
        },
        content: {
            marginTop: 10,
        },
        builtWith: {
            marginTop: 50,
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
            <section className={classes.root}>
                <Typography variant="display2" className={classes.content}>
                    OM Curriculum Roadmap
                </Typography>
                <Typography variant="caption" className={classes.content}>
                    Client Version: {clientVersion}
                </Typography>
                <Typography variant="caption" className={classes.content}>
                    Server Version: {this.state.serverVersion}
                </Typography>

                <Typography variant="headline" className={classes.builtWith}>
                    Built with:
                </Typography>
                
                <List dense={false}>
                    <BuiltWithTech
                        name="React"
                        version="16.4"
                        logoSrc={reactLogoSvg}
                        logoClassName={classes.reactLogo}
                        url="https://reactjs.org/"
                    />
                    <BuiltWithTech
                        name="Material
                        UI"
                        version="1.1"
                        logoSrc={materialUiLogoSvg}
                        logoClassName={classes.materialUiLogo}
                        url="https://material-ui.com"
                    />
                </List>

                {process.env.NODE_ENV === 'development' ?
                    <ThemeColorBrowser themeName={themeName} theme={theme} updateTheme={updateTheme} /> :
                    null}
            </section>
        );
    }
}

export default withStyles(styles)(About);
