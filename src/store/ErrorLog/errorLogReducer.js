import { ERROR_LOG_REQUEST, ERROR_LOG_SUCCESS, ERROR_LOG_FAILURE } from './errorLogTypes'

const initialState = {
    loading: false,
    errors: [],
    error: ""
}

const errorLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_LOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ERROR_LOG_SUCCESS:
            return {
                loading: true,
                errors: action.payload,
                error: ''
            }
        case ERROR_LOG_FAILURE:
            return {
                loading: false,
                errors: [],
                error: action.payload
            }
        default:
            return state
    }
}



export default errorLogReducer