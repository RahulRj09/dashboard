import { PROJECT_FLOW_REQUEST, PROJECT_FLOW_SUCCESS, PROJECT_FLOW_FAILURE } from './projectFlowTypes'

import axios from 'axios';

const projectFlowRequest = () => {
    return {
        type: PROJECT_FLOW_REQUEST
    }
}

const projectFlowSuccess = (payload) => {
    return {
        type: PROJECT_FLOW_SUCCESS,
        payload: payload
    }
}

const projectFlowFaliure = (error) => {
    return {
        type: PROJECT_FLOW_FAILURE,
        payload: error
    }
}

const getFlows = (projectName) => {
    return function (dispatch) {
        dispatch(projectFlowRequest())
        let url = 'http://13.71.2.248:8000/projects/local/' + projectName
        axios.get(url).then(response => {
            const payload = response.data
            dispatch(projectFlowSuccess(payload))
        }).catch(error => {
            dispatch(projectFlowFaliure(error.message))
        })
    }
}

export { getFlows } 
