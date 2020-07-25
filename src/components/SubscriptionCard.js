import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import dashboardCard from '../style/dashboardCard'

let today = new Date();
let date = today.toUTCString().slice(0, -4)


const useStyles = makeStyles((theme) => dashboardCard(theme));

const SubscriptionCard = () => {

    const classes = useStyles();


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
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "45%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">25%</div>
                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="45" aria-valuemax="100"></div>
                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100"></div>
                            </div>
                        }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <br />
                        <p>Start date</p>
                        <p>End date</p>

                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionCard)
