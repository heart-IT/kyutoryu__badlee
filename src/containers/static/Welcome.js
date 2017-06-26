/**
 * All is silent, lucid, and self-illumination: There is no exertion, no waste of energy- This is where thinking never attains.
 * This is where the imagination fails to measure. - Seng-t'san
 * 
 * 
 * This file is the Welcome page. This is what shown to user first time.
 * @fileName Welcome.js
 * @author heartIT pirates were here
 */

"use strict";

import React, { Component } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { StyleProvider, Button } from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../action_creators";
import Login from "../account/Login";

class Welcome extends Component {
  handleLogin() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Login
      });
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: 18,
              marginBottom: 24
            }}
          >
            Welcome to <Text style={{ color: "#6f156d" }}> badlee </Text>
            Application
          </Text>
          <Text style={{ textAlign: "center" }}>
            We are still in a very priminilary stage of App, so handle with care
          </Text>
          <Button
            violet
            common
            block
            style={{ marginTop: 30 }}
            onPress={this.handleLogin.bind(this)}
          >
            <Text style={{ color: "#FFF" }}>Enter to see badlee App</Text>
          </Button>
        </View>
      </StyleProvider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 100,
    marginLeft: 50,
    marginRight: 50
  }
};

const _Wrapped = connect(
  state => ({ loading: state.get("loading") }),
  actionCreators
)(Welcome);

export default _Wrapped;
