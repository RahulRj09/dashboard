import { PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE } from './projectTypes'

const initialState = {
    loading: false,
    projects: [],
    active: "",
    error: ""
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PROJECT_SUCCESS:
            return {
                loading: true,
                projects: action.payload.projects,
                active: action.payload.active,
                error: ''
            }
        case PROJECT_FAILURE:
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



export default projectReducer