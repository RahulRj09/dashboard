import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Header from './Header'
import '../style/dashboard.css'
import '../style/resetPassword.css'
import drawerCss from '../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import { connect } from 'react-redux'
import { resetPassword } from '../store'
import '../style/form1.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const useStyles = makeStyles((theme) => (drawerCss(theme)))

function ResetPassword(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")
    let userDetails = JSON.parse(localStorage.getItem("loginDetails")).userData.data

    const initialValue = {
        username: userDetails.username,
        email: userDetails.email,
        oldpassword: "",
        newpassword: "",
        clientId: userDetails.clientId
    }

    const validationSchema = Yup.object({
        oldpassword: Yup.string().required("Required!"),
        newpassword: Yup.string().required("Required!")

    })
    const onSubmit = async values => {
        props.resetPassword(values)
    }

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

            <section id="cover" className="min-vh-100" style={{ marginTop: '5%' }} >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div id="cover-caption">
                        <div className="container-fluid">
                            <div className="row text-white">
                                <div className="col-xl-5 col-lg-8 col-md-8 col-sm-12 col-xs-12 col mx-auto form-4">
                                    <div className="template" style={{ color: 'black' }}>
                                        <div className="card">
                                            <h4 className="card-header">Reset Password</h4>
                                            <div className="card-body">
                                                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                                                    {
                                                        formik => {
                                                            return <Form>
                                                                <div className="form-group">
                                                                    <label htmlFor="oldpassword">Old Password</label>
                                                                    <Field type="password" name="oldpassword" className="form-control" />
                                                                    <ErrorMessage name="oldpassword" component={TextError} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="newpassword">New Password</label>
                                                                    <Field type="password" name="newpassword" className="form-control" />
                                                                    <ErrorMessage name="newpassword" component={TextError} />
                                                                </div>
                                                                {

                                                                    props.resetPasswordData.error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                                        Invalid old password
                                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div> : ""
                                                                }
                                                                {

                                                                    props.resetPasswordData.succeeded ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                                        Password reset successfully
                                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div> : ""
                                                                }
                                                                <div style={{ display: "flex" }}>
                                                                    <button type="button" className="btn btn-light"><Link to="/home">Back</Link></button>
                                                                    <button type="submit" className="btn btn-success">Reset Password</button>
                                                                </div>
                                                            </Form>
                                                        }
                                                    }
                                                </Formik>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </main>
            </section >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        resetPasswordData: state.resetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (resetPasswordState) => dispatch(resetPassword(resetPasswordState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
