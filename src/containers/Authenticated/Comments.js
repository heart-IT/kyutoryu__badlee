/**
 * @name- Comment.js
 * 
 * @chill- Peace is always beautiful- Walt Whitman
 * 
 * 
 * @description- Comment screen of badlee
 * 
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleProvider, Container, Content, Text } from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";

import getTheme from "../../theme/components";

class Comment extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Text>hello</Text>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(Comment);

export default _Wrapped;
