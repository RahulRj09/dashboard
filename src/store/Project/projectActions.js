import {
    PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE,
    PROJECT_COUNT_REQUEST, PROJECT_COUNT_SUCCESS, PROJECT_COUNT_FAILURE
} from './projectTypes'
import axios from 'axios';
import { PROJECT_FLOW_FAILURE } from '../Project_flow/projectFlowTypes';

const projectRequest = () => {
    return {
        type: PROJECT_REQUEST
    }
}

const projectSuccess = (payload) => {
    return {
        type: PROJECT_SUCCESS,
        payload: payload
    }
}

const projectFaliure = (error) => {
    return {
        type: PROJECT_FAILURE,
        payload: error
    }
}

const projectCountRequest = () => {
    return {
        type: PROJECT_COUNT_REQUEST
    }
}

const projectCountSuccess = (payload) => {
    return {
        type: PROJECT_COUNT_SUCCESS,
        payload: payload
    }
}

const projectCountFaliure = (error) => {
    return {
        type: PROJECT_FLOW_FAILURE,
        payload: error
    }
}

const getProjects = () => {
    return function (dispatch) {
        dispatch(projectRequest())
        let url = 'http://13.71.2.248:8000/projects'
        axios.get(url).then(response => {
            const payload = {}
            payload["projects"] = response.data.projects
            payload["active"] = response.data.active
            dispatch(projectSuccess(payload))
        }).catch(error => {
            dispatch(projectFaliure(error.message))
        })
    }
}

const getProjectCount = () => {
    return (dispatch) => {
        dispatch(projectCountRequest())
        let url = 'http://13.71.2.248:8000/projects'
        axios.get(url).then(response => {
            dispatch(projectCountSuccess(response.data.projects.length))
        }).catch(error => {
            dispatch(projectCountFaliure(error.message))
        })
    }
}

export { getProjects, getProjectCount } 
