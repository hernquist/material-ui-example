import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import OrgCard from './OrgCard';

const styles = theme => ({
    root: {
        // margin: '20px auto',
        // width: '100%',
    },
    centeredContainer: {
        // textAlign: 'center',
        // padding: '10px',
    }
});

const CardView = ({ orgs, classes }) => (
    <Grid container className={classes.root} justify="center" spacing={24}>
        {orgs.map(org => (
            <Grid key={org.organization.id} item>
                <OrgCard org={org.organization} />
            </Grid>
        ))}
    </Grid>
);

export default withStyles(styles)(CardView);
