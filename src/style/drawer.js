import React from 'react'
const drawerWidth = 220;

function drawer(theme) {
    let drawerCss = {
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: drawerWidth
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        }
    }
    return drawerCss
}

export default drawer
