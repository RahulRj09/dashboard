import React from 'react';
import Login from './components/UserManagement/Login';
import { Provider } from 'react-redux'
import store from './store/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Logout from './components/UserManagement/Logout';
import Project from './components/Project/Project'
import ProjectFlows from './components/Project/ProjectFlows'
import Users from './components/UserManagement/Users';
import Profile from './components/UserManagement/Profile';
import ForgotPassword from './components/UserManagement/ForgotPassword';
import ResetPassword from './components/UserManagement/ResetPassword';
import ErrorLog from './components/ErrorLog/ErrorLog';
import Subscription from './components/Subscription/Subscription';
import Backup from './components/Backup/Backup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/projects" component={Project} />
          <Route exact path="/project/flows" component={ProjectFlows} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route exact path="/error_log" component={ErrorLog} />
          <Route exact path="/subscription" component={Subscription} />
          <Route exact path="/backup" component={Backup} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
