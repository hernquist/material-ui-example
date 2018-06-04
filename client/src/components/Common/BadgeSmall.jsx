import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const RADIUS = 8;

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    badge: {
        top: -RADIUS,
        right: -RADIUS,
        fontSize: theme.typography.pxToRem(RADIUS),
        width: RADIUS * 2,
        height: RADIUS * 2,
    },
});

const BadgeSmall = props => {
    const { children, classes } = props;
    return (
        <Badge
            {...props}
            className={classes.root}
            classes={{ badge: classes.badge }}>{children}
        </Badge>
    );
};

export default withStyles(styles)(BadgeSmall);
