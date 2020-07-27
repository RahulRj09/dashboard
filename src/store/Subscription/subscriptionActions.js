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
        let url = "http://104.211.200.240:1340/licenses/5e6b75bd377d20b20cc3e35e"
        axios.get(url).then(response => {
            dispatch(subscriptionSuccess(response.data))
        }).catch(err => {
            dispatch(subscriptionFaliure(err.message))
        })
    }
}

const reGenerateSubscriptionkey = (data) => {
    return (dispatch) => {
        dispatch()
        let url = "http://104.211.200.240:1340/regenerate-dev-key"
    }
}

export { getSubscriptionDetails } 
