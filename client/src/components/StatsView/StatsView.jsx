import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    <section>
        <Typography variant="display2" className={classes.root}>
            Statistics
        </Typography>
        <div className={classes.content}>
            <CurriculumSummary orgs={orgs} />
            <TopicsSummary orgs={orgs} />
        </div>
    </section>
);

export default withStyles(styles)(Stats);
