import React, { useState, useEffect } from 'react'
import Header from './Header'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, NavLink, Link } from 'react-router-dom'
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import classNames from "classnames";
import drawerCss from '../style/drawer'
import { getFlows } from '../store';
import '../style/singleProjectCss.css'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
function SingleProject({ location, flows, getFlows }) {

    const [state, setState] = useState({
        columns: [
            { title: 'id', field: 'id' },
            { title: 'type', field: 'type' },
            { title: 'z', field: 'z' },
            { title: 'name', field: 'name' },
            { title: 'topic', field: 'topic' },
            { title: 'payload', field: 'payload' },
            { title: 'payloadType', field: 'payloadType' },
            { title: 'repat', field: 'repat' },
            { title: 'crontab', field: 'crontab' }
        ],
        data: []
    });
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

    const createBox = (flows) => {
        let data = []
        console.log(flows)
        for (let i = 0; i < flows.length; i++) {
            let temp = <div className="bs-example">
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button type="button" className="btn btn-link" data-toggle="collapse" data-target={`#collapse${i}`}><i className="fa fa-angle-down"></i>{flows[i]["flow"]}</button>
                            </h2>
                        </div>
                        <div id={`collapse${i}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                {flows[i]["info"] ? <p>Info : {flows[i]["info"]}</p> : ""}
                                {
                                    flows[i]["nodes"] ? <MaterialTable
                                        title=""
                                        columns={state.columns}
                                        data={flows[i]["nodes"]}
                                    /> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            data.push(temp)
        }
        return data
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
                        {
                            createBox(flows.flows)
                        }
                    </div>
                </main>
            </section>
        </div >
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
