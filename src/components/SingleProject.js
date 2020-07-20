import React, { useState, useEffect } from 'react'
import Header from './Header'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import drawerCss from '../style/drawer'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
function SingleProject(props) {
    const { projects, getProjects } = props
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
    return (
        <div>
            <section id="cover" className="min-vh-100" >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                </main>
            </section>
        </div>
    )
}

export default SingleProject
