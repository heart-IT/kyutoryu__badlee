/**
 * @chill- The mind chases after thousands of things, and we rarely take the time to come back to ourselves. When we have been lose in forgetfulness like that for a long time, we lose touch with ourselves, and we feel alienated from ourselves- Thich Nhat Hanh
 * 
 * @file- Welcome.js
 * @description- Welcoming User Screen
 * @author- heartIT pirates were here.
 */

"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { StyleProvider, Content, View, Text, Button } from "native-base";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import * as actionCreators from "../../badlee__redux/action_creators";
import AuthContainer from "../Authenticated/GoingMerry";

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

class Welcome extends Component {
  componentDidMount() {
    console.log(this.props.user);
  }
  onEnterBtnPress() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: AuthContainer
      });
    });
  }
  render() {
    const user = this.props.user;
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <BackgroundImage>
            <View style={styles.container}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../images/badlee__landscape.png")}
                  style={styles.badleeLogo}
                />
              </View>
              <View style={styles.userWrapper}>
                <Text style={styles.welcomeText}>Welcome {user.fname}!</Text>
                <View style={styles.userAvatar}>
                  {user.avatar && (
                    <Image
                      source={{ uri: user.avatar }}
                      style={{ width: 120, height: 120, borderRadius: 60 }}
                    />
                  )}
                  {!user.avatar && (
                    <Icon name="userPlaceholder" width="120" height="120" />
                  )}
                </View>
                <Text style={styles.verificationText}>
                  Please verify your account to enjoy an unmatched experience of
                  socialising with satisfying your commodity needs.
                </Text>
                <Text style={styles.verificationText2}>
                  We've mailed you the verification link to your registered
                  e-mail id {user.email}
                </Text>
                <Button
                  style={styles.enterButton}
                  onPress={this.onEnterBtnPress.bind(this)}
                >
                  <Text style={styles.enterBtnText}>Enter badlee</Text>
                </Button>
              </View>
              <View style={styles.footer}>
                <Text style={{ textAlign: "center" }}>
                  <Text style={styles.footerText}>
                    Note: we recommend you to read these{" "}
                  </Text>
                  <Text style={{ ...styles.footerText, ...styles.footerLink }}>
                    tips
                  </Text>
                  <Text style={styles.footerText}>
                    {" "}
                    for better and safer transaction.
                  </Text>
                </Text>
              </View>
            </View>
          </BackgroundImage>
        </Content>
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
    display: "flex",
    alignItems: "center"
  },
  logoWrapper: {
    marginTop: 45
  },
  badleeLogo: {
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 6,
    resizeMode: "contain"
  },
  userWrapper: {
    marginTop: 30,
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 24,
    color: "#9331ac"
  },
  userAvatar: {
    marginTop: 15,
    marginBottom: 15
  },
  verificationText: {
    paddingLeft: "9%",
    paddingRight: "9%",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    color: "#616161"
  },
  verificationText2: {
    paddingLeft: "12%",
    paddingRight: "12%",
    textAlign: "center",
    marginTop: 12,
    fontSize: 15,
    lineHeight: 21,
    color: "#616161"
  },
  enterButton: {
    marginTop: 18,
    marginLeft: "auto",
    marginRight: "auto"
  },
  footer: {
    marginLeft: "12%",
    marginRight: "12%",
    borderTopWidth: 1,
    borderColor: "#9331ac",
    paddingBottom: 6,
    paddingTop: 3
  },
  footerText: {
    fontSize: 12,
    color: "#616161"
  },
  footerLink: {
    color: "#9331ac"
  }
};

const _Wrapped = connect(
  state => ({
    user: state.getIn(["user", "information"])
  }),
  actionCreators
)(Welcome);

export default _Wrapped;
