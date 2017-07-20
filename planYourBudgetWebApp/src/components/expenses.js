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
import ExpenseEditor from './expenseEditor'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

const iconStyles = {
    marginRight: 24,
};

const editingExpense = {
    name: undefined,
    price: undefined
}

class Expenses extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            dialogOpen: false, selectedExpenses: [], editingExpense: editingExpense,
        }

        const { getUserExpenses } = this.props.actionCreators
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
    openExpenseEditor(e, expense) {
        e.preventDefault()
        e.stopPropagation()
        this.props.actionCreators.changeExpenseEditorState(true)
        this.setState({ editingExpense: expense })
    }
    render() {
        const { expenses } = this.props;
        const { changeExpenseEditorState, removeSelectedExpenses, addCreatedExpense } = this.props.actionCreators
        const rows = expenses.map((expense, id) => <TableRow key={expense.expenseId} selected={this.state.selectedExpenses.indexOf(expense.expenseId) > -1}>
            <TableRowColumn>{expense.expenseId}</TableRowColumn>
            <TableRowColumn>{expense.name}</TableRowColumn>
            <TableRowColumn>{expense.price}</TableRowColumn>
            <TableRowColumn>{expense.createdDateTime}</TableRowColumn>
            <TableRowColumn>
                <IconButton onClick={(evt) => this.openExpenseEditor(evt, expense)} iconClassName="material-icons">edit</IconButton>
            </TableRowColumn>
        </TableRow>);
        return (
            <div>
                <Table onRowSelection={(selectedIds) => this.onRowSelection(selectedIds)} multiSelectable={true} showCheckboxes={true}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={true}>
                        <TableRow>
                            <TableHeaderColumn>Id</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Creation time</TableHeaderColumn>
                            <TableHeaderColumn>Edit</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                        {rows}
                    </TableBody>
                </Table>
                <div>
                    <RaisedButton label="Add expense" primary onClick={() => {
                        changeExpenseEditorState(true)
                        this.state.editingExpense = editingExpense;
                    }} />
                    <RaisedButton label="Remove selected" backgroundColor="red" onClick={() => removeSelectedExpenses(this.state.selectedExpenses)} />
                </div>
                <ExpenseEditor expense={this.state.editingExpense} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { expenses: state.expenses.expenses, dialogOpen: state.expenses.expenseEditorOpen, uuid: state.authorize.user.uuid }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses)