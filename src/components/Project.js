import React, { useEffect } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getProjects } from '../store'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}))
function Project({ projects, getProjects }) {
    const classes = useStyles();
    const theme = useTheme();
    let drawer = JSON.parse(localStorage.getItem("open"))
    console.log(drawer)
    useEffect(() => {
        getProjects()
    }, [])

    let loginStatus = localStorage.getItem("isAuth")
    if (loginStatus === "false") {
        return <Redirect to='/' />
    }

    let data = projects["projects"]
    return (
        <div>
            <section id="cover" className="min-vh-100"  >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: !drawer.open,
                    })}>
                    <div className="container" >
                        <div className="row">
                            {

                                data.map((project, index) => <div className="col-md-4" style={{marginBottom:"3%"}} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {project}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
         </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View Project
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

