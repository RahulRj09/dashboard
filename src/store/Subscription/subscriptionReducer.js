import { SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE } from './subscriptionTypes'

const initialState = {
    loading: false,
    subscription: {},
    error: ""
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SUBSCRIPTION_SUCCESS:
            return {
                loading: true,
                subscription: action.payload,
                error: ''
            }
        case SUBSCRIPTION_FAILURE:
            return {
                loading: false,
                subscription: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default subscriptionReducer