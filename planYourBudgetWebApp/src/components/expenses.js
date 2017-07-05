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

        const { getUserExpenses } = this.props.actionCreators
        getUserExpenses("testuser")
    }
    AddExpense = () => {
        console.log('added!');
    }
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true })
    }
    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }
    render() {
        const actions = [
            <RaisedButton fullWidth
                label="Save"
                primary
                onClick={() => this.AddExpense()} />
        ]
        const { expenses } = this.props.expenses;
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
                <RaisedButton label="Add expense" primary onClick={() => this.handleDialogOpen()} />
                <Dialog
                    title="Expense creation form"
                    actions={actions}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleDialogClose}
                >
                    Some content of dialog
                </Dialog>
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