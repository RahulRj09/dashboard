import { PROJECT_COUNT_REQUEST, PROJECT_COUNT_SUCCESS, PROJECT_COUNT_FAILURE } from './projectTypes'

const initialState = {
    loading: false,
    projectsCount: {},
    error: ""
}

const projectCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_COUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PROJECT_COUNT_SUCCESS:
            return {
                loading: true,
                projectsCount: action.payload,
                error: ''
            }
        case PROJECT_COUNT_FAILURE:
            return {
                loading: false,
                projectsCount: {},
                error: action.payload
            }
        default:
            return state
    }
}



export default projectCountReducer