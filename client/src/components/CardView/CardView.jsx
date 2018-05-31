import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import OrgCard from './OrgCard';

const styles = theme => ({
    root: {
        margin: '20px auto',
        width: '100%',
    },
    centeredContainer: {
        textAlign: 'center',
        padding: '10px',
    }
});

const CardView = ({ orgs, classes }) => (
    <section className={classes.root}>
        <article className={classes.centeredContainer}>
            <Typography variant="display2" className={classes.title}>
                Organizations
            </Typography>
            <div>
                <Grid container className={classes.root} justify="center" spacing={24}>
                {orgs.map(org => (
                    <Grid key={org.id} item>
                        <OrgCard org={org} />
                    </Grid>
                ))}
                </Grid>
            </div>
        </article>
    </section>
);

export default withStyles(styles)(CardView);
