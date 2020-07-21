import React, { useEffect, useState } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Redirect, NavLink, Link } from 'react-router-dom'
import { getProjects } from '../store'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import drawerCss from '../style/drawer'

const useStyles = makeStyles((theme) => (drawerCss(theme)))
function Project(props) {
    const { projects, getProjects } = props
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    useEffect(() => {
        getProjects()
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    let loginStatus = localStorage.getItem("isAuth")
    let data = projects["projects"]
    
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }
    return (
        <div>
            <section id="cover" className="min-vh-100" style={{marginTop:'5%'}}  >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div className="container">
                        <div className="row">
                            {

                                data.map((project, index) => <div className="col-md-4" key={index} style={{ marginBottom: "3%" }} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardContent >
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {project}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                <NavLink to={{
                                                    pathname: "/singleproject",
                                                    state: {
                                                        projectName: project
                                                    }
                                                }}>View Flow</NavLink>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>)
                            }
                        </div>
                    </div>
                </main>
            </section>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: () => dispatch(getProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)

