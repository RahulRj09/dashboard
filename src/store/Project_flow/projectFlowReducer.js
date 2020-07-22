import { PROJECT_FLOW_REQUEST, PROJECT_FLOW_SUCCESS, PROJECT_FLOW_FAILURE } from './projectFlowTypes'

const initialState = {
    loading: false,
    flows: [],
    error: ""
}

const projectFlowReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_FLOW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PROJECT_FLOW_SUCCESS:
            return {
                loading: true,
                flows: action.payload,
                error: ''
            }
        case PROJECT_FLOW_FAILURE:
            return {
                loading: false,
                flows: [],
                error: action.payload
            }
        default:
            return state
    }
}



export default projectFlowReducer