import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import '../style/dashboard.css'
import drawerCss from '../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";

const useStyles = makeStyles((theme) => (drawerCss(theme)))

function ResetPassword() {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

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

export default ResetPassword
