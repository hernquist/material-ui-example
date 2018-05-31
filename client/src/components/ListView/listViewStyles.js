export default {
    root: {
        textAlign: 'center',
        margin: '50px auto',
    },
    flexContainer: {
        position: 'fixed',
        top: '200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '88%',
        width: '100%',
        margin: '0 10px'
    },
    flexLeft: {
        display: 'flex',
        flex: 1
    },
    flexRight: {
        display: 'flex',
        flex: 4,
        width: '100%',
        boxSizing: 'content-box',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        overflow: 'hidden'
    },
    flexScroll: {
        overflowY: 'scroll',
        width: '100%',
        paddingRight: '10px'
    },
};
