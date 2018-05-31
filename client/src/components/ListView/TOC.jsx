import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import partitionRepos from '../../partitionRepos';
import Link from '../Common/Link';

const level2 = {
    marginTop: 30,
    marginLeft: 10,
};

const level3 = {
    marginTop: 2,
    marginLeft: 30,
    marginRight: 12,
    fontSize: 12,
};

const styles = theme => ({
    root: {
        padding: 10,
        textAlign: 'left',
        color: theme.palette.text.primary,
    },
    badgeStyle: {
        marginTop: 20,
        color: theme.palette.text.secondary,
    },
});

const _CategoryLink = ({ org, title, count, classes }) => {
    return (
        count > 0 ? (
            <div className={classes.badgeStyle}>
                <Badge badgeContent={count}>
                    <Link style={level3} href={'#' + org.login + '-' + title}>
                        {title}
                    </Link>
                </Badge>
            </div>
         ) : null
    );
};

const CategoryLink = withStyles(styles)(_CategoryLink);

const TOC = ({ orgs, classes }) => {
    const orgList = orgs.map(org => {
        const { workshops, lessons, labs, demoApps, other } = partitionRepos(org.repos);
        return (
            <div key={org.id}>
                <Link style={level2} href={'#' + org.login}>
                    {org.login}
                </Link>
                <CategoryLink org={org} title="Workshops" count={workshops.length} />
                <CategoryLink org={org} title="Lessons" count={lessons.length} />
                <CategoryLink org={org} title="Labs" count={labs.length} />
                <CategoryLink org={org} title="Demo Apps" count={demoApps.length} />
                <CategoryLink org={org} title="other" count={other.length} />
            </div>
        );
    });

    return (
        <Paper elevation={6} className={classes.root}>
            {orgList}
        </Paper>
    );
};

export default withStyles(styles)(TOC);
