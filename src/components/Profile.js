import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import '../style/dashboard.css'
import drawerCss from '../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import '../style/profile.css'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const useStyles = makeStyles((theme) => (drawerCss(theme)))

function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")

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
                    <div classNam="container">
                        <div className="row">
                            <div className="col-md-7">

                                <div className="card ">
                                    <div className="card-header">  <h4 className="textcolor">User Profile</h4></div>
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
                                                    <h4 style={{ color: "#00b1b1" }}>Rahul Joshi </h4>
                                                    <span><p>Admin</p></span>
                                                </div>
                                                <div className="clearfix"></div>
                                                <hr style={{ margin: "5px 0 5px 0" }} />


                                                <div className="col-sm-5 col-xs-6 tital textcolor " >Name:</div><div className="col-sm-7 col-xs-6 ">Rahul</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital textcolor " >Username</div><div className="col-sm-7"> rahul</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital textcolor " >Email-Id</div><div className="col-sm-7"> rahul.joshi@mobillor.com</div>
                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital textcolor " >User Role</div><div className="col-sm-7">Admin6</div>

                                                <div className="clearfix"></div>
                                                <div className="bot-border"></div>

                                                <div className="col-sm-5 col-xs-6 tital textcolor " >client id :</div><div className="col-sm-7">xxxxxxxxxx</div>

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

export default Profile
