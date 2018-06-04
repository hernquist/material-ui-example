import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fade, Grid, Typography } from '@material-ui/core';
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
    <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
        <section className={classes.root}>
            <article className={classes.centeredContainer}>
                <Typography variant="display2" className={classes.title}>
                    Organizations
                </Typography>
                <div>
                    <Grid container className={classes.root} justify="center" spacing={24}>
                    {orgs.map(org => (
                        <Grid key={org.organization.id} item>
                            <OrgCard org={org.organization} />
                        </Grid>
                    ))}
                    </Grid>
                </div>
            </article>
        </section>
    </Fade>
);

export default withStyles(styles)(CardView);
