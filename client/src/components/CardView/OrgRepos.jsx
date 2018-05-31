import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import partitionRepos from '../../partitionRepos';
import Repo from '../Common/Repo';
import BadgeSmall from '../Common/BadgeSmall';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

function getActiveTab() {
    const hash = window.location.hash;
    if (hash === '#workshops') return 'workshops';
    else if (hash === '#lessons') return 'lessons';
    else if (hash === '#labs') return 'labs';
    else if (hash === '#demoApps') return 'demoApps';
    else if (hash === '#other') return 'other';
    else return 'workshops';
}

class OrgRepos extends React.Component {
    state = {
        activeTab: 'workshops',
    };

    handleChange = (event, activeTab) => {
        this.setState({ activeTab });
    };

    componentWillMount() {
        this.setState({ activeTab: getActiveTab() });
    }

    render() {
        const { repos, classes } = this.props;
        const { activeTab } = this.state;

        const { workshops, lessons, labs, demoApps, other } = partitionRepos(repos);

        // const Workshops = `Workshops - ${workshops.length}`;
        const Workshops = workshops.length > 0 ? workshops.map(repo => <Repo key={repo.id} repo={repo} />) : 'None';
        const Lessons = lessons.length > 0 ? lessons.map(repo => <Repo key={repo.id} repo={repo} />) : 'None';
        const Labs = labs.length > 0 ? labs.map(repo => <Repo key={repo.id} repo={repo} />) : 'None';
        const DemoApps = demoApps.length > 0 ? demoApps.map(repo => <Repo key={repo.id} repo={repo} />) : 'None';
        const Other = other.length > 0 ? other.map(repo => <Repo key={repo.id} repo={repo} />) : 'None';

        const getBadge = (label, count) => (
            <BadgeSmall
                badgeContent={count}
                color="secondary"
            >{label}
            </BadgeSmall>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs centered value={activeTab} onChange={this.handleChange}>
                        <Tab value="workshops" label={getBadge("Workshops", workshops.length)} href="#workshops" />
                        <Tab value="lessons" label={getBadge("Lessons", lessons.length)} href="#lessons" />
                        <Tab value="labs" label={getBadge("Labs", labs.length)} href="#labs" />
                        <Tab value="demoApps" label={getBadge("Demo Apps", demoApps.length)} href="#demoApps" />
                        <Tab value="other" label={getBadge("Other", other.length)} href="#other" />
                    </Tabs>
                </AppBar>
                {activeTab === 'workshops' && <TabContainer>{Workshops}</TabContainer>}
                {activeTab === 'lessons' && <TabContainer>{Lessons}</TabContainer>}
                {activeTab === 'labs' && <TabContainer>{Labs}</TabContainer>}
                {activeTab === 'demoApps' && <TabContainer>{DemoApps}</TabContainer>}
                {activeTab === 'other' && <TabContainer>{Other}</TabContainer>}
            </div>
        );
    }
}

OrgRepos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgRepos);
