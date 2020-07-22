import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from './profileTypes'
import projectReducer from '../Project/projectReducer'

const initialState = {
    loading: false,
    profile: [],
    error: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PROFILE_SUCCESS:
            return {
                loading: true,
                profile: action.payload,
                error: ''
            }
        case PROFILE_FAILURE:
            return {
                loading: false,
                profile: [],
                error: action.payload
            }
        default:
            return state
    }
}



export default profileReducer