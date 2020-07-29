import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAILURE,
    RE_GENERATE_SUBSCRIPTION_KEY_FAILURE,
    RE_GENERATE_SUBSCRIPTION_KEY_REQUEST,
    RE_GENERATE_SUBSCRIPTION_KEY_SUCCESS
} from './subscriptionTypes'
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

const subscriptionKeyRequest = () => {
    return {
        type: RE_GENERATE_SUBSCRIPTION_KEY_REQUEST
    }
}

const subscriptionKeySuccess = (payload) => {
    return {
        type: RE_GENERATE_SUBSCRIPTION_KEY_SUCCESS,
        payload: payload
    }
}

const subscriptionKeyFaliure = (error) => {
    return {
        type: RE_GENERATE_SUBSCRIPTION_KEY_FAILURE,
        payload: error
    }
}



const getSubscriptionDetails = (id) => {
    return (dispatch) => {
        dispatch(subscriptionRequest())
        let url = "http://104.211.200.240:1340/licenses/" + id
        axios.get(url).then(response => {
            dispatch(subscriptionSuccess(response.data))
        }).catch(err => {
            dispatch(subscriptionFaliure(err.message))
        })
    }
}

const reGenerateSubscriptionkey = (data) => {
    return (dispatch) => {
        dispatch(subscriptionKeyRequest())
        let payload = {
            name: data.name,
            email: data.email,
            orderId: data.orderId
        }
        let url = ""
        if (data.keytype === "development") {
            url = "http://104.211.200.240:1340/regenerate-dev-key"
        }
        axios.post(url, payload).then(response => {
            dispatch(subscriptionKeySuccess(response.data))
        }).catch(err => {
            dispatch(subscriptionKeyFaliure(err.message))
        })

    }
}

export { getSubscriptionDetails, reGenerateSubscriptionkey } 
