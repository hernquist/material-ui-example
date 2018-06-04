import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import BadgeSmall from '../Common/BadgeSmall';
import partitionRepos from '../../partitionRepos';
import Link from '../Common/Link';

const level2 = {
    marginTop: 10,
    marginLeft: 10,
    textDecoration: 'none',
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
        // marginTop: 12,
        // color: theme.palette.text.secondary,
    },
    badgeRoot: {
        margin: theme.spacing.unit,
        padding: 0, // `0 ${theme.spacing.unit * 2}px`,
    },
    badge: {
        top: 0,
    },
    link: {
        textDecoration: 'none',
    },
});

const _CategoryLink = ({ org, title, count, classes }) => {
    return (
        count > 0 ? (
            <div className={classes.badgeStyle}>
                <BadgeSmall badgeContent={count} color="secondary" classes={{ root: classes.badgeRoot, badge: classes.badge }}>
                    <Link style={level3} href={'#' + org.organization.name + '-' + title} className={classes.link}>
                        {title}
                    </Link>
                </BadgeSmall>
            </div>
         ) : null
    );
};

const CategoryLink = withStyles(styles)(_CategoryLink);

const TOC = ({ orgs, classes }) => {
    const orgList = orgs.map(org => {
        const { workshops, lessons, labs, demoApps, other } = partitionRepos(org.organization.repositories.nodes);
        return (
            <div key={org.organization.id}>
                <Link style={level2} href={'#' + org.organization.name}>
                    {org.organization.name}
                </Link>
                <CategoryLink org={org} title="Workshops" count={workshops.length} />
                <CategoryLink org={org} title="Lessons" count={lessons.length} />
                <CategoryLink org={org} title="Labs" count={labs.length} />
                <CategoryLink org={org} title="Demo Apps" count={demoApps.length} />
                <CategoryLink org={org} title="Other" count={other.length} />
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
