import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField';

class AddExpense extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            name: "",
            price: 0,
            uuid: props.uuid
        }

        this.initialState = this.state;
    }
    async onAddExpense(){
        await this.props.actionCreators.addExpense(this.state)
        this.setState(this.initialState)
    }
    render() {
        const { dialogOpen } = this.props;
        const { changeAddExpenseDialogState, addExpense } = this.props.actionCreators;
        const actions = [
            <RaisedButton
                label="Close"
                primary
                style={styles.dialogButton}
                onClick={() => changeAddExpenseDialogState(false)} />,
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
                        value={this.state.name}
                        onChange={(evt) => this.setState({name: evt.target.value})}/>
                                            <TextField
                        floatingLabelText="Price"
                        value={this.state.price}
                        onChange={(evt) => this.setState({price: evt.target.value})}/>
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
    return { dialogOpen: state.expenses.addExpenseDialogOpen, uuid: state.authorize.user.uuid }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense)