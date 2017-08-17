/**
 * @chill- All is silent, lucid, and self-illumination: There is no exertion, no waste of energy- This is where thinking never attains.
 * This is where the imagination fails to measure. - Seng-t'san
 * 
 * @file- Onboarding.js
 * @description- This file is the Onboarding page. This is what shown to user first time.
 * @author heartIT pirates were here
 */

"use strict";

import React, { Component } from "react";
import { Image, Text } from "react-native";
import { connect } from "react-redux";
import { StyleProvider, Content, View, Button } from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";

import Swiper from "react-native-swiper";

import Login from "./Login";
import Icon from "../../components/Icon";
import BackgroundImage from "../../components/BackgroundImage";

class Onboarding extends Component {
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
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
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
                      marginBottom: 12
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
                      marginBottom: 12
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
                  <Icon
                    name="exchange"
                    viewBox="0 0 60 60"
                    style={styles.image}
                    width="135"
                    height="135"
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
                  <Text style={[styles.head, styles.showoffColor]}>
                    show off
                  </Text>
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
                  <Icon
                    name="shoutout"
                    viewBox="0 0 60 60"
                    width="135"
                    height="135"
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
                  </View>
                </View>
                <View style={styles.view}>
                  <Text style={[styles.head, styles.expressionColor]}>
                    expressions
                  </Text>
                  <View>
                    <Text style={[styles.semihead, styles.likeColor]}>
                      like
                    </Text>
                    <Icon
                      name="like"
                      viewBox="0 0 800 800"
                      width="135"
                      height="135"
                      style={styles.image}
                    />
                    <Text
                      style={[
                        styles.semihead,
                        styles.wishColor,
                        styles.likeBorder
                      ]}
                    >
                      wish
                    </Text>
                    <Icon
                      name="wish"
                      viewBox="0 0 800 800"
                      width="135"
                      height="135"
                      fill="#EF5454"
                      style={styles.image}
                    />
                    <Button
                      style={{
                        position: "absolute",
                        bottom: -64,
                        right: -24,
                        backgroundColor: "#611265"
                      }}
                      onPress={this.handleLogin.bind(this)}
                    >
                      <Text style={{ color: "#FFF" }}>Enter</Text>
                    </Button>
                  </View>
                </View>
              </Swiper>
            </View>
          </BackgroundImage>
        </Content>
      </StyleProvider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  view: {
    paddingLeft: 42,
    paddingRight: 42,
    paddingTop: 60
  },
  head: {
    textAlign: "center",
    fontSize: 33,
    marginBottom: 30,
    marginTop: 6,
    fontFamily: "Righteous-Regular"
  },
  semihead: {
    textAlign: "center",
    fontSize: 27,
    marginBottom: 0,
    fontFamily: "Righteous-Regular"
  },
  image: {
    width: 135,
    height: 135,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 12
  },
  content: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.87)",
    textShadowColor: "rgba(0, 0, 0, 0.23)",
    textShadowOffset: { width: 1, height: 0 },
    fontFamily: "PoiretOne-Regular",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 9
  },
  badleeColor: {
    color: "#611265"
  },
  lendBorrowColor: {
    color: "#8CD790"
  },
  showoffColor: {
    color: "#f3e309"
  },
  shoutColor: {
    color: "#428ee2"
  },
  expressionColor: {
    color: "#6d156c"
  },
  likeColor: {
    color: "#c876e4"
  },
  wishColor: {
    color: "#ee5253"
  },
  likeBorder: {
    borderTopWidth: 2,
    borderColor: "#6d156c"
  }
};

const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(Onboarding);

export default _Wrapped;
