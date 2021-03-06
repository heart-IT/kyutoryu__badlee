/**
 * @name- login.js
 * 
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * @description- This file is Login Screen of badlee App.
 * 
 * @author- heartit pirates were here
 */
import { Button, Container, Content, Form, Input, Item, StyleProvider, Text, View } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import Loading from '../../components/LoadingView';
import getTheme from '../../theme/components';
import BadleeAuthApp from '../Authenticated/goingMerry';
import ForgotPassword from './forgotPassword';
import Register from './register';
import Welcome from './welcome';

("use strict");

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/login__bg.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>{this.props.src}</Text>
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.forgotPassPage = this.forgotPassPage.bind(this);
    this.handleGoToSignUpLink = this.handleGoToSignUpLink.bind(this);
  }
  /**
   * Called when login form is submitted. Here, we check form authencitation, and redirect user based on that.
   */
  handleFormSubmit() {
    try {
      if (!this.state.username) {
        throw "Enter username..";
      }
      this.props.clearError("Enter username..");
      if (!this.state.password) {
        throw "Enter password..";
      }
      this.props.clearError("Enter password..");

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
    } catch (err) {
      this.props.addError(err);
    }
  }
  /**
   * Called when sign up is clicked
   */
  handleGoToSignUpLink() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Register
      });
    });
  }
  /**
   * Called when forgot password is clicked
   */
  forgotPassPage() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: ForgotPassword
      });
    });
  }

  render() {
    let { error } = this.props;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  {error.includes("User Does Not Exist") ? (
                    <Text style={styles.errorMsg}>User Does Not Exist</Text>
                  ) : (
                    <Text />
                  )}
                  {error.includes("Enter username..") ? (
                    <Text style={styles.errorMsg}>Enter username..</Text>
                  ) : (
                    <Text />
                  )}
                </View>

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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  {error.includes("Wrong Password") ? (
                    <Text style={styles.errorMsg}>Wrong Password</Text>
                  ) : (
                    <Text />
                  )}
                  {error.includes("Enter password..") ? (
                    <Text style={styles.errorMsg}>Enter password..</Text>
                  ) : (
                    <Text />
                  )}
                </View>
                <View style={styles.submitButtonWrapper}>
                  <Button
                    common
                    action="submit"
                    style={styles.submitButton}
                    onPress={this.handleFormSubmit}
                  >
                    <Text style={styles.submitButtonText}>Login</Text>
                  </Button>
                </View>
              </Form>
              <Text
                style={styles.forgotPasswordText}
                onPress={this.forgotPassPage}
              >
                Forgot password?
              </Text>
              <View style={styles.pageSwitcher}>
                <Text style={styles.switcherText}>New to the community?</Text>
                <Text
                  style={styles.switcherTextLink}
                  onPress={this.handleGoToSignUpLink}
                >
                  Sign Up
                </Text>
              </View>
            </BackgroundImage>
          </Content>
          {this.props.loading && <Loading message="" />}
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
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    error: state.getIn(["application", "errors"])
  }),
  actionCreators
)(Login);

export default _Wrapped;
