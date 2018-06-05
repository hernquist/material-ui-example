import React from 'react';
import { Typography, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        width: '100%',
        textAlign: 'center',
        margin: '30px auto',
        // margin: '0 10px',
        // padding: theme.spacing.unit,
        // position: 'fixed',
        // top: '160px',
        // height: '88%',
    },
    heading: {
        width: '100%',
        borderRadius: '10px',
    },
    contentWrapper: {
        // overflow: 'hidden',
    },
    content: {
        // overflow: 'scroll',
        margin: 30,
    },
};

const MainContentContainer = ({ title, children, classes }) => (
    <Fade in={true} timeout={{ enter: 1000, exit: 1000 }}>
        <section className={classes.container}>
            <Typography variant="display2" className={classes.heading}>
                {title}
            </Typography>
            <article className={classes.contentWrapper}>
                <div className={classes.content}>
                    {children}
                </div>
            </article>
        </section>
    </Fade>
);

export default withStyles(styles, { withTheme: true })(MainContentContainer);
