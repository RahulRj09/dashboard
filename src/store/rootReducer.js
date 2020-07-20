import { combineReducers } from 'redux';
import loginReducer from './Login/loginReducer';
import projectReducer from './Project/projectReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    projects: projectReducer
})

export default rootReducer



