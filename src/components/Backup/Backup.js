import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../Header'
import drawerCss from '../../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import BackupManually from './BackupManually'
import ChangeBackupLocation from './ChangeBackupLocation';

const useStyles = makeStyles((theme) => (drawerCss(theme)))

const Backup = () => {
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
            <section id="cover" className="min-vh-100" style={{ marginTop: '3%' }} >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                <ChangeBackupLocation />
                            </div>
                            <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                <BackupManually />
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div >
    )
}


export default Backup
