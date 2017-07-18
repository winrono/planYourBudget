import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import AddExpense from './addExpense'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

class Expenses extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = { dialogOpen: false }

        const { getUserExpenses, changeAddExpenseDialogState } = this.props.actionCreators
        getUserExpenses("testuser")
    }
    render() {
        const { expenses } = this.props.expenses;
        const {changeAddExpenseDialogState } = this.props.actionCreators
        const rows = expenses.map((expense, id) => <TableRow key={id}>
            <TableRowColumn>{expense.name}</TableRowColumn>
            <TableRowColumn>{expense.price}</TableRowColumn>
            <TableRowColumn>{expense.createdDateTime}</TableRowColumn>
        </TableRow>);
        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Creation time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {rows}
                    </TableBody>
                </Table>
                <RaisedButton label="Add expense" primary onClick={() => changeAddExpenseDialogState(true)} />
                <AddExpense isOpen={this.state.dialogOpen} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { expenses: state.expenses }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses)