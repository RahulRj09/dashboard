import React, { Component } from 'react'
import headerCss from '../style/header.module.css'
import logo from '../assets/mobillor.png'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
    Drawer, AppBar, Toolbar,
    List, CssBaseline, Typography,
    IconButton, Divider, ListItem, ListItemIcon,
    ListItemText, MenuItem, Menu
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import headerStyle from '../style/headerStyle'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => (headerStyle(theme));

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
        const temp = {
            'open': this.state.open,
        }
        localStorage.setItem("open", JSON.stringify(temp))
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
                                    <MenuItem><Link to="/profile">Profile</Link></MenuItem>
                                    {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                                    {/* <MenuItem > <Link to="/forgot_password">Forgot Password</Link></MenuItem> */}
                                    <MenuItem > <Link to="/reset_password">Reset Password</Link></MenuItem>
                                    <MenuItem > <Link to="/logout">Logout</Link></MenuItem>
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
                                    <NavLink to="/projects"><AccountTreeIcon /></NavLink>
                                </ListItemIcon>
                                <ListItemText><NavLink to={{
                                    pathname: "/projects",
                                    state: {
                                        drawer: this.state.open
                                    }
                                }}> Project</NavLink></ListItemText>
                            </ListItem>
                            <ListItem button key="UserManagement">
                                <ListItemIcon>
                                    <NavLink to="/user_management"><GroupAddIcon /></NavLink>
                                </ListItemIcon>
                                <ListItemText><NavLink to="/user_management">User Management</NavLink></ListItemText>
                            </ListItem>
                            <ListItem button key="ErrorLog">
                                <ListItemIcon>
                                    <NavLink to="/error_log"><ErrorIcon /></NavLink>
                                </ListItemIcon>
                                <ListItemText><NavLink to="/error_log">Error Log</NavLink></ListItemText>
                            </ListItem>

                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="logout">
                                <ListItemIcon>
                                    <Link to="/logout"><LockIcon /></Link>
                                </ListItemIcon>
                                <ListItemText><Link to="/logout">Logout</Link></ListItemText>
                            </ListItem>

                        </List>
                    </Drawer>
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




