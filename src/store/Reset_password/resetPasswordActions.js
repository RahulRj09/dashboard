import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './resetPasswordTypes'
import axios from 'axios';

const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

const resetPasswordSuccess = (payload) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: payload
    }
}

const resetPasswordFaliure = (error) => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error
    }
}

const reseetPassword = (userDetails) => {
    console.log(userDetails)
    return (dispatch) => {
        let payload = {
            username: userDetails.username,
            email: userDetails.emailId,
            oldpassword: userDetails.oldpassword,
            newpassword: userDetails.newpassword,
            clientId: userDetails.clientId
        }
        dispatch(resetPasswordRequest())
        let url = "https://auth3.mobillor.com/password/reset"
        axios.post(url, payload).then(response => {
            console.log(response)
            dispatch(resetPasswordSuccess(response))
        }).catch(err => {
            dispatch(resetPasswordFaliure(err.message))
        })
    }
}

export { reseetPassword } 
