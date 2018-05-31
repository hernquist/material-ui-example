const getTextStyles = theme => ([{
        groupName: 'text',
        flavors: [{
                name: 'Text Primary',
                className: 'textPrimary',
                paletteName: 'theme.palette.text.primary',
                color: theme.palette.text.primary
            },
            {
                name: 'Text Secondary',
                className: 'textSecondary',
                paletteName: 'theme.palette.text.secondary',
                color: theme.palette.text.secondary
            },
            {
                name: 'Text Disabled',
                className: 'textDisabled',
                paletteName: 'theme.palette.text.disabled',
                color: theme.palette.text.disabled
            },
            {
                name: 'Text Hint',
                className: 'textHint',
                paletteName: 'theme.palette.text.hint',
                color: theme.palette.text.hint
            },
        ]
    },
    {
        groupName: 'primary',
        flavors: [{
                name: 'Primary Light',
                className: 'primaryLight',
                paletteName: 'theme.palette.primary.light',
                color: theme.palette.primary.light
            },
            {
                name: 'Primary Main',
                className: 'primaryMain',
                paletteName: 'theme.palette.primary.main',
                color: theme.palette.primary.main
            },
            {
                name: 'Primary Dark',
                className: 'primaryDark',
                paletteName: 'theme.palette.primary.dark',
                color: theme.palette.primary.dark
            },
            {
                name: 'Primary Contrast Text',
                className: 'primaryContrastText',
                paletteName: 'theme.palette.primary.contrastText',
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.common.black
            },
        ]
    },
    {
        groupName: 'secondary',
        flavors: [{
                name: 'Secondary Light',
                className: 'secondaryLight',
                paletteName: 'theme.palette.secondary.light',
                color: theme.palette.secondary.light
            },
            {
                name: 'Secondary Main',
                className: 'secondaryMain',
                paletteName: 'theme.palette.secondary.main',
                color: theme.palette.secondary.main
            },
            {
                name: 'Secondary Dark',
                className: 'secondaryDark',
                paletteName: 'theme.palette.secondary.dark',
                color: theme.palette.secondary.dark
            },
            {
                name: 'Secondary Contrast Text',
                className: 'secondaryContrastText',
                paletteName: 'theme.palette.secondary.contrastText',
                color: theme.palette.secondary.contrastText
            },
        ]
    },
    {
        groupName: 'error',
        flavors: [{
                name: 'Error Light',
                className: 'errorLight',
                paletteName: 'theme.palette.error.light',
                color: theme.palette.error.light
            },
            {
                name: 'Error Main',
                className: 'errorMain',
                paletteName: 'theme.palette.error.main',
                color: theme.palette.error.main
            },
            {
                name: 'Error Dark',
                className: 'errorDark',
                paletteName: 'theme.palette.error.dark',
                color: theme.palette.error.dark
            },
            {
                name: 'Error Contrast Text',
                className: 'errorContrastText',
                paletteName: 'theme.palette.error.contrastText',
                color: theme.palette.error.contrastText,
                backgroundColor: theme.palette.common.black
            },
        ]
    },
    {
        groupName: 'action',
        flavors: [{
                name: 'Action Active',
                className: 'actionActive',
                paletteName: 'theme.palette.action.active',
                color: theme.palette.action.active
            },
            {
                name: 'Action Hover',
                className: 'actionHover',
                paletteName: 'theme.palette.action.hover',
                color: theme.palette.action.hover
            },
            {
                name: 'Action Selected',
                className: 'actionSelected',
                paletteName: 'theme.palette.action.selected',
                color: theme.palette.action.selected
            },
            {
                name: 'Action Disabled',
                className: 'actionDisabled',
                paletteName: 'theme.palette.action.disabled',
                color: theme.palette.action.disabled
            },
        ]
    },
]);

const getBackgroundStyles = theme => ([{
        name: 'Background Default',
        className: 'backgroundDefault',
        paletteName: 'theme.palette.background.default',
        backgroundColor: theme.palette.background.default
    },
    {
        name: 'Background Paper',
        className: 'backgroundPaper',
        paletteName: 'theme.palette.background.paper',
        backgroundColor: theme.palette.background.paper
    },
    {
        name: 'Action Disabled Background',
        className: 'actionDisabledBackground',
        paletteName: 'theme.palette.action.disabledBackground',
        backgroundColor: theme.palette.action.disabledBackground
    },
]);

export { getTextStyles, getBackgroundStyles };