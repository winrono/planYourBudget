import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authorization from './components/authorization'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

const store = createStore(() => {})

 class App extends Component {
  constructor(props, context){
    super(props, context);
  }
  componentDidMount() {
    
  }
  render() {
    return (
                  <Router>
            <Switch>
                          <Route path="/dashboard">
                      <h1>Welcome from routing!</h1>  
                </Route>
            <Route path="/">
      <div className="stretch display-flex">
      <Authorization />
      </div>
                  </Route>
                </Switch>
            </Router>
    );
  }
}

export default App;