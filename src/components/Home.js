import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'
import '../style/dashboard.css'
import drawerCss from '../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import Subscription from './Subscription'
import ErrorCount from './ErrorCount'
import ProjectCount from './ProjectCount'

const useStyles = makeStyles((theme) => (drawerCss(theme)))

function Home({ isAuth }) {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    if (isAuth.isAuth) {
        localStorage.setItem("loginDetails", JSON.stringify(isAuth))
    }

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
            <section id="cover" className="min-vh-100" style={{ marginTop: '5%' }}  >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                <Subscription />
                            </div>
                            <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                <ErrorCount />
                            </div>
                            <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                <ProjectCount />
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.login
    }
}

export default connect(mapStateToProps)(Home)


