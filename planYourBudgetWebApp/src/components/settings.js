import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'

class Settings extends Component {
    componentWillReceiveProps(){
        this.setState()
    }
    render() {
        return (
            <div style={{
                textAlign: 'center'
            }}>
                <div>
                    <TextField
                        value={this.props.user.budget}
                        floatingLabelText="Your budget"
                        type="number"/>
                </div>
                <div>
                    <TextField value={this.props.user.fullname} floatingLabelText="Full name"/>
                </div>
                <div>
                    <RaisedButton label="Save settings" primary/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.authorize.user}
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)