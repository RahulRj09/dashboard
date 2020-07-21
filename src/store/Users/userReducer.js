import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from './userTypes'

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SUCCESS:
            return {
                loading: true,
                projects: action.payload,
                error: ''
            }
        case USER_FAILURE:
            return {
                loading: false,
                projects: [],
                active: "",
                error: action.payload
            }
        default:
            return state
    }
}



export default usersReducer