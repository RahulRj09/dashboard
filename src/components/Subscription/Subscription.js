import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import drawerCss from '../../style/drawer'
import '../../style/form1.css'
import '../../style/resetPassword.css'
import '../../style/form.css'
import { getSubscriptionDetails, reGenerateSubscriptionkey } from '../../store'
import { getTheExpDate, dateFormat } from './SubscriptionDate'
import getProgressBar from '../../utils/ProgressBar'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import * as Yup from 'yup'
import {
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { getReGenerateKeyForm } from './ReGenerateKeyForm'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
const Subscription = ({ subscriptionKey, subscriptionDetails, getSubscriptionDetails, reGenerateSubscriptionkey }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState({ development: false, production: false, test: false });

    const handleExpandClick = (expandedType) => {
        setExpanded({ ...expanded, [expandedType]: !expanded[expandedType] });
    };

    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    let productsData = JSON.parse(localStorage.getItem("loginDetails")).userData.data.products.GstComplianceEdition

    useEffect(() => {
        getSubscriptionDetails(productsData.id)
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
        orderId: productsData.id,
    }

    const validationSchema = Yup.object({
        reason: Yup.string().required("Required!"),
        keytype: Yup.string().required("Required!")

    })
    const onSubmit = values => {
        reGenerateSubscriptionkey(values)
    }

    let [showMeKey, setShowMeKey] = useState({
        development: {
            showMe: false,
            operation: "show"
        },
        production: {
            showMe: false,
            operation: "show"
        },
        test: {
            showMe: false,
            operation: "show"
        }
    })

    const showSubscriptioKey = (showKeyType) => {
        console.log("Rahul")
        console.log(showKeyType)
        if (showMeKey[showKeyType].showMe === false) {
            setShowMeKey({ ...showMeKey, [showKeyType]: { showMe: true, operation: "hide" } })
        } else {
            setShowMeKey({ ...showMeKey, [showKeyType]: { showMe: false, operation: "show" } })
        }

    }

    const [state, setState] = useState({ development: { copied: false }, production: { copied: false }, test: { copied: false } })
    const onCopy = (copyType) => {
        setState({ ...state, [copyType]: { copied: true } });
    };

    let developmentOperation = showMeKey.development.operation
    console.log(developmentOperation)
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
                                            title="Development key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(development["rMonthsInPercents"])
                                            }
                                            <br />
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" onClick={() => showSubscriptioKey("development")}>{developmentOperation}</span>
                                                </div>
                                                <input type="text" class="form-control" value={showMeKey.development.showMe ? development.key : "subscription key"} />
                                                <div class="input-group-append" >
                                                    <span class="input-group-text">
                                                        <CopyToClipboard onCopy={() => onCopy("development")} text={development.key}>
                                                            <FileCopyIcon fontSize="small" color="disabled" />
                                                        </CopyToClipboard>
                                                    </span>

                                                </div>
                                            </div>
                                            {state.development.copied ? <span style={{ color: '#6c757d' }}>Copied.</span> : null}
                                            <p>Start Date : {development.startDate}</p>
                                            <p>Expiry Date : {development.validTill}</p>
                                            <p>UUID : {development.uuid}</p>
                                            <p>IpaasId : {development.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Re-Generate subscription key </h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded.development,
                                                })}
                                                onClick={() => handleExpandClick("development")}
                                                aria-expanded={expanded.development}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded.development} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm(subscriptionKey, initialValue, validationSchema, onSubmit)
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
                                            title="Production key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(production["rMonthsInPercents"])
                                            }
                                            <br />
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" onClick={() => showSubscriptioKey("production")}>{showMeKey.production.operation}</span>
                                                </div>
                                                <input type="text" class="form-control" value={showMeKey.production.showMe ? production.key : "subscription key"} />
                                                <div class="input-group-append" >
                                                    <span class="input-group-text">
                                                        <CopyToClipboard onCopy={() => onCopy("production")} text={production.key}>
                                                            <FileCopyIcon fontSize="small" color="disabled" />
                                                        </CopyToClipboard>
                                                    </span>

                                                </div>
                                            </div>
                                            {state.production.copied ? <span style={{ color: '#6c757d' }}>Copied.</span> : null}
                                            <p>Start Date : {production.startDate}</p>
                                            <p>Expiry Date : {production.validTill}</p>
                                            <p>UUID : {production.uuid}</p>
                                            <p>IpaasId : {production.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Generate subscription key</h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded.production,
                                                })}
                                                onClick={() => handleExpandClick("production")}
                                                aria-expanded={expanded.production}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded.production} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm(subscriptionKey, initialValue, validationSchema, onSubmit)
                                                }
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </div> : ""
                            }
                            {
                                testEnvironment ? <div className="col-md-4" style={{ marginBottom: "3%" }} >
                                    <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    SD
          </Avatar>
                                            }
                                            title="Test key details"
                                        />

                                        <CardContent>
                                            {
                                                getProgressBar(testEnvironment["rMonthsInPercents"])
                                            }
                                            <br />
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" onClick={() => showSubscriptioKey("test")}>{showMeKey.test.operation}</span>
                                                </div>
                                                <input type="text" class="form-control" value={showMeKey.test.showMe ? testEnvironment.key : "subscription key"} />
                                                <div class="input-group-append" >
                                                    <span class="input-group-text">
                                                        <CopyToClipboard onCopy={() => onCopy("test")} text={testEnvironment.key}>
                                                            <FileCopyIcon fontSize="small" color="disabled" />
                                                        </CopyToClipboard>
                                                    </span>

                                                </div>
                                            </div>
                                            {state.test.copied ? <span style={{ color: '#6c757d' }}>Copied.</span> : null}
                                            <p>Start Date : {testEnvironment.startDate}</p>
                                            <p>Expiry Date : {testEnvironment.validTill}</p>
                                            <p>UUID : {testEnvironment.uuid}</p>
                                            <p>IpaasId : {testEnvironment.ipaasId}</p>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <h5>Re-Generate subscription key </h5>
                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded.test,
                                                })}
                                                onClick={() => handleExpandClick("test")}
                                                aria-expanded={expanded.test}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>
                                        <Collapse in={expanded.test} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                {
                                                    getReGenerateKeyForm(subscriptionKey, initialValue, validationSchema, onSubmit)
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
        getSubscriptionDetails: (id) => dispatch(getSubscriptionDetails(id)),
        reGenerateSubscriptionkey: (data) => dispatch(reGenerateSubscriptionkey(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Subscription)
