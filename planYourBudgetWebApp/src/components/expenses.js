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

        this.state = { dialogOpen: false, selectedExpenses: [] }

        const { getUserExpenses, changeAddExpenseDialogState } = this.props.actionCreators
        getUserExpenses("testuser")
        //getUserExpenses(this.props.uuid)
    }
    onRowSelection(selectedIds) {

        var expenseIds = []
        for (var i = 0; i < selectedIds.length; i++) {
            var expense = this.props.expenses.find(function (expense, id) {
                return id == selectedIds[i];
            })
            expenseIds.push(expense.expenseId);
        }
        this.setState({ selectedExpenses: expenseIds })
    }
    render() {
        const { expenses } = this.props;
        const { changeAddExpenseDialogState, removeSelectedExpenses } = this.props.actionCreators
        const rows = expenses.map((expense) => <TableRow key={expense.expenseId} selected={this.state.selectedExpenses.indexOf(expense.expenseId) > -1}>
            <TableRowColumn>{expense.expenseId}</TableRowColumn>
            <TableRowColumn>{expense.name}</TableRowColumn>
            <TableRowColumn>{expense.price}</TableRowColumn>
            <TableRowColumn>{expense.createdDateTime}</TableRowColumn>
        </TableRow>);
        return (
            <div>
                <Table onRowSelection={(selectedIds) => this.onRowSelection(selectedIds)} multiSelectable={true}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Creation time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                        {rows}
                    </TableBody>
                </Table>
                <RaisedButton label="Add expense" primary onClick={() => changeAddExpenseDialogState(true)} />
                <RaisedButton label="Remove selected" backgroundColor="red" onClick={() => removeSelectedExpenses(this.state.selectedExpenses)} />
                <AddExpense isOpen={this.state.dialogOpen} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { expenses: state.expenses.expenses, uuid: state.authorize.user.uuid }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses)