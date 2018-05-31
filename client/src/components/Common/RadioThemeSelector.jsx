import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
    root: {
        marginRight: 150,
        color: theme.palette.primary.contrastText,
    },
});

const RadioThemeSelector = ({ themeName, update, classes }) => {
    return (
    <div className={classes.root}>
        <Radio
            checked={themeName === 'light'}
            onChange={event => update(event.target.value)}
            value="light"
            name="radio-theme-selector"
            aria-label="light"
        />
        <Radio
            checked={themeName === 'dark'}
            onChange={event => update(event.target.value)}
            value="dark"
            name="radio-theme-selector"
            aria-label="dark"
        />
        <Radio
            checked={themeName === 'custom'}
            onChange={event => update(event.target.value)}
            value="custom"
            name="radio-theme-selector"
            aria-label="custom"
        />
    </div>
    )
};

RadioThemeSelector.propTypes = {
    themeName: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioThemeSelector);
