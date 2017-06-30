import React, { Component } from 'react'
import '../App.css'

export default class Authorization extends Component {

     static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

    constructor(props, context){
        super(props, context)

        this.state = {
            username : "",
            password: ""
        }
    }
    async onAuthorize(){
        let result = await fetch("http://planyourbudgetapi.azurewebsites.net/api/user/login",
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(
                {
                    "uuid" : this.state.username,
                    "password": this.state.password
                }
            )
        });
        if (result.ok){
            this.context.router.history.push('/dashboard');
        }
        else {
            alert('please recheck your login and password');
        }
    }

    render() {
        return (
            <div className="authorization-component">
                <div>
                    <span>Login:</span>
                    <input type="text" id="loginInput" value={this.state.username} onChange={(evt) => this.setState({username: evt.target.value})} />
                </div>
                <div>
                    <span>Password:</span>
                    <input type="text" id="passwordInput" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} />
                </div>
                <input type="button" value="Try to Authorize" onClick={() => this.onAuthorize()} />
            </div>
        )
    }
}