import { USER_REQUEST, USER_SUCCESS, USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from './userTypes'
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


const addUserRequest = () => {
    return {
        type: ADD_USER_REQUEST
    }
}

const addUserSuccess = (payload) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: payload
    }
}

const addUserFaliure = (error) => {
    return {
        type: ADD_USER_FAILURE,
        payload: error
    }
}

const getUsers = () => {
    return function (dispatch) {
        dispatch(userRequest())
        let url = 'https://auth3.mobillor.com/getAllUsers'
        axios.get(url).then(response => {
            console.log(response.data)
            let data = []
            response.data.map(user => {
                data.push({
                    userName: user.username,
                    name: user.name,
                    emailId: user.email,
                    userRole: user.roles
                })
            })
            dispatch(userSuccess(data))
        }).catch(error => {
            dispatch(userFaliure(error.message))
        })
    }
}

const addUser = (userDetails) => {
    console.log(userDetails)
    return (dispatch) => {
        let payload = {
            username: userDetails.userName,
            email: userDetails.emailId,
            name: userDetails.name,
            clientId: userDetails.clientId
        }
        dispatch(addUserRequest)
        let url = "https://auth3.mobillor.com/ipaasusers/user"
        axios.post(url, payload).then(response => {
            console.log(response)
            dispatch((response.data))
        }).catch(err => {
            dispatch(addUserFaliure(err.message))
        })
    }
}

export { getUsers, addUser } 
