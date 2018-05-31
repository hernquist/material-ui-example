import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './summaryStyles';

const Summary = ({ id, title, subtitle, summaryItems, cols, dtWidth, ddWidth, classes, className }) => {
    const summaryList = [];
    for (let key in summaryItems) {
        summaryList.push(<dt className={classes.dt} style={{ width: dtWidth }} key={key}>{key}</dt>);
        summaryList.push(<dd className={classes.dd} style={{ width: ddWidth }} key={key + key}>{summaryItems[key]}</dd>);
    }
    if (!cols) {
        cols = 1;
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="headline" component="h2" id={id}>
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {subtitle}
                </Typography>
                <Typography component="dl" className={classes.dl} style={{ columnCount: cols }}>
                    {summaryList}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(Summary);
