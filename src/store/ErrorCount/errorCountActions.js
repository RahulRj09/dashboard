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
        let url = "http://13.71.2.248:8000/projects/logs_count"
        axios.get(url).then(response => {
            let errorData = response.data
            let errors = {
                warning: errorData.warn,
                error: errorData.error
            }

            // response.data.map(temp => {
            //     if (temp.level === 20) {
            //         errors.error += 1
            //     }
            //     if (temp.level === 30) {
            //         errors.warning += 1
            //     }
            // })

            dispatch(errorCountSuccess(errors))
        }).catch(err => {
            dispatch(errorCountFaliure(err.message))
        })
    }
}

export { getErrorCount } 
