/**
 * @name- forgotPassword.js
 * @chill- A wandering monk asked, "Oh venerable Buddha, does a 'Self' exist?" And the Buddha was silent. "Then, oh venerable one, does a 'Self' not exist?" And again the Buddha was silent. - Buddha
 * @description- Forgot Password screen
 * @author- heartit pirates were here
 */
"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";

import {
  StyleProvider,
  Container,
  Content,
  View,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import type { State } from "../../types";
import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";
import Loading from "../../components/LoadingView";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/reset-password-phone.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>{this.props.src}</Text>
        {this.props.children}
      </Image>
    );
  }
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      error: null
    };
  }
  handleFormSubmit() {
    if (this.state.email) {
      requestAnimationFrame(() => {
        this.props.forgotPassword(this.state.email);
      });
    } else {
      this.setState({ error: "Enter email.." });
    }
  }
  validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(this.state.email);
    if (valid) {
      this.setState({ error: null });
    } else {
      this.setState({ error: "Invalid Email" });
    }
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <Text style={styles.heading}>Don't worry!</Text>
              <Text style={styles.formLabel}>
                Enter registered e-mail id to reset password
              </Text>
              <Form>
                <Item style={styles.boxWrapper}>
                  <Input
                    onChangeText={email => this.setState({ email })}
                    onEndEditing={this.validateEmail.bind(this)}
                    keyboardType={"email-address"}
                    value={this.state.email}
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    style={styles.inputBox}
                  />
                </Item>
                {this.state.error === "Invalid Email" ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#b27fe7",
                        fontSize: 13,
                        marginLeft: 3,
                        marginRight: 18
                      }}
                    >
                      Invalid Email
                    </Text>
                  </View>
                ) : (
                  <Text />
                )}
                <View style={styles.submitButtonWrapper}>
                  <Button
                    common
                    action="submit"
                    style={styles.submitButton}
                    onPress={this.handleFormSubmit.bind(this)}
                    disabled={!this.state.email || !!this.state.error}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </Button>
                </View>
                {this.props.notification === "Email sent" && (
                  <Text style={styles.successMessage}>
                    Check your inbox. We must have send you email.
                  </Text>
                )}
              </Form>
            </BackgroundImage>
          </Content>
          {this.props.loading && <Loading message="Sending email.." />}
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
  heading: {
    paddingTop: "15%",
    paddingLeft: 30,
    fontSize: 30,
    color: "#611265",
    fontFamily: "Righteous-Regular"
  },
  formLabel: {
    marginTop: 120,
    paddingLeft: 30,
    fontFamily: "PoiretOne-Regular",
    fontSize: 18,
    color: "#500655"
  },
  inputBox: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#fff"
  },
  submitButtonWrapper: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  submitButton: {
    borderRadius: 6
  },
  successMessage: {
    marginTop: 60,
    textAlign: "center",
    color: "#500655",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: "12.5%",
    paddingRight: "12.5%"
  }
};
const _Wrapped = connect(
  (state: State) => ({
    loading: state.getIn(["application", "isLoading"]),
    notification: state.getIn(["application", "notification"])
  }),
  actionCreators
)(ForgotPassword);

export default _Wrapped;
