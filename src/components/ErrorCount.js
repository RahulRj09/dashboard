import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getErrorCount } from '../store';
import dashboardCard from '../style/dashboardCard'

let today = new Date();
let date = today.toUTCString().slice(0, -4)


const useStyles = makeStyles((theme) => dashboardCard(theme));


const ErrorCount = ({ errorCount, getErrorCount }) => {

    useEffect(() => {
        getErrorCount()
    }, [getErrorCount])

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            E
      </Avatar>
                    }
                    title="Error"
                    subheader={date}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* <br /> */}
                        <p>Warning : {errorCount.errorCount.warning} </p>
                        <p>Error : {errorCount.errorCount.error} </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorCount: state.errorCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getErrorCount: () => dispatch(getErrorCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorCount)
