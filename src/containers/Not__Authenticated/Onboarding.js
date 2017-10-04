/**
 * @chill- All is silent, lucid, and self-illumination: There is no exertion, no waste of energy- This is where thinking never attains.
 * This is where the imagination fails to measure. - Seng-t'san
 * 
 * @file- Onboarding.js
 * @description- This file is the Onboarding page. This is what shown to user first time.
 * @author- heartIT pirates were here
 */
import { Button, Container, Content, StyleProvider, Text, View } from 'native-base';
import { Component } from 'react';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';
import Login from './login';


"use strict";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/welcome__bg.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        {this.props.children}
      </Image>
    );
  }
}

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
        <Container>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <View style={styles.container}>
                <Swiper
                  loop={false}
                  showsButtons={false}
                  dot={
                    <View
                      style={{ ...styles.swiperDots, ...styles.inactiveDot }}
                    />
                  }
                  activeDot={
                    <View
                      style={{ ...styles.swiperDots, ...styles.activeDot }}
                    />
                  }
                >
                  <View style={styles.view}>
                    <Text style={{ ...styles.head, ...styles.badleeColor }}>
                      badlee?
                    </Text>
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
                    <Text style={{ ...styles.head, ...styles.lendBorrowColor }}>
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
                        Post under this badge anything that you're willing to
                        lend to anyone in your community.
                      </Text>
                      <Text style={styles.content}>
                        You can also borrow anything posted by another user
                        under this badge.
                      </Text>
                      <Text style={styles.content}>
                        The true essence of badlee, it is
                      </Text>
                    </View>
                  </View>
                  <View style={styles.view}>
                    <Text style={{ ...styles.head, ...styles.showoffColor }}>
                      show off
                    </Text>
                    <Icon
                      name="showoff"
                      style={styles.image}
                      width="150"
                      height="150"
                    />
                    <View>
                      <Text style={styles.content}>
                        Got something 'premium'? Here's badlee giving you an
                        exclusive platform to show your premium possessions off.
                      </Text>
                      <Text style={styles.content}>
                        Got Something? Brag about it!
                      </Text>
                    </View>
                  </View>
                  <View style={styles.view}>
                    <Text style={{ ...styles.head, ...styles.shoutColor }}>
                      shout
                    </Text>
                    <Icon
                      name="shoutout"
                      viewBox="0 0 60 60"
                      width="135"
                      height="135"
                      style={styles.image}
                    />
                    <View>
                      <Text style={styles.content}>
                        What if you don't get something you are looking for in
                        the feeds on your homescreen?
                      </Text>
                      <Text style={styles.content}>
                        Yes! You can post your demands under this badge, so that
                        someone who sees your post can offer you what you want.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.view}>
                    <Text style={{ ...styles.head, ...styles.expressionColor }}>
                      expressions
                    </Text>
                    <View>
                      <Text style={{ ...styles.semihead, ...styles.likeColor }}>
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
                        style={{
                          ...styles.semihead,
                          ...styles.wishColor,
                          ...styles.likeBorder
                        }}
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
                          bottom: -30,
                          right: -24,
                          backgroundColor: "#611265",
                          borderRadius: 12
                        }}
                        onPress={this.handleLogin.bind(this)}
                      >
                        <Text style={{ color: "#FFF" }}>Proceed</Text>
                      </Button>
                    </View>
                  </View>
                </Swiper>
              </View>
            </BackgroundImage>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  backgroundImage: {
    display: "flex",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    display: "flex"
  },
  swiperDots: {
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 12
  },
  inactiveDot: {
    backgroundColor: "#a763a7"
  },
  activeDot: {
    backgroundColor: "#93298f",
    width: 8,
    height: 8
  },
  view: {
    flex: 1,
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
    marginBottom: 24
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
    color: "#94c655"
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
  state => ({ loading: state.getIn(["application", "isLoading"]) }),
  actionCreators
)(Onboarding);

export default _Wrapped;
