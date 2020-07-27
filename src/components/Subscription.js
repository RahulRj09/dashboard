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
import { getSubscriptionDetails } from '../store'
import { getTheExpDate, dateFormat } from '../utils/SubscriptionDate'
import getProgressBar from '../utils/ProgressBar'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
const Subscription = ({ subscriptionDetails, getSubscriptionDetails }) => {
    const options = [
        { key: 'Select an option', value: '' },
        { key: 'option 1', value: 'option 1' },
        { key: 'option 2', value: 'option 2' },
        { key: 'option 3', value: 'option 3' }
    ]
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
        getSubscriptionDetails()
    }, [getSubscriptionDetails])

    let development = {}
    let subscriptionInfo = subscriptionDetails.subscription
    subscriptionInfo.map(temp => {
        if (temp.type === "development") {
            development["startDate"] = dateFormat(temp.startDate)
            development["validTill"] = dateFormat(temp.validTill)
            development["ipaasId"] = temp.ipaasId
            development["key"] = temp.key
            development["uuid"] = temp.uuid
            development["rMonthsInPercents"] = getTheExpDate(temp.validTill)
        }
    })
  
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
                                    <div className="card-header">  <h4 className="textcolor">Subscription details for development </h4></div>
                                    <div className="card-block">

                                        <div className="box box-info">

                                            <div className="box-body">
                                                <br></br>
                                                <div className="col-sm-12">
                                                    {
                                                        getProgressBar(development["rMonthsInPercents"])

                                                    }
                                                </div>
                                                <br />
                                                <div className="clearfix"></div>
                                                <hr style={{ margin: "5px 0 5px 0" }} />


                                                {/* <div className="col-sm-5 col-xs-6 tital" >Subscription Key</div><div className="col-sm-7 col-xs-6 ">{development.key}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div> */}

                                                <div className="col-sm-5 col-xs-6 tital " >Start Date :</div><div className="col-sm-7">{development.startDate}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital " >Expiry Date</div><div className="col-sm-7">{development.validTill}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital  " >UUID</div><div className="col-sm-7">{development.uuid}</div>

                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>
                                                <div className="col-sm-5 col-xs-6 tital  " >Ipaas Id</div><div className="col-sm-7">{development.ipaasId}</div>

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
                                                                            <br />
                                                                            <label htmlFor="reason">Reason</label>
                                                                            <Field type="text" name="reason" className="form-control" />
                                                                            <ErrorMessage name="reason" component={TextError} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="keyType">keyType</label>
                                                                            <Field as='select' id="keytype" name="keytype" className="form-control"  >
                                                                                {
                                                                                    options.map(option => {
                                                                                        return (
                                                                                            <option key={option.key} value={option.value}>
                                                                                                {option.key}
                                                                                            </option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Field>
                                                                            <ErrorMessage name="keytype" component={TextError} />
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

const mapStateToProps = (state) => {
    return {
        subscriptionDetails: state.subscriptionDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Subscription)
