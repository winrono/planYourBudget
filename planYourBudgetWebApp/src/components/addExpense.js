import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

export default class AddExpense extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <TextField
                floatingLabelText="Login"
            />
        )
    }
}