import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fade, Typography } from '@material-ui/core';
import CurriculumSummary from './CurriculumSummary';
import TopicsSummary from './TopicsSummary';

const styles = theme => ({
    root: {
        width: '100%',
        textAlign: 'center',
        margin: '50px auto',
        padding: theme.spacing.unit,
    },
    heading: {
        width: '100%',
        borderRadius: '10px',
    },
    content: {
        margin: 50,
        // maxWidth: '800px',
    }
});

const Stats = ({ orgs, classes }) => (
    <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
        <section>
            <Typography variant="display2" className={classes.root}>
                Statistics
            </Typography>
            <div className={classes.content}>
                <CurriculumSummary orgs={orgs} />
                <TopicsSummary orgs={orgs} />
            </div>
        </section>
    </Fade>
);

export default withStyles(styles)(Stats);
