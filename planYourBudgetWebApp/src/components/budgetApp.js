import React, {Component} from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider';
import {BrowserRouter as Router, Link, Route, Switch, Layout} from 'react-router-dom'
import AddExpense from './addExpense'
import Expenses from './expenses'

export default class BudgetApp extends Component {
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
                            primaryText="Add expense"
                            containerElement={< Link to = {
                            `${match.url}/addExpense`
                        } />}/>
                        <Divider/>
                    </Menu>
                </Paper>
                <div
                    style={{
                    flex: '1',
                    padding: '30px',
                    overflow: 'auto'
                }}>
                    <Route path={`${match.url}/expenses`} component={Expenses}
                    />
                    <Route path={`${match.url}/addExpense`} component={AddExpense}/>
                </div>
            </div>
        )
    }
}