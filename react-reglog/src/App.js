import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Header from './components/Header'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import User from './components/User'


class App extends Component {
  _isMounted=false;
  constructor(props){
    super(props)
    this.state={
      redir: false,
      userName: '',
      mail: '',
      password: '',
      alert: ''
    }
  }
  
  render(){
    return (
      <Router>
        <Route path='/' exact>
          <Header
            enableButton= 'false'
          />
          <Login/>
        </Route>
        <Route path='/register'>
          <Header
            contentButton= 'Cancel'
            enableButton= 'true'
            classButton= 'btn-dark'
          />
          <NewAccount/>
        </Route>
        <Route path='/user' exact>
          <Header
            contentButton= 'Log Out'
            enableButton= 'true'
            classButton= 'btn-danger'
            logout='true'
            logFunc={this.logOut}
          />
          <User
            user= {this.state.userName}
            mail={this.state.mail}
            pass={this.state.password}
            alert={this.state.alert}
          />
        </Route>
      </Router>
    );
  }
}

export default App;
