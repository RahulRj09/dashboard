import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from './profileTypes'
import axios from 'axios';


const profileRequest = () => {
    return {
        type: PROFILE_REQUEST
    }
}

const profileSuccess = (payload) => {
    return {
        type: PROFILE_SUCCESS,
        payload: payload
    }
}

const profileFaliure = (error) => {
    return {
        type: PROFILE_FAILURE,
        payload: error
    }
}

const getProfile = () => {
    return function (dispatch) {
        dispatch(profileRequest())
        let url = 'http://13.71.2.248:8000/profile'
        axios.get(url).then(response => {
            console.log(response)
            dispatch(profileSuccess(response))
        }).catch(error => {
            dispatch(profileFaliure(error.message))
        })
    }
}

export { getProfile } 
