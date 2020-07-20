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
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
