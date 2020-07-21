import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, NavLink, Link } from 'react-router-dom'
import MaterialTable from 'material-table';
import classNames from "classnames";
import Header from './Header'
import drawerCss from '../style/drawer'
import '../style/secondHeader.css'
const useStyles = makeStyles((theme) => (drawerCss(theme)))

function UserManagement() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Username', field: 'Username' },
            { title: 'Name', field: 'Name' },
            { title: 'EmialId', field: 'EmailId' },
            { title: 'Userrole', field: 'Userrole' }
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

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
                            data={state.data}
                            editable={{
                                // onRowAdd: (newData) =>
                                //     new Promise((resolve) => {
                                //         setTimeout(() => {
                                //             resolve();
                                //             setState((prevState) => {
                                //                 const data = [...prevState.data];
                                //                 data.push(newData);
                                //                 return { ...prevState, data };
                                //             });
                                //         }, 600);
                                //     }),
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

export default UserManagement
