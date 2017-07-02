/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * This file is the login page. WiP here
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View,
  Content
} from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../action_creators";
import Main from "../static/Main";
import type { State } from "../../types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      passwd: null,
      screenType: "Login"
    };
  }

  formSubmit() {
    requestAnimationFrame(() => {
      this.props.login(this.state.username, this.state.passwd, {
        navigator: this.props.navigator,
        component: Main,
        reset: true
      });
    });
  }

  switchPage = () => {
    if (this.state.screenType === "Login") {
      this.setState({ screenType: "Register" });
    } else {
      this.setState({ screenType: "Login" });
    }
  };

  render() {
    const screenType = this.state.screenType;
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Text
            style={{
              marginTop: 60,
              marginBottom: 9,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 24,
              color: "#6f156d"
            }}
          >
            badlee
          </Text>
          <Text
            style={{
              color: "#616161",
              marginBottom: 20,
              textAlign: "center",
              fontSize: 14
            }}
          >
            badal ke dekho zara samaan
          </Text>
          <Form style={{ paddingLeft: 20, paddingRight: 20 }}>
            {screenType === "Register" &&
              <Item floatingLabel marxFormElement>
                <Label style={{ fontWeight: "bold" }}>Email</Label>
                <Input
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </Item>}
            <Item floatingLabel marxFormElement>
              <Label style={{ fontWeight: "bold" }}>Username</Label>
              <Input
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </Item>
            <Item floatingLabel marxFormElement>
              <Label style={{ fontWeight: "bold" }}>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={passwd => this.setState({ passwd })}
                value={this.state.passwd}
              />
            </Item>
            <View style={{ marginBottom: 30 }} />
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Button
                violet
                common
                block
                marxFormElement
                onPress={this.formSubmit.bind(this)}
              >
                <Text>
                  {screenType}
                </Text>
              </Button>
            </View>
          </Form>
          {screenType === "Login" &&
            <Text
              style={{
                color: "#616161",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 4
              }}
            >
              Forgot password?
            </Text>}
          <View
            style={{
              marginTop: 60,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {screenType === "Login"
                ? "Don't have an account?"
                : "Already have an account"}
            </Text>
            <Button
              onPress={this.switchPage}
              style={{
                marginLeft: 6,
                backgroundColor: "#DE6449",
                borderRadius: 4
              }}
            >
              <Text style={{ fontWeight: "400", fontSize: 14 }}>
                {screenType === "Login" ? "Register" : "Login"}
              </Text>
            </Button>
          </View>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Login);

export default _Wrapped;
