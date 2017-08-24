/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * @description- This file is the Register Page
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Right,
  Text,
  Content,
  Form,
  View,
  Item,
  Button,
  Input
} from "native-base";

import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import Register2 from "./Register2";
import type { State } from "../../types";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Register page 2 BG.png");
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      uniqueName: null,
      email: null,
      password: null,

      passwordMatch: false
    };
  }

  onPasswordEnter(text) {
    this.setState({ password: text });
    if (text !== this.state.rePassword) {
      this.setState({ passwordMatch: false });
    } else {
      this.setState({ passwordMatch: true });
    }
  }
  onPasswordReenter(text) {
    this.setState({ rePassword: text });
    if (text !== this.state.password) {
      this.setState({ passwordMatch: false });
    } else {
      this.setState({ passwordMatch: true });
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
                      style={{ fontSize: 15 }}
                      placeholder="First Name"
                      placeholderTextColor="#fff"
                      onChangeText={firstName => this.setState({ firstName })}
                    />
                  </Item>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15 }}
                      placeholder="Last Name"
                      placeholderTextColor="#fff"
                      onChangeText={lastName => this.setState({ lastName })}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15 }}
                      placeholder="Your unique name on badlee"
                      placeholderTextColor="#fff"
                      onChangeText={uniqueName => this.setState({ uniqueName })}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15 }}
                      placeholder="Your email address"
                      placeholderTextColor="#fff"
                      onChangeText={email => this.setState({ email })}
                      keyboardType={"email-address"}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15 }}
                      placeholder="Create a password"
                      placeholderTextColor="#fff"
                      secureTextEntry={true}
                      onChangeText={this.onPasswordEnter.bind(this)}
                    />
                  </Item>
                </View>
                <View style={styles.inputRow}>
                  <Item style={styles.inputBox}>
                    <Input
                      style={{ fontSize: 15 }}
                      placeholder="Re-enter password"
                      placeholderTextColor="#fff"
                      secureTextEntry={true}
                      error={this.state.passwordMatch ? true : false}
                      onChangeText={this.onPasswordReenter.bind(this)}
                    />
                  </Item>
                </View>
              </Form>
              <Button
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  borderRadius: 9
                }}
                onPress={this.goToPageTwo.bind(this)}
              >
                <Text>Next</Text>
              </Button>
            </BackgroundImage>
          </Content>
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
  formLeftSpace: { paddingRight: "27%", paddingTop: 45, paddingLeft: 15 },
  inputRow: { display: "flex", flexDirection: "row", marginBottom: 24 },
  inputBox: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: "#fff",
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
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Register);

export default _Wrapped;
