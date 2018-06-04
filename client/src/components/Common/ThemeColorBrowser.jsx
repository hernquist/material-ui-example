import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import loremIpmsum from '../../loremipsum';
import { getTextStyles, getBackgroundStyles } from '../../PaletteStyles';

const styles = theme => {
    const themeTextStyles = getTextStyles(theme).reduce((obj, textStyle) => {
        textStyle.flavors.forEach(flavor => {
            obj[flavor.className] = {
                color: flavor.color,
                backgroundColor: flavor.backgroundColor
            };
        });
        return obj;
    }, {});

    const themeBackgroundStyles = getBackgroundStyles(theme).reduce((obj, backgroundStyle) => {
        obj[backgroundStyle.className] = {
            backgroundColor: backgroundStyle.backgroundColor
        };
        return obj;
    }, {});

    const otherStyles = {
        root: {
            marginTop: 100,
        },
        panel: {
            width: '100%',
            position: 'static',
            marginTop: 20,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        details: {
            display: 'block',
            textAlign: 'left',
        },
        background: {
            textAlign: 'center',
            position: 'relative',
            marginTop: 20,
            border: '1px solid black',
            height: 200,
        },
        backgroundContent: {
            position: 'absolute',
            top: '40%',
            height: 200,
            width: '100%',
            // marginTop: '-50px',    // account for padding and border if not using box-sizing: border-box;
        },
    };

    return { ...themeTextStyles, ...themeBackgroundStyles, ...otherStyles };
};

const ThemeColorBrowser = ({ themeName, theme, updateTheme, classes }) => {
    const textStylesList = getTextStyles(theme).map(textStyle => (
        textStyle.flavors.map(flavor => (
            <div key={flavor.paletteName} className={classes.section}>
                <Typography variant="headline" className={classes[flavor.className]}>{flavor.name} <span className={classes.smallText}>({flavor.paletteName})</span></Typography>
                <Typography className={classes[flavor.className]}>{loremIpmsum}</Typography>
            </div>
        ))
    ));
    const backgroundStylesList = getBackgroundStyles(theme).map(backgroundStyle => (
        <div key={backgroundStyle.paletteName} className={`${classes.background} ${classes[backgroundStyle.className]}`}>
            <div className={classes.backgroundContent}>
                <Typography variant="headline" className={`${classes.textPrimary}`}>{backgroundStyle.name}</Typography>
                <Typography variant="subheading" className={`${classes.textPrimary}`}>({backgroundStyle.paletteName})</Typography>
            </div>
        </div>
    ));

    return (
        <section className={classes.root}>
            <Typography className={classes.display3}>Theme Color Browser</Typography>
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Text Colors</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    {textStylesList}
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Background Colors</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    {backgroundStylesList}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </section>
    );
};

export default withStyles(styles)(ThemeColorBrowser);
