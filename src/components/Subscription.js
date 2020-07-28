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
import { getSubscriptionDetails, reGenerateSubscriptionkey } from '../store'
import { getTheExpDate, dateFormat } from '../utils/SubscriptionDate'
import getProgressBar from '../utils/ProgressBar'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => (drawerCss(theme)))
const Subscription = ({ subscriptionKey, subscriptionDetails, getSubscriptionDetails, reGenerateSubscriptionkey }) => {
    const classes = useStyles();
    const [expanded1, setExpanded1] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);

    const handleExpandClick1 = () => {
        setExpanded1(!expanded1);
    };

    const handleExpandClick2 = () => {
        setExpanded2(!expanded2);
    };


    const options = [
        { key: 'Select an option', value: '' },
        { key: 'development', value: 'development' },
        { key: 'production', value: 'production' },
        { key: 'test', value: 'test' }
    ]
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
    let production = {}
    let testEnvironment = {}
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

    let userDetails = JSON.parse(localStorage.getItem("loginDetails")).userData.data
    const initialValue = {
        reason: "",
        keytype: "",
        name: userDetails.name,
        email: userDetails.email,
        orderId: "5e6b75bd377d20b20cc3e35e",
    }

    const validationSchema = Yup.object({
        reason: Yup.string().required("Required!"),
        keytype: Yup.string().required("Required!")

    })
    const onSubmit = values => {
        reGenerateSubscriptionkey(values)
    }

    const getReGenerateKeyForm = () => {
        return (
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <Form>
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <Field type="text" name="reason" className="form-control" placeholder="Reason" />
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
                            {
                                subscriptionKey.loading ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <span className="help-block">Subscription key re-generate successfully</span>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : ""
                            }
                            {
                                subscriptionKey.error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <span className="help-block">hello</span>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : ""
                            }
                            <div style={{ display: "flex", float: "right", display: "inline" }}>
                                <button type='submit' className="btn btn-secondary" disabled={!formik.isValid} style={{ marginBottom: '15px' }}>Generate</button>
                            </div>

                        </Form>
                    }
                }
            </Formik>)
    }

    let [showMeKey, setShowMeKey] = useState({
        showMe: false,
        operation: "show"
    })

    const showSubscriptioKey = () => {
        if (showMeKey.showMe === false) {
            setShowMeKey({ showMeKey, showMe: true, showMeKey, operation: "hide" })
        } else {
            setShowMeKey({ showMeKey, showMe: false, showMeKey, operation: "show" })
        }

    }



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
                        <div className="row">
                            {
                                development.hasOwnProperty("startDate") ? <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                    <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    SD
          </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title="Development key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(development["rMonthsInPercents"])
                                            }
                                            <br />
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" onClick={() => showSubscriptioKey()}>{showMeKey.operation}</span>
                                                </div>
                                                <input type="text" class="form-control" value={showMeKey.showMe ? development.key : "subscription key"} />
                                            </div>
                                            <p>Start Date : {development.startDate}</p>
                                            <p>Expiry Date : {development.validTill}</p>
                                            <p>UUID : {development.uuid}</p>
                                            <p>IpaasId : {development.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Re-Generate subscription key </h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded1,
                                                })}
                                                onClick={handleExpandClick1}
                                                aria-expanded={expanded1}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded1} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm()
                                                }
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div> : ""
                            }
                            {
                                production.hasOwnProperty("startDate") ? <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                    <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    SD
      </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title="Production key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(production["rMonthsInPercents"])
                                            }
                                            <br />
                                            <p>Start Date : {production.startDate}</p>
                                            <p>Expiry Date : {production.validTill}</p>
                                            <p>UUID : {production.uuid}</p>
                                            <p>IpaasId : {production.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Generate subscription key</h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded2,
                                                })}
                                                onClick={handleExpandClick2}
                                                aria-expanded={expanded2}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded2} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm()
                                                }
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div> : ""
                            }
                            {
                                testEnvironment.hasOwnProperty("startDate") ? <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                    <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    SD
          </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title="Development key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(development["rMonthsInPercents"])
                                            }
                                            <br />
                                            <p>Start Date : {development.startDate}</p>
                                            <p>Expiry Date : {development.validTill}</p>
                                            <p>UUID : {development.uuid}</p>
                                            <p>IpaasId : {development.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Re-Generate subscription key </h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded1,
                                                })}
                                                onClick={handleExpandClick1}
                                                aria-expanded={expanded1}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded1} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm()
                                                }
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div> : ""
                            }

                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptionDetails: state.subscriptionDetails,
        subscriptionKey: state.subscriptionKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails()),
        reGenerateSubscriptionkey: (data) => dispatch(reGenerateSubscriptionkey(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Subscription)
