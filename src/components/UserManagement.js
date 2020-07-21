import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, NavLink, Link } from 'react-router-dom'
import classNames from "classnames";
import Header from './Header'
import drawerCss from '../style/drawer'
const useStyles = makeStyles((theme) => (drawerCss(theme)))

function UserManagement() {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }

    return (
        <div>
            <section id="cover" className="min-vh-100" >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                </main>
            </section>
        </div>
    )
}

export default UserManagement
