import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import dashboardCard from '../style/dashboardCard'
import { getSubscriptionDetails } from '../store'
import { getTheExpDate, dateFormat } from '../utils/SubscriptionDate'
import getProgressBar from '../utils/ProgressBar'


const useStyles = makeStyles((theme) => dashboardCard(theme));

const SubscriptionCard = ({ subscriptionDetails, getSubscriptionDetails }) => {

    const classes = useStyles();

    useEffect(() => {
        getSubscriptionDetails()
    }, [getSubscriptionDetails])

    let development = {}
    let subscriptionInfo = subscriptionDetails.subscription
    subscriptionInfo.map(temp => {
        if (temp.type === "development") {
            development["startDate"] = dateFormat(temp.startDate)
            development["validTill"] = dateFormat(temp.validTill)
            development["rMonthsInPercents"] = getTheExpDate(temp.validTill)
        }
    })
   
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            S
          </Avatar>
                    }
                    title="Subscription"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {
                            getProgressBar(development["rMonthsInPercents"])

                        }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <br />
                        <p>Start date : {development["startDate"]}</p>
                        <p>Expiry date  {development["validTill"]} </p>

                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subscriptionDetails: state.subscriptionDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSubscriptionDetails: () => dispatch(getSubscriptionDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionCard)
