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

const getProfile = (userId) => {
    return function (dispatch) {
        dispatch(profileRequest())
        let url = 'https://auth3.mobillor.com/profile/' + userId
        axios.get(url).then(response => {
            dispatch(profileSuccess(response.data[0]))
        }).catch(error => {
            dispatch(profileFaliure(error.message))
        })
    }
}

export { getProfile } 
