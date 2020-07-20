import React, { Component } from 'react'
import headerCss from '../style/header.module.css'
import logo from '../assets/mobillor.png'
import { connect } from 'react-redux'
import { NavLink, Route, Redirect, useHistory, Link } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 220;

const styles = theme => ({
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
});

class Header extends Component {
    state = {
        open: true,
        anchorEl: null
    };
    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        localStorage.setItem("open",JSON.stringify(this.state))
        let loginStatus = localStorage.getItem("isAuth")
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (loginStatus === "false") {
            return (
                <div className={classes.root}>
                    <AppBar position="static" >
                        <Toolbar className={headerCss.header}>
                            <img src={logo} alt="logo" className={headerCss.logo} />
                        </Toolbar>
                    </AppBar>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classes.appBar}
                        fooJon={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open
                        })}
                    >
                        <Toolbar disableGutters={true}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon
                                    classes={{
                                        root: this.state.open
                                            ? classes.menuButtonIconOpen
                                            : classes.menuButtonIconClosed
                                    }}
                                />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={`${classes.grow} ${headerCss.header}`}
                                noWrap
                            >
                                <img src={logo} alt="logo" className={headerCss.logo} />
                            </Typography>
                            <div>
                                <IconButton
                                    aria-owns={open ? "menu-appbar" : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open
                            })
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            <ListItem button key="home">
                                <ListItemIcon>
                                    <NavLink to="/home"><HomeIcon /></NavLink>
                                </ListItemIcon>
                                <ListItemText><NavLink to="/home">Home</NavLink></ListItemText>
                            </ListItem>
                            <ListItem button key="project">
                                <ListItemIcon>
                                    <NavLink to="/project"><AccountTreeIcon /></NavLink>
                                </ListItemIcon>
                                <ListItemText><NavLink to="/project">Project</NavLink></ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="project">
                                <ListItemIcon>
                                    <Link to="/logout"><LockIcon /></Link>
                                </ListItemIcon>
                                <ListItemText><Link to="/logout">Logout</Link></ListItemText>
                            </ListItem>

                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />


                    </main>
                </div>
            );
        }
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header)




