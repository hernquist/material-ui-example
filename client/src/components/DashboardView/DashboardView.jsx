import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, List } from '@material-ui/core';
import RepoDashboardItem from './RepoDashboardItem';

const styles = theme => ({
    root: {
    },
    title: {
        // color: theme.palette.primary.dark,
    },
    
    content: {        
        // maxWidth: '800px',
    }
});

const compareObjectsByProperty = propName => (a, b) => a[propName] < b[propName] ? 1 : -1;

const RECENT_DAYS = 15;

const getRepoLastUpdatedDate = repo => (
    repo.defaultBranchRef ? new Date(repo.defaultBranchRef.target.history.edges[0].node.author.date) : new Date(repo.updatedAt)
);

const DashboardView = ({ orgs, classes }) => {
    const allRepos = orgs ? orgs.reduce((repos, org) => repos.concat(org.organization.repositories.nodes), []) : [];
    const now = new Date();
    const numDaysToInclude = RECENT_DAYS * 24 * 60 * 60 * 1000;
    const newRepos = allRepos.filter(repo => {
        const createdAt = new Date(repo.createdAt);
        return now - createdAt < numDaysToInclude;
    }).sort(compareObjectsByProperty('createdAt'));
    const newReposList = newRepos.map(repo => <RepoDashboardItem key={repo.id} repo={repo} />);

    const updatedRepos = allRepos.filter(repo => {
        const updatedAt = getRepoLastUpdatedDate(repo);
        return now - updatedAt < numDaysToInclude;
    }).sort((a, b) => getRepoLastUpdatedDate(a) < getRepoLastUpdatedDate(b));
    const updatedReposList = updatedRepos.map(repo => <RepoDashboardItem key={repo.id} repo={repo} />);

    return (        
        <Grid container spacing={40} justify="center">
            <Grid item xs={12} md={4}>
                <Typography variant="title" className={classes.title}>
                    Newly Created Repos
                </Typography>
                <div className={classes.demo}>
                    <List dense={false}>
                        {newReposList}
                    </List>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="title" className={classes.title}>
                    Recently Updated Repos
                </Typography>
                <div className={classes.demo}>
                    <List dense={false}>
                        {updatedReposList}
                    </List>
                </div>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(DashboardView);
