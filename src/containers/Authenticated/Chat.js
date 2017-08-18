// @flow
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleProvider, Content, Text } from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";

import getTheme from "../../theme/components";
import { GiftedChat } from "react-native-gifted-chat";

class MessageThread extends Component {
  state = {
    messages: []
  };
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://facebook.github.io/react/img/logo_og.png"
          }
        }
      ]
    });
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.get("loading")
  }),
  actionCreators
)(MessageThread);

export default _Wrapped;
