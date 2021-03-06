import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginTypes'
import axios from 'axios';

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    }
}

const loginFaliure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

const login = (loginDetails) => {
    return (dispatch) => {
        let payload = {
            username: loginDetails.username,
            password: loginDetails.password
        }
        dispatch(loginRequest)
        let url = "http://13.71.2.248:1338/login"
        return axios.post(url, payload).then(response => {
            return dispatch(loginSuccess(response.data))
        }).catch(err => {
           return dispatch(loginFaliure(err.message))
        })
    }
}

export { login } 
