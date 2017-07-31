import React, {Component, PropTypes} from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider';
import {BrowserRouter as Router, Link, Route, Switch, Layout} from 'react-router-dom'
import Expenses from './expenses'
import Settings from './settings'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'

class BudgetApp extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor(props, context, match) {
        super(props, context, match)
    }
    render() {
        const {match} = this.props
        return (
            <div
                style={{
                width: "100%",
                height: "100%",
                display: 'flex'
            }}>
                <Paper>
                    <Menu desktop={true}>
                        <MenuItem
                            primaryText="Expenses"
                            containerElement={< Link to = {
                            `${match.url}/expenses`
                        } />}/>
                        <Divider/>
                        <MenuItem
                            primaryText="Settings"
                            containerElement={< Link to = {
                            `${match.url}/settings`
                        } />}/>
                    </Menu>
                </Paper>
                <div
                    style={{
                    flex: '1',
                    padding: '30px',
                    overflow: 'auto'
                }}>
                    <Route path={`${match.url}/expenses`} component={Expenses}/>
                    <Route path={`${match.url}/settings`} component={Settings}/>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetApp)