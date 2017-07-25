import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import { WEBAPI_URL } from '../constants/constants'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import { bindActionCreators } from 'redux'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

class SignIn extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context)
        this.state = {
            uuid: "",
            password: ""
        }
    }

    async onAuthorize() {
        let result = await fetch(WEBAPI_URL + "user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "uuid": this.state.uuid, "password": this.state.password })
        });
        if (result.ok) {
            this
                .props
                .actionCreators
                .SignIn(this.state.uuid);

            this
                .context
                .router
                .history
                .push('/app/expenses');
        } else {
            alert('please recheck your login and password');
        }
    }

    render() {
        return (
            <Paper
                style={{
                    padding: '20px'
                }}>
                <ValidatorForm
                    name="signInForm"
                    ref="form"
                    onError={errors => console.log(errors)}
                    onSubmit={() => this.onAuthorize()}
                >
                    <div>
                        <TextValidator
                            name="login"
                            floatingLabelText="Login"
                            value={this.state.uuid}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={(evt) => this.setState({ uuid: evt.target.value })} />
                    </div>
                    <div>
                        <TextValidator
                            name="password"
                            floatingLabelText="Password"
                            value={this.state.password}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="password"
                            autoComplete="new-password"
                            onChange={(evt) => this.setState({ password: evt.target.value })} />
                    </div>
                    <RaisedButton
                        fullWidth
                        label="Sign in"
                        primary
                        type="submit" />
                </ValidatorForm>
            </Paper >
        )
    }
}

function mapStateToProps(state) {
    return { authorize: state.authorize }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)