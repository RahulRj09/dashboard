import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginTypes'

const initialState = {
    isAuth: false,
    userData: {},
    error: ""
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isAuth: true
            }
        case LOGIN_SUCCESS:
            return {
                isAuth: true,
                userData: action.payload,
                error: ''
            }
        case LOGIN_FAILURE:
            return {
                isAuth: false,
                userData: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default loginReducer