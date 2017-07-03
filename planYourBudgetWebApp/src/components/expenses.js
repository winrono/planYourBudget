import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

class Expenses extends Component {
    constructor(props, context) {
        super(props, context)
        const {getUserExpenses} = this.props.actionCreators
        getUserExpenses("testuser")
    }
    render() {
        const {expenses} = this.props.expenses;
        const rows = expenses.map((expense, id) => <TableRow key={id}>
            <TableRowColumn>{expense.name}</TableRowColumn>
            <TableRowColumn>{expense.price}</TableRowColumn>
            <TableRowColumn>{expense.createdDateTime}</TableRowColumn>
        </TableRow>);
        return (
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
        )
    }
}

function mapStateToProps(state) {
    return {expenses: state.expenses}
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses)