import React, { useState, useEffect } from 'react'
import Header from './Header'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from "classnames";
import drawerCss from '../style/drawer'
import { getFlows } from '../store';
import '../style/singleProjectCss.css'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
function SingleProject({ location, flows, getFlows }) {
    let projectName = location.state.projectName
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


    useEffect(() => {
        getFlows(projectName)
    }, [getFlows])

    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }

    return (
        <div>
            <section id="cover" className="min-vh-100" style={{ marginTop: '5%' }} >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div className="container">
                        <div className="bs-example">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                <button type="button" className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"><i className="fa fa-angle-down"></i>{projectName}</button>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <p>HTML stands for HyperText Markup Language. HTML is the standard markup language for describing the structure of web pages. <a href="https://www.tutorialrepublic.com/html-tutorial/" target="_blank">Learn more.</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        flows: state.projectFlow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFlows: (projectName) => dispatch(getFlows(projectName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject)
