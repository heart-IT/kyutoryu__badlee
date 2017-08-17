/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * @description- This file is the login page. WiP here
 * @author- heartit pirates
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
  Content,
  Icon
} from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import Main from "../static/Main";
import User from "../account/User";
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
            params: {
              registered: true
            },
            reset: true
          }
        );
      });
    }
  }

  switchPage = () => {
    if (this.state.screenType === "Login") {
      this.setState({ screenType: "Sign Up" });
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
            <Form
              style={{
                paddingLeft: 36,
                paddingRight: 36,
                width: 300,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <View style={styles.inputWrapper}>
                <Icon name="contact" style={styles.inputIcon} />
                <Item style={styles.boxWrapper}>
                  <Input
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                    placeholder="User_Name"
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    style={styles.inputBox}
                  />
                </Item>
              </View>
              {screenType === "Sign Up" &&
                <View style={styles.inputWrapper}>
                  <Icon name="settings" style={styles.inputIcon} />
                  <Item style={styles.boxWrapper}>
                    <Input
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                      placeholder="Email"
                      placeholderTextColor="#7d5c85"
                      fontFamily="PoiretOne-Regular"
                      style={styles.inputBox}
                    />
                  </Item>
                </View>}
              <View style={styles.inputWrapper}>
                <Icon name="settings" style={styles.inputIcon} />
                <Item style={styles.boxWrapper}>
                  <Input
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    placeholder="Password"
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    value={this.state.password}
                    style={styles.inputBox}
                  />
                </Item>
              </View>
              <View style={{ marginBottom: 30 }} />
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Button
                  common
                  onPress={this.formSubmit.bind(this)}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>
                    {screenType}
                  </Text>
                </Button>
              </View>
            </Form>
            {screenType === "Login" &&
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>}
            <View style={styles.pageSwitcher}>
              <Text style={styles.switcherText}>
                {screenType === "Login"
                  ? "New to the community?"
                  : "Already have an account"}
              </Text>
              <Text style={styles.switcherTextLink} onPress={this.switchPage}>
                {screenType === "Login" ? "Sign Up" : "Login"}
              </Text>
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
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputIcon: {
    color: "#fff",
    flex: 3,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#fff"
  },
  boxWrapper: {
    flex: 12,
    paddingLeft: 15,
    borderBottomWidth: 0
  },
  inputBox: {
    color: "#fff",
    fontSize: 21,
    borderBottomWidth: 2,
    borderColor: "#fff",
    height: 36,
    padding: 0,
    marginBottom: 12
  },
  submitButton: {
    backgroundColor: "#fff",
    padding: 0,
    paddingTop: 0,
    height: 42,
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto"
  },
  submitButtonText: {
    color: "#611265",
    fontFamily: "PoiretOne-Regular",
    fontSize: 18
  },
  forgotPasswordText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "PoiretOne-Regular",
    textAlign: "center",
    fontSize: 16,
    marginTop: 9
  },
  pageSwitcher: {
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  switcherText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "PoiretOne-Regular",
    fontSize: 16
  },
  switcherTextLink: {
    marginLeft: 6,
    textDecorationLine: "underline",
    color: "#fff",
    fontFamily: "PoiretOne-Regular",
    fontSize: 18
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Login);

export default _Wrapped;
