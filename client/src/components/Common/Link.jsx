import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        color: theme.palette.secondary.main,
    },
});

const Link = (props) => {
    const { href, children, classes } = props;
    return (
        <Typography component="a" className={classes.root} href={href} {...props}>
            {children}
        </Typography>
    );
};

export default withStyles(styles)(Link);