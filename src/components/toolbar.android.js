"use strict";

import React, { Component, PropTypes } from "react";
import { View, Text, InteractionManager } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Body,
  Icon
} from "native-base";
import LoadingView from "./LoadingView";

class Toolbar extends Component {
  static propTypes = {};

  static defaultProps = {
    renderFooter: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = { renderPlaceholderOnly: true };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  _renderPlaceholderView() {
    return <LoadingView />;
  }

  _renderContent() {
    return this.props.children;
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#de0000" }}>
          <Body>
            <Title style={{ color: "#FFF" }}>
              {this.props.title}
            </Title>
          </Body>
        </Header>

        {this.state.renderPlaceholderOnly && this._renderPlaceholderView()}
        {!this.state.renderPlaceholderOnly && this._renderContent()}
        {!this.state.renderPlaceholderOnly && this.props.renderFooter()}
      </Container>
    );
  }
}

module.exports = Toolbar;
