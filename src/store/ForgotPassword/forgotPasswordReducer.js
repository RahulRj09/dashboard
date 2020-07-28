import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from './forgotPasswordTypes';

const initialState = {
    loading: false,
    forgotPassword: {},
    error: ""
}


const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: true,
                forgotPassword: action.payload,
                error: ''
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                loading: false,
                forgotPassword: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default forgotPasswordReducer