import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, NavLink, Link } from 'react-router-dom'
import MaterialTable from 'material-table';
import classNames from "classnames";
import { connect } from 'react-redux'
import Header from './Header'
import drawerCss from '../style/drawer'
import '../style/secondHeader.css'
import { getUsers, addUser } from '../store/Users/userActions';
const useStyles = makeStyles((theme) => (drawerCss(theme)))

function UserManagement({ users, getUsers, addUser }) {
    const [state, setState] = useState({
        columns: [
            { title: 'Username', field: 'userName' },
            { title: 'Name', field: 'name' },
            { title: 'EmailId', field: 'emailId' },
            { title: 'Userrole', field: 'userRole', editable: 'never' }
        ]
    });
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let clientId = JSON.parse(localStorage.getItem("loginDetails")).userData.clientId

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])


    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }
    return (
        <div>
            <section id="cover" className="min-vh-100" style={{ marginTop: '5%' }}  >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>

                    <div>
                        <MaterialTable
                            title="Users"
                            columns={state.columns}
                            data={users.users}
                            editable={{
                                onRowAdd: (newData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                            newData["clientId"] = clientId
                                            addUser(newData)
                                        }, 600);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                            if (oldData) {
                                                setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return { ...prevState, data };
                                                });
                                            }
                                        }, 600);
                                    }),
                                onRowDelete: (oldData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return { ...prevState, data };
                                            });
                                        }, 600);
                                    }),
                            }}
                        />
                    </div>

                </main>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        addUser: (newData) => dispatch(addUser(newData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
