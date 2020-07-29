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
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import BackupIcon from '@material-ui/icons/Backup';

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
                                    <MenuItem exact to="/profile" activeClassName="main-nav-active" component={NavLink}>Profile </MenuItem>
                                    <MenuItem exact to="/reset_password" activeClassName="main-nav-active" component={NavLink} > Reset Password</MenuItem>
                                    <MenuItem exact to="/logout" activeClassName="main-nav-active" component={NavLink} >Logout</MenuItem>
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
                            <ListItem button key="Home" activeClassName="main-nav-active" component={NavLink} to="/home" exact>
                                <ListItemIcon className={classes.icon} >
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button key="Project" activeClassName="main-nav-active" component={NavLink} to="/projects" exact>
                                <ListItemIcon>
                                    <AccountTreeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Project" />
                            </ListItem>
                            <ListItem button key="User Management" activeClassName="main-nav-active" component={NavLink} to="/user_management" exact>
                                <ListItemIcon >
                                    <GroupAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Management" />
                            </ListItem>
                            <ListItem button key="ErrorLog" activeClassName="main-nav-active" component={NavLink} to="/error_log" exact>
                                <ListItemIcon>
                                    <ErrorIcon />
                                </ListItemIcon>
                                <ListItemText primary="Error Log" />
                            </ListItem>
                            <ListItem button key="Subscription" activeClassName="main-nav-active" component={NavLink} to="/subscription" exact>
                                <ListItemIcon>
                                    <CardMembershipIcon />
                                </ListItemIcon>
                                <ListItemText primary="Subscription" />
                            </ListItem>
                            <ListItem button key="Backup" activeClassName="main-nav-active" component={NavLink} to="/backup" exact>
                                <ListItemIcon>
                                    <BackupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Backup" />
                            </ListItem>

                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="Logout" activeClassName="main-nav-active" component={NavLink} to="/logout" exact>
                                <ListItemIcon>
                                    <LockIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>

                        </List>
                    </Drawer >
                </div >
            );
        }
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header)




