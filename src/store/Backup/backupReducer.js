import { BACKUP_REQUEST, BACKUP_SUCCESS, BACKUP_FAILURE } from './backupTypes';

const initialState = {
    loading: false,
    backupData: [],
    error: ""
}

const backupReducer = (state = initialState, action) => {
    switch (action.type) {
        case BACKUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BACKUP_SUCCESS:
            return {
                loading: true,
                backupData: action.payload,
                error: ''
            }
        case BACKUP_FAILURE:
            return {
                loading: false,
                backupData: [],
                error: action.payload
            }
        default:
            return state
    }
}



export default backupReducer