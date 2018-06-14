import React from 'react';
import { withState, compose } from 'recompose';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
    Collapse,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from '../Common/Link';
import LinkButton from '../Common/LinkButton';
import GitHubIcon from '../Common/GitHubIcon';

// import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import getRepoCategory from '../../getRepoCategory';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

const getRepoLastUpdatedDate = repo => (
    repo.defaultBranchRef ? new Date(repo.defaultBranchRef.target.history.edges[0].node.author.date) : new Date(getRepoLastUpdatedDate(repo))
);

const styles = theme => ({
    root: {
        width: '95%',
    },
    button: {
        width: 'auto',
        height: 'auto',
        color: theme.palette.secondary.main,
    },
    primary: {
        color: theme.palette.secondary.main,
    },
    secondary: {
    },
    in: {
        color: theme.palette.text.secondary,
    },
    orgName: {
        color: theme.palette.primary.dark,
        fontStyle: 'italic',
    },
    description: {
        color: theme.palette.primary.dark,
        fontStyle: 'italic',
    },
    timeStamp: {
        color: theme.palette.primary.dark,
        marginLeft: 5,
    },
    timeAgo: {
        color: theme.palette.secondary.main,
        marginLeft: 5,
    },
    tooltip: {
        color: theme.palette.secondary.main,
        backgroundColor: 'black',
    },
    inline: {
        display: 'inline',
        color: theme.palette.secondary.main,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    collapse: {
        marginLeft: 60,
    },
});


const formatDate = date => new Date(date).toLocaleDateString();
const formatTime = date => new Date(date).toLocaleTimeString();
const getTimeAgo = date => timeAgo.format(date);

const _RepoDashboardItem = ({ repo, openCommits, setOpenCommits, classes }) => {

    const getDateTimeStamp = date => (
        <React.Fragment>
            <span className={classes.timeStamp}>{formatDate(date)}</span>
            <span style={{ marginLeft: 3 }}>@</span>
            <span className={classes.timeStamp}>{formatTime(date)}</span>
            <span className={classes.timeAgo}> ({getTimeAgo(new Date(date))})</span>
        </React.Fragment>
    );

    const secondaryText = (
        <React.Fragment>
            <Typography className={classes.description} variant="caption">
                {repo.description}
            </Typography>
            <Typography variant="caption">
                Created: {getDateTimeStamp(repo.createdAt)}
            </Typography>
            <Typography variant="caption">
                Updated: {getDateTimeStamp(getRepoLastUpdatedDate(repo))}
            </Typography>
            <Typography variant="caption">
                {openCommits ? 'Hide' : 'Show'} Recent commits:

                <IconButton
                    color="primary"
                    size="small"
                    className={classnames(classes.button, classes.expand, {
                        [classes.expandOpen]: openCommits,
                    })}
                    onClick={() => setOpenCommits(!openCommits)}
                    aria-expanded={openCommits}
                    aria-label="Show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Typography>
        </React.Fragment>
    );

    const repoNameWithOrgName =
        <React.Fragment>
            <span>{repo.name}</span>
            <span className={classes.in}> in </span>
            <span className={classes.orgName}>{repo.owner.login}</span>
        </React.Fragment>;

    return (
        <React.Fragment>
            <ListItem className={classes.root}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={repoNameWithOrgName}
                    secondary={secondaryText}
                    classes={{ primary: classes.primary, secondary: classes.secondary }}
                />
                <ListItemSecondaryAction>
                    <LinkButton
                        aria-label="Details"
                        to={`/cards/orgs/${repo.owner.id}#${getRepoCategory(repo)}`}
                        className={classes.inline}
                    >
                        <Tooltip
                            title="Details"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <ExitToAppIcon />
                        </Tooltip>
                    </LinkButton>
                    <Link
                        aria-label="Navigate to GitHub Repository"
                        href={repo.url}
                        className={classes.inline}
                    >
                        <Tooltip
                            title="GitHub"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <GitHubIcon />
                        </Tooltip>
                    </Link>
                </ListItemSecondaryAction>
            </ListItem>
            
            <Collapse
                in={openCommits}
                timeout="auto"
                unmountOnExit
                classes={{wrapper: classes.collapse}}
            >
                <List>
                    {repo.defaultBranchRef.target.history.edges.map((e, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <GitHubIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography>{e.node.message}</Typography>}
                                secondary={(
                                    <React.Fragment>
                                        <Typography variant="caption">Created by: {e.node.author.name}</Typography>
                                        <Typography variant="caption">Created on: {getDateTimeStamp(e.node.author.date)}</Typography>
                                    </React.Fragment>
                                )}
                                classes={{ primary: classes.primary, secondary: classes.secondary }}
                            />
                        </ListItem> 
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

const withOpenCommits = withState('openCommits', 'setOpenCommits', false);
const RepoDashboardItem = withOpenCommits(_RepoDashboardItem);

export default withStyles(styles)(RepoDashboardItem);
