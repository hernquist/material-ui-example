import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Button, Typography, Tooltip } from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LinkButton from '../Common/LinkButton';
import GitHubIcon from '../Common/GitHubIcon';

const styles = theme => ({
    root: {
        // maxWidth: 345,
        width: 320,
        height: 320,
    },
    media: {
        width: 120,
        height: 120,
        margin: '0 auto',
        // paddingTop: '56.25%', // 16:9
    },
    description: {
        minHeight: 40,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'static',
    },
    actions: {
        display: 'block',
    },
    tooltip: {
        color: theme.palette.secondary.main,
        backgroundColor: 'black',
    },
});

const OrgCard = ({ org, classes }) => {
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                // image="/contemplative-reptile.jpg"
                // image="https://picsum.photos/120?random"
                image={org.avatar_url}
                title={org.login}
            >
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {org.login}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {org.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="fab" component="a" href={org.html_url} aria-label="add" className={classes.button}>
                    <Tooltip
                        title="GitHub"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                    >
                        <GitHubIcon />
                    </Tooltip>
                </Button>
                <LinkButton to={`/cards/orgs/${org.id}`} variant="fab" aria-label="details" className={classes.button}>
                    <Tooltip
                        title="Details"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                    >
                        <ArrowForwardIcon />
                    </Tooltip>
                </LinkButton>
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(OrgCard);
