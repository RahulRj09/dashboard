import React, { useState } from 'react'
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

const useStyles = makeStyles((theme) => dashboardCard(theme));


const ErrorCount = () => {

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
                    title="Error Count"
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {/* <br /> */}
                        <p>Warning </p>
                        <p>Error</p>
                        <p>Fatal error </p>

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
