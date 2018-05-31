import React from 'react';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        transitionDelay: '100ms',
        position: 'absolute',
        left: '47%',    // 50% minus half the width of the animation
        top: '30%',
        margin: 0,
        padding: 0
    },
    progress: {
        margin: 0,
        padding: 0
    }
};

const LoadingAnimation = ({ loading, classes }) => (
    <div>
        <Fade
            in={loading}
            timeout={200}
            className={classes.root}
            unmountOnExit
        >
            <CircularProgress size={100} color="secondary" className={classes.progress} />
        </Fade>
    </div>
);

export default withStyles(styles)(LoadingAnimation);
