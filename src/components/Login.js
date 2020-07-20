import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../store'
import { useHistory, Redirect } from 'react-router-dom'
import logo from '../assets/mobillor.png'
import styles from '../style/header.module.css'
import '../style/form.css'
import Header from './Header'

function Login({ isAuth, isAuthCall }) {
    let history = useHistory()
    const [loginDetails, setLoginDetails] = useState({ username: "", password: "" })
    const handleFormData = (event) => {
        setLoginDetails({ ...loginDetails, [event.target.name]: event.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault()
        let data = await isAuthCall(loginDetails)
        if (data.type === "LOGIN_SUCCESS") {
            localStorage.setItem("isAuth", true)
            history.push('/home')
        } else {
            history.push('/')
        }


    }
    const { username, password } = loginDetails;
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
                                                <form onSubmit={submitForm} >
                                                    <div className="form-group">
                                                        <label htmlFor="username">Username</label>
                                                        <input type="text" name="username" value={username} onChange={handleFormData} required autoFocus className="form-control" />
                                                        <div className="invalid-feedback">
                                                            <div >Username is required</div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <input type="password" name="password" value={password} onChange={handleFormData} required className="form-control" />
                                                        <div className="invalid-feedback">
                                                            <div >Password is required</div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label><input type="checkbox" name="remember" /> Remember Me </label>
                                                    </div>
                                                    <button type="submit" className="btn btn-secondary">
                                                        Login
                                </button>

                                                </form>
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