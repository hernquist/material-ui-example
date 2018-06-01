import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fade, Paper, Typography } from '@material-ui/core';
import TOC from './TOC';
import Org from './Org';
import styles from './listViewStyles';

const ListView = ({ orgs, classes }) => {
    const orgList = orgs.map(org => <Org key={org.id} org={org} />);
    return (
        <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
            <section className={classes.root}>
                <Typography id="om-orgs" variant="display2" className={classes.root}>
                    Organizations
                </Typography>
                <Paper className={classes.flexContainer} elevation={6}>
                    <div className={classes.flexLeft}>
                        <div className={classes.flexScroll}>
                            <TOC orgs={orgs} />
                        </div>
                    </div>
                    <div className={classes.flexRight}>
                        <div className={classes.flexScroll}>
                            {orgList}
                        </div>
                    </div>
                </Paper>
            </section>
        </Fade>
    );
};

export default withStyles(styles)(ListView);
