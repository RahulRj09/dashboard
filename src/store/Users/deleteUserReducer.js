import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from './userTypes'

const initialState = {
    loading: false,
    user: {},
    error: ""
}

const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                loading: true,
                user: action.payload,
                error: ''
            }
        case DELETE_USER_FAILURE:
            return {
                loading: false,
                users: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default deleteUserReducer