import React, {Component} from 'react'
import '../main.css'
import SignIn from './signIn'
import SignUp from './signUp'
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Authorization extends Component {
    render() {
        return (
            <div className="flex-centered">
                <Tabs>
                    <Tab label="Sign In">
                        <SignIn/>
                    </Tab>
                    <Tab label="Sign Up">
                        <SignUp/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}