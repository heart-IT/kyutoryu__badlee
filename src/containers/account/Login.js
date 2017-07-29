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
import { Image } from "react-native";
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
import User from "./User";
import type { State } from "../../types";

class BackgroundImage extends Component {
  render() {
    return (
      <Image
        source={require("../../images/login__bg.png")}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </Image>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      password: null,
      screenType: "Login"
    };
  }

  formSubmit() {
    if (this.state.screenType === "Login") {
      requestAnimationFrame(() => {
        this.props.login(this.state.username, this.state.password, {
          navigator: this.props.navigator,
          component: Main,
          reset: true
        });
      });
    } else {
      requestAnimationFrame(() => {
        this.props.register(
          this.state.email,
          this.state.username,
          this.state.password,
          {
            navigator: this.props.navigator,
            component: Main,
            params: "set",
            reset: true
          }
        );
      });
    }
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
        <BackgroundImage>
          <Content>
            <Image
              source={require("../../images/badlee.png")}
              style={{
                height: 48,
                width: 48,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 6
              }}
            />
            <Text
              style={{
                marginTop: 30,
                marginBottom: 30,
                textAlign: "center",
                fontFamily: "Righteous-Regular",
                fontSize: 33,
                color: "#fff"
              }}
            >
              Login
            </Text>
            <Form style={{ paddingLeft: 80, paddingRight: 80 }}>
              <Item marxFormElement>
                <Label style={{ fontWeight: "bold" }}>Use</Label>
                <Input
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                  style={{ marginLeft: 80 }}
                />
              </Item>
              {screenType === "Register" &&
                <Item marxFormElement>
                  <Label style={{ fontWeight: "bold" }}>Email</Label>
                  <Input
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
                </Item>}
              <Item marxFormElement>
                <Label style={{ fontWeight: "bold" }}>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
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
        </BackgroundImage>
      </StyleProvider>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Login);

export default _Wrapped;
