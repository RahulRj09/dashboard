import React from 'react'
const drawerWidth = 220;
function headerStyle(theme) {
    let headerStyle = {
        root: {
            display: "flex"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#000000'
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })

        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        menuButtonIconClosed: {
            transition: theme.transitions.create(["transform"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: "rotate(0deg)"
        },
        menuButtonIconOpen: {
            transition: theme.transitions.create(["transform"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            transform: "rotate(180deg)"
        },
        hide: {
            display: "none"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: theme.spacing.unit * 7 + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing.unit * 9 + 1
            }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            marginTop: theme.spacing.unit,
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,

        },
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3
        },
        grow: {
            flexGrow: 1
        }
    }

    return headerStyle
}

export default headerStyle
