export default theme => ({
    root: {
        textAlign: 'center',
        width: '100%',
        minWidth: '20px',
        // backgroundColor: grey[50],
        border: '1px solid lightgrey',
        borderRadius: '10px',
        margin: '20px auto',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    dl: {
        columnGap: '40px',
        columnRule: '1px solid lightblue',
        '&:after': {
            content: "",
            display: 'table',
            clear: 'both'
        }
    },
    dt: {
        color: theme.palette.text.secondary,
        float: 'left',
        width: '60%',
        textAlign: 'right',
        padding: '.25em',
        clear: 'left',
        '&:after': {
            content: '":"'
        },
    },
    dd: {
        color: theme.palette.text.primary,
        float: 'left',
        width: '30%',
        padding: '.25em 0',
        textAlign: 'left'
    }
});