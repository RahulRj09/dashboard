import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../Header'
import { connect } from 'react-redux'
import drawerCss from '../../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import '../../style/profile.css'
import { getProfile } from '../../store'

const useStyles = makeStyles((theme) => (drawerCss(theme)))

function Profile({ profileData, getProfile }) {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")
    let userDetails = JSON.parse(localStorage.getItem("loginDetails")).userData.data
    let userId = userDetails.id

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        getProfile(userId)
    }, [])

    let profileInfo = profileData.profile
    const { name, email, username, roles, clientId } = profileInfo
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
                            <div className="col-md-7">

                                <div className="card ">
                                    <div className="card-header">  <h4>User Profile</h4></div>
                                    <div className="card-block">

                                        <div className="box box-info">

                                            <div className="box-body">
                                                <br></br>
                                                <div className="col-sm-6">
                                                    <div align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-fluid" />

                                                        <input id="profile-image-upload" className="hidden" type="file" />
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="col-sm-6 profileName">
                                                    <h4>{name}</h4>
                                                    <span><p>{roles}</p></span>
                                                </div>
                                                <div className="clearfix"></div>
                                                <hr style={{ margin: "5px 0 5px 0" }} />


                                                <div className="col-sm-5 col-xs-6 tital" >Name :</div><div className="col-sm-7 col-xs-6 ">{name}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital " >Username :</div><div className="col-sm-7"> {username}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital " >Email-Id</div><div className="col-sm-7">{email}</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital  " >User Role</div><div className="col-sm-7">{roles}</div>

                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital" >client id :</div><div className="col-sm-7">{clientId}</div>

                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

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
        profileData: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (userId) => dispatch(getProfile(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
