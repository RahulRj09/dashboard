import { ERROR_COUNT_REQUEST, ERROR_COUNT_SUCCESS, ERROR_COUNT_FAILURE } from './errorCountTypes'

const initialState = {
    loading: false,
    errorCount: {},
    error: ""
}

const errorCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_COUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ERROR_COUNT_SUCCESS:
            return {
                loading: true,
                errorCount: action.payload,
                error: ''
            }
        case ERROR_COUNT_FAILURE:
            return {
                loading: false,
                errorCount: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default errorCountReducer