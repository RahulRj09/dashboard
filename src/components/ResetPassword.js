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


const useStyles = makeStyles((theme) => (drawerCss(theme)))

function ResetPassword(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")
    let userDetails = JSON.parse(localStorage.getItem("loginDetails")).userData
    const [resetPasswordState, setResetPasswordState] = useState({
        username: userDetails.username,
        email: userDetails.email,
        oldpassword: "",
        newpassword: "",
        clientId: userDetails.clientId
    })

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    const handleFormData = (event) => {
        setResetPasswordState({ ...resetPasswordState, [event.target.name]: event.target.value })
    }

    const resetPassword = (event) => {
        event.preventDefault()
        props.resetPassword(resetPasswordState)
    }

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
                    <div>
                        <div className="col-md-10 offset-md-1 mt-5">
                            <div className="card">
                                <h4 className="card-header">Reset Password</h4>
                                <div className="card-body">
                                    <form onSubmit={resetPassword}>
                                        <div >
                                            <label style={{ marginTop: "5px" }} htmlFor="oldpassword">Old Password</label>
                                            <input id="oldpassword"
                                                className="form-control"
                                                placeholder='old password'
                                                type="password"
                                                name="oldpassword" onChange={handleFormData} required />
                                        </div>
                                        <div >
                                            <label style={{ marginTop: "5px" }} htmlFor="newpassword">New Password</label>
                                            <input id="newpassword"
                                                className="form-control"
                                                placeholder='new password'
                                                type="password"
                                                name="newpassword" onChange={handleFormData} required />
                                        </div>
                                        {/* <p>
                                            {
                                                (() => {
                                                    if (props.resetPasswordData.error) {
                                                        <div class="alert alert-danger" role="alert">
                                                            Password not update</div>
                                                    }
                                                })
                                                    ()}
                                        </p> */}
                                        <div style={{ display: "flex" }}>
                                            <button type="button" className="btn btn-light"><Link to="/home">Back</Link></button>
                                            <button type="submit" className="btn btn-success">Reset Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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
