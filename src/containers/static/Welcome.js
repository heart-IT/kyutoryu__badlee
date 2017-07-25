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
import Swiper from "react-native-swiper";

class BackgroundImage extends Component {
  render() {
    return (
      <Image
        source={require("../../images/welcome__bg.png")}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </Image>
    );
  }
}

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
        <BackgroundImage>
          <View style={styles.container}>
            <Swiper showsButtons={true}>
              <View
                style={{ paddingLeft: 40, paddingRight: 40, marginTop: 150 }}
              >
                <Image
                  source={require("../../images/badlee.png")}
                  style={{
                    width: 120,
                    height: 120,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 30
                  }}
                />
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  An exclusive social network for your commodity needs.
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  See what you have, see what they got.
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  It's your personal bank of things, where Borrowing and Lending
                  of commodities are done.
                </Text>
              </View>
              <View
                style={{ paddingLeft: 40, paddingRight: 40, marginTop: 150 }}
              >
                <Image
                  source={require("../../images/exchange.svg")}
                  style={{
                    width: 120,
                    height: 120,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 30
                  }}
                />
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  Post under this badge anything that you're willing to lend to
                  anyone in your community.
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  You can also borrow anything posted by another user under this
                  badge.
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  The true essence of Badlee, it is
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
            </Swiper>
          </View>
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
