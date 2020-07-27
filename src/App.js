import React from 'react';
import Login from './components/Login';
import { Provider } from 'react-redux'
import store from './store/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Logout from './components/Logout';
import Project from './components/Project'
import SingleProject from './components/SingleProject'
import UserManagement from './components/UserManagement';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ErrorLog from './components/ErrorLog';
import Subscription from './components/Subscription';
import Backup from './components/Backup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/projects" component={Project} />
          <Route exact path="/singleproject" component={SingleProject} />
          <Route exact path="/user_management" component={UserManagement} />
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
