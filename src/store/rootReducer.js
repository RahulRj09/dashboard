import { combineReducers } from 'redux';
import loginReducer from './Login/loginReducer';
import projectReducer from './Project/projectReducer';
import usersReducer from './Users/userReducer'
import addUserReducer from './Users/addUserReducer'
import resetPasswordReducer from './Reset_password/resetPasswordReducer'
import profileReducer from './Profile/profileReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    projects: projectReducer,
    users: usersReducer,
    user: addUserReducer,
    resetPassword: resetPasswordReducer,
    profile: profileReducer

})

export default rootReducer



