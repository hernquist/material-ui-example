import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    ButtonBase,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';
import Link from '../Common/Link';

const styles = theme => ({
    root: {
        // width: 200,
    },
    image2: {
        position: 'relative',
        height: 200,
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    focusVisible: {},
});

function MediaControlCard(props) {
    const { name, version, logoSrc, logoClassName, url, theme, classes } = props;
    const logo = <img src={logoSrc} className={logoClassName} alt={name} />;
    return (
        <ListItem className={classes.root}>
            <ListItemText
                primary={name}
                secondary={`version: ${version}`}
            />
            <ListItemSecondaryAction>
                <Link aria-label={name} href={url} className={classes.inline}>
                    <ButtonBase
                        focusRipple
                        key={name}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                    >
                        {logo}
                    </ButtonBase>
                </Link>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
