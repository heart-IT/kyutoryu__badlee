/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * @name- Login
 * @description- This file handles Login Screen of Badlee App.
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Modal } from "react-native";
import {
  StyleProvider,
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  Toast
} from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";

import getTheme from "../../theme/components";

import Loading from "../../components/LoadingView";
import Icon from "../../components/Icon";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Welcome from "./Welcome";
import BadleeAuthApp from "../Authenticated/Container";
import type { State } from "../../types";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/login__bg.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>
          {this.props.src}
        </Text>
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
      password: null
    };
  }

  /**
   * Called when login form is submitted. Here, we check form authencitation, and redirect user based on that.
   */
  handleFormSubmit() {
    var formData = {
      username: this.state.username,
      password: this.state.password
    };
    requestAnimationFrame(() => {
      this.props.login(formData, {
        navigator: this.props.navigator,
        component: {
          verified: BadleeAuthApp,
          not_verified: Welcome
        },
        reset: true
      });
    });
  }
  /**
   * Called when user clicks on sign up link
   */
  handleGoToSignUpLink() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Register
      });
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../images/badlee__landscape.png")}
                  style={styles.badleeLogo}
                />
              </View>
              <Text style={styles.pageTitle}>Login</Text>
              <Form style={styles.loginForm}>
                <View style={styles.inputWrapper}>
                  <Icon name="login__user" width="33" height="33" />
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
                {this.props.error === "User Does Not Exist"
                  ? <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Text style={styles.errorMsg}>
                        {this.props.error}
                      </Text>
                    </View>
                  : <Text />}

                <View style={styles.inputWrapper}>
                  <Icon name="login__password" width="33" height="33" />
                  <Item style={styles.boxWrapper}>
                    <Input
                      secureTextEntry={true}
                      last={true}
                      onChangeText={password => this.setState({ password })}
                      placeholder="Password"
                      placeholderTextColor="#7d5c85"
                      fontFamily="PoiretOne-Regular"
                      value={this.state.password}
                      style={styles.inputBox}
                    />
                  </Item>
                </View>
                {this.props.error === "Wrong Password"
                  ? <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Text style={styles.errorMsg}>
                        {this.props.error}
                      </Text>
                    </View>
                  : <Text />}
                <View style={styles.submitButtonWrapper}>
                  <Button
                    common
                    action="submit"
                    style={styles.submitButton}
                    onPress={this.handleFormSubmit.bind(this)}
                  >
                    <Text style={styles.submitButtonText}>Login</Text>
                  </Button>
                </View>
              </Form>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              <View style={styles.pageSwitcher}>
                <Text style={styles.switcherText}>New to the community?</Text>
                <Text
                  style={styles.switcherTextLink}
                  onPress={this.handleGoToSignUpLink.bind(this)}
                >
                  Sign Up
                </Text>
              </View>
            </BackgroundImage>
          </Content>
          {this.props.loading && <Loading message="Logging in.." />}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch"
  },
  logoWrapper: { display: "flex", flexDirection: "row" },
  badleeLogo: {
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 6,
    resizeMode: "contain"
  },
  pageTitle: {
    marginTop: 30,
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    fontSize: 33,
    color: "#fff"
  },
  loginForm: {
    paddingLeft: 42,
    paddingRight: 42,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto"
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  boxWrapper: {
    borderLeftWidth: 1,
    width: 180,
    paddingLeft: 12,
    borderBottomWidth: 0,
    height: 30
  },
  inputBox: {
    color: "#fff",
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: "#fff",
    height: 36,
    padding: 0,
    marginBottom: 6
  },
  errorMsg: {
    color: "#b27fe7",
    fontSize: 13,
    marginLeft: 3
  },
  submitButtonWrapper: {
    marginTop: 30
  },
  submitButton: {
    backgroundColor: "#fff",
    padding: 0,
    paddingTop: 0,
    height: 30,
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6
  },
  submitButtonText: {
    color: "#611265",
    fontFamily: "PoiretOne-Regular",
    fontSize: 15,
    lineHeight: 24
  },
  forgotPasswordText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "PoiretOne-Regular",
    textAlign: "center",
    fontSize: 16,
    marginTop: 12
  },
  pageSwitcher: {
    marginTop: 60,
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
    marginLeft: 3,
    textDecorationLine: "underline",
    color: "#fff",
    fontFamily: "PoiretOne-Regular",
    fontSize: 18
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.getIn(["application", "isLoading"]),
    error: state.getIn(["application", "error"])
  }),
  actionCreators
)(Login);

export default _Wrapped;
