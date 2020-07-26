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

let today = new Date();
let date = today.toUTCString().slice(0, -4)


const useStyles = makeStyles((theme) => dashboardCard(theme));

const SubscriptionCard = ({ subscriptionDetails, getSubscriptionDetails }) => {

    const classes = useStyles();

    const getTheExpDate = (date) => {
        let today = new Date();
        let curruntMonth = today.getMonth() + 1
        let curruntYear = today.getFullYear()
        let expDate = date.split('-')
        let expYear = expDate[0];
        let expMonth = expDate[0 + 1];

        let rMonths = (expMonth - curruntMonth) + ((expYear - curruntYear) * 12);

        let rMonthsInPercents = (rMonths * 100 / 12);
        console.log(rMonthsInPercents)
        let toReturn = rMonthsInPercents.toString().split('.')[0]
        console.log(toReturn)
        return toReturn;
    }

    const filterForDates = (date) => {
        if (date != undefined) {
            let rawData = date.split('-');
            let toReturn = rawData[2].split('T')[0] + '-' + rawData[1] + '-' + rawData[0]
            return toReturn;

        }
    }
    useEffect(() => {
        getSubscriptionDetails()
    }, [getSubscriptionDetails])

    let development = {}
    let subscriptionInfo = subscriptionDetails.subscription
    subscriptionInfo.map(temp => {
        if (temp.type === "development") {
            development["startDate"] = filterForDates(temp.startDate)
            development["validTill"] = filterForDates(temp.validTill)
            development["rMonthsInPercents"] = getTheExpDate(temp.validTill)
        }
    })
    const getProgressBar = (value) => {
        let temp;
        if (value <= 30 && value > 0) {
            temp = <div className="progress-bar bg-success" role="progressbar" style={{ width: "45%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">{value}%</div>
        } if (value > 30 && value <= 70) {
            temp = <div className="progress-bar bg-warning" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="45" aria-valuemax="100">{value}%</div>
        } if (value > 70) {
            temp = <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100">{value}%</div>
        } if (value < 0) {
            temp = <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100">expired  </div>
        }
        return <div className="progress">{temp} </div>
    }
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
                    subheader={date}
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
