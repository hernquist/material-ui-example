import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CurriculumSummary from './CurriculumSummary';
import TagsAndTopicsSummary from './TagsAndTopicsSummary';

const styles = theme => ({
});

const Stats = ({ orgs, classes }) => (
    <React.Fragment>
        <CurriculumSummary orgs={orgs} />
        <TagsAndTopicsSummary orgs={orgs} />
    </React.Fragment>       
);

export default withStyles(styles)(Stats);
