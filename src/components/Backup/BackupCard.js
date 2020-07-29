import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import dashboardCard from '../../style/dashboardCard'

const useStyles = makeStyles((theme) => dashboardCard(theme));


const Backup = () => {

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            B
      </Avatar>
                    }
                    title="Backup"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">

                        <p>Backup loaction :  </p>
                        <p>Last backup time :  </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backup)
