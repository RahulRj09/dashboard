import { PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE } from './projectTypes'
import axios from 'axios';

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

export { getProjects } 
