import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from './forgotPasswordTypes';
import axios from 'axios';

const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
}

const forgotPasswordSuccess = (payload) => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: payload
    }
}

const forgotPasswordFaliure = (error) => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: error
    }
}

const forgotPassword = (forgotPasswordPayload) => {
    return (dispatch) => {
        console.log(forgotPasswordPayload)
        dispatch(forgotPasswordRequest())
        let url = "https://auth3.mobillor.com/password/forgot"
        axios.post(url, forgotPasswordPayload).then(response => {
            dispatch(forgotPasswordSuccess(response.data))
        }).catch(err => {
            dispatch(forgotPasswordFaliure(err.message))
        })
    }
}

export { forgotPassword } 
