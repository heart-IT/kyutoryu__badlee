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
      password: null
    };
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
              <Form
                style={{ paddingRight: "27%", paddingTop: 45, paddingLeft: 15 }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 24
                  }}
                >
                  <Item
                    style={{
                      flex: 1,
                      marginLeft: 6,
                      marginRight: 6,
                      height: 42
                    }}
                  >
                    <Input
                      placeholder="First Name"
                      fontSize="15px"
                      placeholderStyle={{ fontSize: 12, textColor: "#fff" }}
                      placeholderTextColor="#fff"
                      color="#fff"
                      value={this.state.firstName}
                    />
                  </Item>
                  <Item
                    style={{
                      flex: 1,
                      marginLeft: 6,
                      marginRight: 6,
                      height: 42
                    }}
                  >
                    <Input
                      placeholder="Last Name"
                      placeholderTextColor="#fff"
                      value={this.state.lastName}
                    />
                  </Item>
                </View>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Your unique name on badlee"
                    placeholderTextColor="#fff"
                    value={this.state.uniqueName}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Your email address"
                    placeholderTextColor="#fff"
                    value={this.state.email}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Create a password"
                    placeholderTextColor="#fff"
                    value={this.state.password}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Re-enter password"
                    placeholderTextColor="#fff"
                  />
                </Item>
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
)(Register);

export default _Wrapped;
