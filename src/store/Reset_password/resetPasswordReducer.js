import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './resetPasswordTypes'

const initialState = {
    loading: false,
    succeeded : false,
    resetPassword: {},
    error: ""
}

const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                succeeded: false
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: true,
                succeeded : true,
                resetPassword: action.payload,
                error: ''
            }
        case RESET_PASSWORD_FAILURE:
            return {
                loading: false,
                succeeded:false,
                resetPassword: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default resetPasswordReducer