import React, { useEffect, useState } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import drawerCss from '../style/drawer'
import '../style/form1.css'
import '../style/resetPassword.css'
import '../style/form.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


const useStyles = makeStyles((theme) => (drawerCss(theme)))
const Subscription = () => {
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
            <section id="cover" className="min-vh-100" style={{ marginTop: '5%' }} >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div classNam="container">
                        <div className="row">
                            <div className="col-md-6">

                                <div className="card ">
                                    <div className="card-header">  <h4 className="textcolor">Subscription Details</h4></div>
                                    <div className="card-block">

                                        <div className="box box-info">

                                            <div className="box-body">
                                                <br></br>
                                                <div className="col-sm-6">
                                                    <div className="progress">
                                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "45%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="45" aria-valuemax="100"></div>
                                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100"></div>
                                                    </div>
                                                    <br></br>
                                                </div>
                                                <br />
                                                <div className="clearfix"></div>
                                                <hr style={{ margin: "5px 0 5px 0" }} />


                                                <div className="col-sm-5 col-xs-6 tital" >Subscription Key</div><div className="col-sm-7 col-xs-6 ">key</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital " >Start Date :</div><div className="col-sm-7"> date </div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital " >End Date</div><div className="col-sm-7">date end</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital  " >UUID</div><div className="col-sm-7">UUID</div>

                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="card ">
                                    <div className="card-header">  <h4 className="textcolor">Re-generate subscription key</h4></div>
                                    <div className="card-block">

                                        <div className="box box-info">

                                            <div className="box-body">
                                                <div id="cover-caption">
                                                    <div className="container-fluid">
                                                        <Formik>
                                                            {
                                                                formik => {
                                                                    return <Form>
                                                                        <div className="form-group">
                                                                            <br/>
                                                                            <label htmlFor="reason">Reason</label>
                                                                            <Field type="text" name="reason" className="form-control" />
                                                                            <ErrorMessage name="reason" component={TextError} />
                                                                        </div>

                                                                        <button type='submit' className="btn btn-success" disabled={!formik.isValid} style={{ marginBottom: '15px' }}>Submit</button>
                                                                    </Form>
                                                                }
                                                            }
                                                        </Formik>

                                                    </div>

                                                </div>
                                                <div>
                                                </div>
                                            </div>
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription)
