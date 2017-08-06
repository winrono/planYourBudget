import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import * as date from '../utils/date'

class ExpenseEditor extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            expense: {
                name: "",
                price: "",
                createdDateTime: null,
                uuid: this.props.uuid
            },
            new: false
        }

        this.initialState = this.state
    }
    async onSave() {
        var preparedExpense = {
            ...this.state.expense,
            createdDateTime: date.formatDate(this.state.expense.createdDateTime)
        }

        if (this.state.new) {
            this.props.actionCreators.addExpense(preparedExpense)
        }
        else {
            this.props.actionCreators.updateExpense(preparedExpense)
        }
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.expense) {
            this.setState({
                expense: {
                    ...nextProps.expense,
                    createdDateTime: new Date(nextProps.expense.createdDateTime)
                }, new: false
            })
        }
        else {
            this.setState({ expense: this.initialState.expense, new: true })
        }
    }
    render() {
        const { dialogOpen } = this.props;
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
                onClick={() => this.onSave()} />
        ]
        return (
            <Dialog
                title="Expense creation form"
                actions={actions}
                open={dialogOpen}
                modal={true}
                onRequestClose={this.closeDialog}>
                <div>
                    <TextField
                        floatingLabelText="Name"
                        value={this.state.expense.name}
                        onChange={(evt) => this.setState({ expense: { ...this.state.expense, name: evt.target.value } })} />
                </div>
                <div>
                    <TextField
                        floatingLabelText="Price"
                        value={this.state.expense.price}
                        onChange={(evt) => this.setState({ expense: { ...this.state.expense, price: evt.target.value } })} />
                </div>
                <div>
                    <DatePicker
                        floatingLabelText="Date"
                        value={this.state.expense.createdDateTime}
                        onChange={(evt, date) => this.setState({ expense: { ...this.state.expense, createdDateTime: date } })} />
                </div>
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