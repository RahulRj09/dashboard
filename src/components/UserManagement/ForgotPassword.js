import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Header from '../Header'
import '../../style/resetPassword.css'
import { connect } from 'react-redux'
import { forgotPassword } from '../../store'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../../utils/TextError'

function ForgotPassword({ forgotPasswordData, forgotPassword }) {
    let loginStatus = localStorage.getItem("isAuth")

    const initialValue = {
        username: "",
        email: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required!"),
        email: Yup.string().email('Invalid email format').required("Required!")

    })
    const onSubmit = values => {
        forgotPassword(values)
    }

    console.log(forgotPasswordData)

    if (loginStatus !== "false") {
        return <Redirect to='/' />
    }

    return (
        <div>

            <section id="cover" className="min-vh-100">
                <Header />
                <div id="cover-caption">
                    <div className="container-fluid">
                        <div className="row text-white">
                            <div className="col-xl-5 col-lg-8 col-md-8 col-sm-12 col-xs-12 col mx-auto form-4">
                                <div className="template" style={{ color: 'black' }}>
                                    <div className="card">
                                        <h4 className="card-header">Forgot Password</h4>
                                        <div className="card-body">
                                            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                                                {
                                                    formik => {
                                                        return <Form>
                                                            <div className="form-group">
                                                                <label htmlFor="username">Username</label>
                                                                <Field type="text" name="username" className="form-control" />
                                                                <ErrorMessage name="username" component={TextError} />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="email">Email-Id</label>
                                                                <Field type="email" name="email" className="form-control" />
                                                                <ErrorMessage name="email" component={TextError} />
                                                            </div>
                                                            {

                                                                forgotPasswordData.error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                                    <span class="help-block">Invalid username/email</span>
                                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div> : ""
                                                            }
                                                            {

                                                                forgotPasswordData.loading ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                                    <span class="help-block">Password change successfully please check the email</span>
                                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div> : ""
                                                            }
                                                            <div style={{ display: "flex", float: "right", display: "inline" }}>
                                                                <button type="button" className="btn btn-light"><Link to="/">Back</Link></button>
                                                                <button type="submit" className="btn btn-secondary" disabled={!formik.isValid} >Forgot Password</button>
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
            </section >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        forgotPasswordData: state.forgotPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (forgotPasswordPayload) => dispatch(forgotPassword(forgotPasswordPayload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
