import { ERROR_COUNT_REQUEST, ERROR_COUNT_SUCCESS, ERROR_COUNT_FAILURE } from './errorCountTypes'
import axios from 'axios';

const errorCountRequest = () => {
    return {
        type: ERROR_COUNT_REQUEST
    }
}

const errorCountSuccess = (payload) => {
    return {
        type: ERROR_COUNT_SUCCESS,
        payload: payload
    }
}

const errorCountFaliure = (error) => {
    return {
        type: ERROR_COUNT_FAILURE,
        payload: error
    }
}

const getErrorCount = () => {
    return (dispatch) => {
        dispatch(errorCountRequest())
        let url = "http://13.71.2.248:8000/projects/logs"
        axios.get(url).then(response => {
            console.log(response.data)
            dispatch(errorCountSuccess(response.data))
        }).catch(err => {
            dispatch(errorCountFaliure(err.message))
        })
    }
}

export { getErrorCount } 
