import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

const ThemeSelector = ({ theme, update, classes }) => (
    <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Choose a Theme:</FormLabel>
            <RadioGroup
                aria-label="theme"
                name="theme"
                className={classes.group}
                value={theme}
                onChange={event => update(event.target.value)}
            >
                <FormControlLabel value="light" control={<Radio />} label="Light" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                <FormControlLabel value="custom" control={<Radio />} label="Custom" />
            </RadioGroup>
        </FormControl>
    </div>
);

ThemeSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
};

export default withStyles(styles)(ThemeSelector);
