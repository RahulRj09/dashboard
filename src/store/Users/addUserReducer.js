import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from './userTypes'

const initialState = {
    loading: false,
    user: {},
    error: ""
}

const addUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_USER_SUCCESS:
            return {
                loading: true,
                user: action.payload,
                error: ''
            }
        case ADD_USER_FAILURE:
            return {
                loading: false,
                users: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default addUserReducer