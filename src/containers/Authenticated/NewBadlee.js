/**
 * @name- NewBadlee
 */

"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Container,
  Content,
  View,
  Header,
  Left,
  Right,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Input
} from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";

class NewBadlee extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Text>POST</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Form>
              <Item>
                <Input placeholder="name" />
              </Item>
              <Item>
                <Input placeholder="location" />
              </Item>
            </Form>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
