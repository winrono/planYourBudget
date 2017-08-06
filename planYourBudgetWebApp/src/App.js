import React, {Component} from 'react';
import logo from './logo.svg';
import './main.css';
import Authorization from './components/authorization'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux'
import * as actionCreators from './actions/actionCreators'
import {bindActionCreators} from 'redux'
import BudgetApp from './components/budgetApp'
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {user} = this.props
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="stretch display-flex">
                <Authorization/>
              </div>
            </Route>
            <Route
              path="/app"
              render={(props) => {
              if (user) {
                return (<BudgetApp {...props}/>)
              } else {
                return (<Redirect to="/"/>)
              }
            }}/>
          </Switch>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.authorize.user}
}

function mapDispatchToProps(dispatch) {
  return {
    actionCreators: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)