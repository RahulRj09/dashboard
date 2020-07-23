import { ERROR_LOG_REQUEST, ERROR_LOG_SUCCESS, ERROR_LOG_FAILURE } from './errorLogTypes'
import axios from 'axios';

const errorLogRequest = () => {
    return {
        type: ERROR_LOG_REQUEST
    }
}

const errorLogSuccess = (payload) => {
    return {
        type: ERROR_LOG_SUCCESS,
        payload: payload
    }
}

const errorLogFaliure = (error) => {
    return {
        type: ERROR_LOG_FAILURE,
        payload: error
    }
}

const getErrors = () => {
    return (dispatch) => {

        dispatch(errorLogRequest())
        let url = ""
        return axios.get(url).then(response => {
            return dispatch(errorLogSuccess(response.data))
        }).catch(err => {
            return dispatch(errorLogFaliure(err.message))
        })
    }
}

export { getErrors } 
