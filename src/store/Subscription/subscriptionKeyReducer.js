import {
    RE_GENERATE_SUBSCRIPTION_KEY_FAILURE,
    RE_GENERATE_SUBSCRIPTION_KEY_REQUEST,
    RE_GENERATE_SUBSCRIPTION_KEY_SUCCESS
} from './subscriptionTypes'

const initialState = {
    loading: false,
    subscriptionKey: {},
    error: ""
}

const subscriptionKeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case RE_GENERATE_SUBSCRIPTION_KEY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RE_GENERATE_SUBSCRIPTION_KEY_SUCCESS:
            return {
                loading: true,
                subscription: action.payload,
                error: ''
            }
        case RE_GENERATE_SUBSCRIPTION_KEY_FAILURE:
            return {
                loading: false,
                subscription: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default subscriptionKeyReducer