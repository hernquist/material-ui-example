import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Repo from '../Common/Repo';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        paddingTop: '40px',
        color: theme.palette.secondary.main,
    },
});

const RepoCategory = ({ org, title, repos, classes }) => {
    const repoList = repos.length > 0 ? repos.map(repo => <Repo key={repo.id} repo={repo} />) : null;
    return (
        repos.length > 0 ? (
            <div>
                <Typography id={org.name + '-' + title} variant="headline" className={classes.root}>
                    {title}
                </Typography>
                {repoList}
            </div>
        ) : null
    );
}

export default withStyles(styles)(RepoCategory);
