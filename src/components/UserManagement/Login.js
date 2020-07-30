import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store'
import { useHistory, Redirect, Link } from 'react-router-dom'
import logo from '../../assets/mobillor.png'
import styles from '../../style/header.module.css'
import '../../style/form.css'
import '../../style/form1.css'
import Header from '../Header'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../TextError'

function Login({ isAuth, isAuthCall }) {
    let history = useHistory()
    const initialValue = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Required!"),
        password: Yup.string().required("Required!")

    })
    const onSubmit = async values => {
        let data = await isAuthCall(values)
        if (data.type === "LOGIN_SUCCESS") {
            localStorage.setItem("isAuth", true)
            history.push('/home')
        }
    }

    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus !== "false") {
        return <Redirect to='/home' />
    }
    return (
        <div>
            <Header />
            <section id="cover" className="min-vh-100" >
                <div id="cover-caption">
                    <div className="container-fluid">
                        <div className="row text-white">
                            <div className="col-xl-5 col-lg-8 col-md-8 col-sm-12 col-xs-12 col mx-auto form-4">
                                <div className="template" style={{ color: 'black' }}>
                                    <div className="card">
                                        <div className="card-header" > <img src={logo} alt="logo" className={styles.logo} /></div>
                                        <div className="card-body" style={{ display: 'flex' }}>
                                            <div style={{ width: '70%', marginLeft: '30%' }}>
                                                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                                                    {
                                                        formik => {
                                                            return <Form>
                                                                <div className="form-group">
                                                                    <label htmlFor="username">username</label>
                                                                    <Field type="text" name="username" className="form-control" />
                                                                    <ErrorMessage name="username" component={TextError} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="password">password</label>
                                                                    <Field type="password" name="password" className="form-control" />
                                                                    <ErrorMessage name="password" component={TextError} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <input id="check" type="checkbox" className="check" />
                                                                    <label htmlFor="check"><span className="icon"></span>&nbsp; Remember me</label>
                                                                </div>
                                                                {

                                                                    isAuth.error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                                        Invalid username/password
                                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div> : ""
                                                                }
                                                                <div style={{ display: "flex", float: "right", display: "inline" , marginTop:"-8%"}}>
                                                                    <button type='submit' className="btn btn-secondary" disabled={!formik.isValid}>Login</button>
                                                                </div><br />
                                                                <hr />
                                                                <div class="foot-lnk">
                                                                    <Link to='/forgot_password'>Forgot Password?</Link>
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
                </div>
            </section>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.login
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        isAuthCall: (loginDetails) => dispatch(login(loginDetails))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Login)