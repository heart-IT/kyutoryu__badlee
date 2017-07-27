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
            <Swiper
              loop={false}
              showsButtons={false}
              dot={
                <View
                  style={{
                    backgroundColor: "#a763a7",
                    width: 5,
                    height: 5,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: "#93298f",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                  }}
                />
              }
            >
              <View style={styles.view}>
                <Text style={[styles.head, styles.badleeColor]}>Badlee?</Text>
                <Image
                  source={require("../../images/badlee.png")}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.content}>
                    An exclusive social network for your commodity needs.
                  </Text>
                  <Text style={styles.content}>
                    See what you have, see what they got.
                  </Text>
                  <Text style={styles.content}>
                    It's your personal bank of things, where Borrowing and
                    Lending of commodities are done.
                  </Text>
                </View>
              </View>
              <View style={styles.view}>
                <Text style={[styles.head, styles.lendBorrowColor]}>
                  lend and borrow
                </Text>
                <Image
                  source={require("../../images/exchange.png")}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.content}>
                    Post under this badge anything that you're willing to lend
                    to anyone in your community.
                  </Text>
                  <Text style={styles.content}>
                    You can also borrow anything posted by another user under
                    this badge.
                  </Text>
                  <Text style={styles.content}>
                    The true essence of Badlee, it is
                  </Text>
                </View>
              </View>
              <View style={styles.view}>
                <Text style={[styles.head, styles.showoffColor]}>show off</Text>
                <Image
                  source={require("../../images/show off 2.png")}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.content}>
                    Got something 'premium'? Here's Badlee giving you an
                    exclusive platform to show your premium possession off.
                  </Text>
                  <Text style={styles.content}>
                    Got Something? Brag about it!
                  </Text>
                </View>
              </View>
              <View style={styles.view}>
                <Text style={[styles.head, styles.shoutColor]}>shout</Text>
                <Image
                  source={require("../../images/shout badge.png")}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.content}>
                    What if you don't get something you are looking for in the
                    feeds on your homescreen?
                  </Text>
                  <Text style={styles.content}>
                    Yes! You can post your demands under this badge, so that
                    someone who sees your post.
                  </Text>
                  <Button
                    common
                    block
                    style={{ marginTop: 30, backgroundColor: "#611265" }}
                    onPress={this.handleLogin.bind(this)}
                  >
                    <Text style={{ color: "#FFF" }}>Enter badlee App</Text>
                  </Button>
                </View>
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
    justifyContent: "center"
  },
  view: {
    paddingLeft: 42,
    paddingRight: 42,
    marginTop: 60
  },
  head: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 30,
    fontFamily: "Righteous-Regular"
  },
  image: {
    width: 135,
    height: 135,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30
  },
  content: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "PoiretOne-Regular",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 9
  },
  badleeColor: {
    color: "#611265"
  },
  lendBorrowColor: {
    color: "#94c655"
  },
  showoffColor: {
    color: "#f3e309"
  },
  shoutColor: {
    color: "#428ee2"
  }
};

const _Wrapped = connect(
  state => ({ loading: state.get("loading") }),
  actionCreators
)(Welcome);

export default _Wrapped;
