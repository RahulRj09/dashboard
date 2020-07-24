import { SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE } from './subscriptionTypes'
import axios from 'axios';

const subscriptionRequest = () => {
    return {
        type: SUBSCRIPTION_REQUEST
    }
}

const subscriptionSuccess = (payload) => {
    return {
        type: SUBSCRIPTION_SUCCESS,
        payload: payload
    }
}

const subscriptionFaliure = (error) => {
    return {
        type: SUBSCRIPTION_FAILURE,
        payload: error
    }
}

const getSubscriptionDetails = () => {
    return (dispatch) => {
        dispatch(subscriptionRequest())
        let url = ""
        axios.post(url).then(response => {
            dispatch(subscriptionSuccess(response))
        }).catch(err => {
            dispatch(subscriptionFaliure(err.message))
        })
    }
}

export { getSubscriptionDetails } 
