import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField';

class ExpenseEditor extends Component {
    constructor(props, context) {
        super(props, context)
    }
    async onAddExpense() {
        try {
            await this.props.actionCreators.addExpense(this.state)
        }
        catch (e) {
        }
        this.setState(this.initialState)
    }
    render() {
        const { dialogOpen, expense } = this.props;
        const { changeExpenseEditorState, addExpense } = this.props.actionCreators;
        const actions = [
            <RaisedButton
                label="Close"
                primary
                style={styles.dialogButton}
                onClick={() => changeExpenseEditorState(false)} />,
            <RaisedButton
                label="Save"
                primary
                style={styles.dialogButton}
                onClick={() => this.onAddExpense()} />
        ]
        return (
            <Dialog
                title="Expense creation form"
                actions={actions}
                open={dialogOpen}
                modal={true}
                onRequestClose={this.closeDialog}>
                <TextField
                    floatingLabelText="Name"
                    value={expense.name}
                    onChange={(evt) => this.setState({ name: evt.target.value })} />
                <TextField
                    floatingLabelText="Price"
                    value={expense.price}
                    onChange={(evt) => this.setState({ price: evt.target.value })} />
            </Dialog>
        )
    }
}

const styles = {
    dialogButton: {
        margin: "0 5px"
    }
}

function mapStateToProps(state) {
    return { dialogOpen: state.expenses.expenseEditorOpen, uuid: state.authorize.user.uuid }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditor)