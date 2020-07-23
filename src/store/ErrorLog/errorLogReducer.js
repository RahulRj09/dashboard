import { ERROR_LOG_REQUEST, ERROR_LOG_SUCCESS, ERROR_LOG_FAILURE } from './errorLogTypes'

const initialState = {
    isAuth: false,
    errors: [],
    error: ""
}

const errorLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_LOG_REQUEST:
            return {
                ...state,
                isAuth: true
            }
        case ERROR_LOG_SUCCESS:
            return {
                isAuth: true,
                errors: action.payload,
                error: ''
            }
        case ERROR_LOG_FAILURE:
            return {
                isAuth: false,
                errors: [],
                error: action.payload
            }
        default:
            return state
    }
}



export default errorLogReducer