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
import { Image, Text } from "react-native";
import { StyleProvider, Content, View } from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Welcome page 1 BG.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        {this.props.children}
      </Image>
    );
  }
}

class Welcome extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <BackgroundImage>
            <View style={styles.container}>
              <Text>Welcome</Text>
            </View>
          </BackgroundImage>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.get("isLoading"),
    user: state.get("user")
  }),
  actionCreators
)(Welcome);

export default _Wrapped;
