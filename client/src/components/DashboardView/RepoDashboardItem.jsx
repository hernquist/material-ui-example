import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Tooltip,
    ListItem,
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
import getRepoCategory from '../../getRepoCategory';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

function getTimeAgo(date) {
    return timeAgo.format(date);
}

const styles = theme => ({
    primary: {
        color: theme.palette.secondary.main,
    },
    secondary: {
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
});

const RepoDashboardItem = ({ org, repo, classes }) => {
    const createdAtDate = new Date(repo.created_at);
    const createdAtTimeAgo = getTimeAgo(createdAtDate);
    
    const updatedAtDate = new Date(repo.updated_at);
    const updatedAtTimeAgo = getTimeAgo(updatedAtDate);
    
    const secondaryText = (
        <span>
            <Typography className={classes.description} variant="caption">
                {repo.description}
            </Typography>
            <Typography variant="caption" style={{}}>
                Created:
                <span className={classes.timeStamp}>{createdAtDate.toLocaleDateString()}</span>
                <span style={{ marginLeft: 3 }}>@</span>
                <span className={classes.timeStamp}>{createdAtDate.toLocaleTimeString()}</span>
                <span className={classes.timeAgo}> ({createdAtTimeAgo})</span>
            </Typography>
            <Typography variant="caption" style={{}}>
                Updated:
                <span className={classes.timeStamp}>{updatedAtDate.toLocaleDateString()}</span>
                <span style={{ marginLeft: 3 }}>@</span>
                <span className={classes.timeStamp}>{updatedAtDate.toLocaleTimeString()}</span>
                <span className={classes.timeAgo}> ({updatedAtTimeAgo})</span>
            </Typography>
        </span>
    );
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={repo.name}
                secondary={secondaryText}
                classes={{ primary: classes.primary, secondary: classes.secondary }}
            />
            <ListItemSecondaryAction>
                <LinkButton aria-label="Details" to={`/cards/orgs/${org.id}#${getRepoCategory(repo)}`} className={classes.inline}>
                    <Tooltip
                        title="Details"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                    >
                        <ExitToAppIcon />
                    </Tooltip>
                </LinkButton>
                <Link aria-label="Navigate to GitHub Repository" href={repo.html_url} className={classes.inline}>
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
    );
};

export default withStyles(styles)(RepoDashboardItem);
