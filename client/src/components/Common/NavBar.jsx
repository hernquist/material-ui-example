import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Tabs, Tab, Toolbar, Tooltip, Typography } from '@material-ui/core';
import LinkButton from './LinkButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import RadioThemeSelector from './RadioThemeSelector';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    logo: {
        height: 40,
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        color: theme.palette.common.white,
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: theme.palette.common.white,
    },
    refresh: {
        marginLeft: 100,
        color: theme.palette.common.white,
    },
    tooltip: {
        color: theme.palette.secondary.main,
        backgroundColor: 'black',
    },
});

function getActiveTab() {
    const urlPath = window.location.pathname;
    if (urlPath.includes('/cards')) return 'cards';
    else if (urlPath.includes('/list')) return 'list';
    else if (urlPath.includes('/stats')) return 'stats';
    else if (urlPath.includes('/about')) return 'about';
    else return 'dashboard';
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'dashboard'
        };
    }
    componentWillMount() {
        this.setState({ activeTab: getActiveTab() || 'dashboard' });
    }
    handleChange = (event, activeTab) => {
        this.setState({ activeTab });
    };
    render() {
        const { themeName, updateTheme, refresh, classes } = this.props;
        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} aria-label="Menu">
                        {/* <MenuIcon /> */}
                        {/* <img src="/thd-logo.svg" className={classes.logo} /> */}
                        <img src="/om-logo.png" alt="Orange Method" className={classes.logo} />
                        {/* <img src="/orange-method-sticker.png" alt="Orange Method" className={classes.logo} /> */}
                    </IconButton>
                    <Typography variant="title" className={classes.title}>
                        Curriculum Dashboard
                    </Typography>

                    {/* {process.env.NODE_ENV === 'development' ?
                        <RadioThemeSelector themeName={themeName} update={updateTheme} /> :
                        null} */}
                    <RadioThemeSelector themeName={themeName} update={updateTheme} />
                    
                    <Tabs value={this.state.activeTab} onChange={this.handleChange}>
                        <Tab value="dashboard" label="Dashboard" component={LinkButton} to="/" />
                        <Tab value="cards" label="Organizations" component={LinkButton} to="/cards" />
                        <Tab value="list" label="List View" component={LinkButton} to="/list" />
                        <Tab value="stats" label="Statistics" component={LinkButton} to="/stats" />
                        <Tab value="about" label="About" component={LinkButton} to="/about" />
                    </Tabs>

                    <Tooltip
                        title="Refresh"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                    >
                        <IconButton
                            className={classes.refresh}
                            aria-label="Menu"
                            onClick={refresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        );
    }
}
    
export default withStyles(styles)(NavBar);