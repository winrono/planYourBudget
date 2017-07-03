import React, {Component} from 'react';
import { ToolbarAndroid, FlatList, Alert, StyleSheet, TextInput, Button, View, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Content, ListItem, CheckBox, Text, Body} from 'native-base';

export default class App extends React.Component {
      render() {
    return (
      <View style={styles.container}>
        <MainScreenNavigator style={{ width: Dimensions.get('window').width }} />
      </View>
    );
  }
}

export class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {username : '', password : ''};
        this.onAuthorize = this.onAuthorize.bind(this);
    }
    render() {
        return (
          <Container style={styles.container}>
            <Text>User name:</Text>
                  <TextInput
    style={{height: 40, width:100, borderColor: 'gray', borderWidth: 1}}
onChangeText={(text) => this.setState({username: text})}
value={this.state.username}
            />
            <Text>Password:</Text>
<TextInput
style={{height: 40, width:100, borderColor: 'gray', borderWidth: 1}}
onChangeText={(text) => this.setState({password : text})}
value={this.state.password}
            />
<Button onPress={this.onAuthorize} title='Authorize'/>
        <Content>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
}
async onAuthorize() {
    try {
    let response = await fetch('http://planyourbudgetapi.azurewebsites.net/api/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            UUID: this.state.username,
            Password: this.state.password,
        })
    });
    if (response.ok){
            let responseJson = await response.json();
            this.props.navigation.navigate("Success", {user: responseJson.uuid}); 

    }
    else {
        Alert.alert('User not found');
    }
    }
    catch (error){
        Alert.alert("Unexpected error happened. Please try again later.")
    }
}
}

export class SuccessScreen extends React.Component {
  render() {
      const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
        alignSelf: 'stretch'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});
const MainScreenNavigator = StackNavigator({
    Login: {
        screen: LoginScreen
    },
    Success: {
        screen: SuccessScreen
    }
}, {
    headerMode: 'none',
});