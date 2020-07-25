import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getProjectCount } from '../store';
import dashboardCard from '../style/dashboardCard'

const useStyles = makeStyles((theme) => dashboardCard(theme));

function ProjectCount({ projectCount, getProjectCount }) {
    const classes = useStyles();

    useEffect(() => {
        getProjectCount()
    }, [getProjectCount])

    console.log(projectCount)
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            P
      </Avatar>
                    }
                    title="Project Count"
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* <br /> */}
                        <p>Total Projects {projectCount.projectsCount}</p>

                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projectCount: state.projectCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectCount: () => dispatch(getProjectCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCount)