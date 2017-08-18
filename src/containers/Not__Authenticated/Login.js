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
// import Main from "../Authenticated/Main";
import Welcome from "./Welcome";
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

  formSubmit() {
    // requestAnimationFrame(() => {
    //   this.props.login(this.state.username, this.state.password, {
    //     navigator: this.props.navigator,
    //     component: Main,
    //     reset: true
    //   });
    // });
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <BackgroundImage>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../../images/badlee__landscape.png")}
                style={styles.badleeLogo}
              />
            </View>

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
                  <Text style={styles.submitButtonText}>Login</Text>
                </Button>
              </View>
            </Form>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            <View style={styles.pageSwitcher}>
              <Text style={styles.switcherText}>New to the community?</Text>
              <Text style={styles.switcherTextLink}>Sign Up</Text>
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