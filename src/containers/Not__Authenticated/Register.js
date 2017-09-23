/**
 * @name- register.js
 * 
 * @chill- All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * @description- This file is the Register Page
 * 
 * @author- heartit pirates
 * 
 * @todo- 1. ask mridul to make a middleware api to check uniqueness of uniquename and email
 */
import { Button, Container, Content, Form, Header, Input, Item, Left, Right, StyleProvider, Text, View } from 'native-base';
import React from 'react';
import { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Loading from '../../components/LoadingView';
import getTheme from '../../theme/components';
import Register2 from './register2';

("use strict");

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Register page 2 BG.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>{this.props.src}</Text>
        {this.props.children}
      </Image>
    );
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      uniqueName: null,
      email: null,
      password: null,
      rePassword: null,

      passwordMatch: false
    };
  }

  removeError(error) {
    this.props.clearError(error);
  }
  addError(error) {
    this.props.addError(error);
  }

  validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(this.state.email);
    if (valid) {
      this.removeError("Invalid Email");
      this.props.checkEmailUniqueness(this.state.email);
    } else {
      this.addError("Invalid Email");
    }
  }
  validateUniquename() {
    this.props.checkUsernameUniqueness(this.state.uniqueName);
  }

  validatePassword() {
    if (this.state.password && this.state.rePassword) {
      if (this.state.password !== this.state.rePassword) {
        this.setState({ passwordMatch: false });
        this.addError("Password does not match");
      } else {
        this.setState({ passwordMatch: true });
        this.removeError("Password does not match");
      }
    }
  }

  goToPageTwo() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Register2,
        params: {
          userInfo: this.state
        }
      });
    });
  }

  render() {
    let { errors } = this.props;
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left>
              <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </Left>
            <Right>
              <Text style={{ color: "#fff", fontSize: 15 }}>1 of 2</Text>
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <Form style={styles.formLeftSpace}>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{
                        fontSize: 15,
                        color: "#fff"
                      }}
                      placeholder="First Name"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      onChangeText={firstName => this.setState({ firstName })}
                    />
                  </Item>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15, color: "#fff" }}
                      placeholder="Last Name"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      onChangeText={lastName => this.setState({ lastName })}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15, color: "#fff" }}
                      placeholder="Your unique name on badlee"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      onChangeText={uniqueName => this.setState({ uniqueName })}
                      onEndEditing={this.validateUniquename.bind(this)}
                    />
                  </Item>
                </View>
                {errors.includes("Username already exists") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.errorMsg}>Username already exists</Text>
                  </View>
                ) : (
                  <Text />
                )}
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15, color: "#fff" }}
                      placeholder="Your email address"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      onChangeText={email => this.setState({ email })}
                      onEndEditing={this.validateEmail.bind(this)}
                      keyboardType={"email-address"}
                    />
                  </Item>
                </View>
                {errors.includes("Invalid Email") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.errorMsg}>Invalid Email</Text>
                  </View>
                ) : (
                  <Text />
                )}
                {errors.includes("Email already exists") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.errorMsg}>Email already exists</Text>
                  </View>
                ) : (
                  <Text />
                )}

                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15, color: "#fff" }}
                      placeholder="Create a password"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                      onEndEditing={this.validatePassword.bind(this)}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15, color: "#fff" }}
                      placeholder="Re-enter password"
                      placeholderTextColor="rgba(255, 255, 255, 0.67)"
                      secureTextEntry={true}
                      error={this.state.passwordMatch ? true : false}
                      onChangeText={rePassword => this.setState({ rePassword })}
                      onEndEditing={this.validatePassword.bind(this)}
                    />
                  </Item>
                </View>
                {errors.includes("Password does not match") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.errorMsg}>Password does not match</Text>
                  </View>
                ) : (
                  <Text />
                )}
              </Form>
              <Button
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  borderRadius: 9
                }}
                disabled={
                  !this.state.firstName ||
                  !this.state.lastName ||
                  !this.state.uniqueName ||
                  !this.state.email ||
                  !this.state.password ||
                  !this.state.rePassword ||
                  !(errors.size === 0)
                }
                onPress={this.goToPageTwo.bind(this)}
              >
                <Text>Next</Text>
              </Button>
            </BackgroundImage>
          </Content>
          {this.props.loading && <Loading message="Moving on.." />}
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
  formLeftSpace: { paddingRight: "27%", paddingTop: 9, paddingLeft: 15 },
  inputRow: { display: "flex", flexDirection: "row", marginTop: 36 },
  inputBox: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.67)",
    height: 36,
    marginLeft: 9,
    marginRight: 9,
    padding: 0
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
  },
  errorMsg: {
    color: "#eb9ce1",
    fontSize: 13,
    marginLeft: 3,
    marginRight: 9
  }
};

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    errors: state.getIn(["application", "errors"])
  }),
  actionCreators
)(Register);

export default _Wrapped;
