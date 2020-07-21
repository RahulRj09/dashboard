import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from './userTypes'
import axios from 'axios';

const userRequest = () => {
    return {
        type: USER_REQUEST
    }
}

const userSuccess = (payload) => {
    return {
        type: USER_SUCCESS,
        payload: payload
    }
}

const userFaliure = (error) => {
    return {
        type: USER_FAILURE,
        payload: error
    }
}

const getUsers = () => {

}

export { getUsers } 
