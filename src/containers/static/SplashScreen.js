/**
 * To live is so startling it leaves little time to anything else - Emily Dickinson
 * 
 * @author - heartit pirates 
 */

/**
  * To do :-
  1. Add screen
  a. take from rohan
  b. make a splash screen with next button
  c. 
  */

"use strict";

import React, { Component } from "react";
import { Text, Image, View } from "react-native";
import { connect } from "react-redux";
import { StyleProvider, Content, Container, Spinner } from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import Welcome from "./Welcome";
import Main from "./../Main";
import { dummySplashScreenTimeout } from "../../fixtures";

class SplashScreen extends Component {
  componentDidMount() {
    let route = {
      navigator: this.props.navigator,
      component: {
        authanticated: {
          component: Main
        },
        anonymous: {
          component: Welcome
        }
      }
    };

    const navigator = this.props.navigator;
    this.props.setNavigator(navigator);

    setTimeout(
      function() {
        this.props.restoreAuth(route);
      }.bind(this),
      dummySplashScreenTimeout
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: "#fff", alignItems: "center" }}>
          <Content style={{ marginTop: 100 }}>
            <Image
              source={require("../../images/badlee.png")}
              style={{
                width: 40,
                height: 40,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 8
              }}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#611265",
                fontWeight: "bold"
              }}
            >
              Loading Badlee
            </Text>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(state => ({}), actionCreators)(SplashScreen);
export default _Wrapped;
