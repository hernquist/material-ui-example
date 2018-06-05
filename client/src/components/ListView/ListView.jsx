import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import TOC from './TOC';
import Org from './Org';
import styles from './listViewStyles';

const ListView = ({ orgs, classes }) => {
    const orgList = orgs.map(org => <Org key={org.organization.id} org={org.organization} />);
    return (
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
    );
};

export default withStyles(styles)(ListView);
