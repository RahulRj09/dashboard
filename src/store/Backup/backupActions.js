import { BACKUP_REQUEST, BACKUP_SUCCESS, BACKUP_FAILURE } from './backupTypes';
import axios from 'axios';

const backupRequest = () => {
    return {
        type: BACKUP_REQUEST
    }
}

const backupSuccess = (payload) => {
    return {
        type: BACKUP_SUCCESS,
        payload: payload
    }
}

const backupFaliure = (error) => {
    return {
        type: BACKUP_FAILURE,
        payload: error
    }
}

const getBackupData = (backupParameters) => {
    return (dispatch) => {
        let projectName = backupParameters.projectname
        let backupDate = convertDate(backupParameters.backupdate)
        dispatch(backupRequest())
        let url = `http://13.71.2.248:8000/projects/backup/${projectName}/${backupDate}`
        console.log(url)
        axios.get(url).then(response => {
            console.log(response)
            dispatch(backupSuccess(response.data))
        }).catch(err => {
            dispatch(backupFaliure(err.message))
        })
    }
}

const convertDate = (date) => {
    let newDate = ""
    let day = date.getUTCDate() + 1
    let month = date.getUTCMonth() + 1
    let year = date.getUTCFullYear()
    newDate = `${day}-${month}-${year}`
    return newDate
}

export { getBackupData } 