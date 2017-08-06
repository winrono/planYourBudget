import React, {Component} from 'react'
import App from '../App'
import '../main.css'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import {bindActionCreators} from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CircularProgress from 'material-ui/CircularProgress';

injectTapEventPlugin();

class AppRenderer extends Component {
    render() {
        let content;

        if (this.props.isLoading) {
            content = <div className="flex-centered display-flex"><CircularProgress size={80} thickness={5}/></div>
        } else {
            content = <App/>
        }

        content = <App/>

        return (
            <MuiThemeProvider>
                {content}
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {isLoading: state.renderer.isLoading}
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRenderer)