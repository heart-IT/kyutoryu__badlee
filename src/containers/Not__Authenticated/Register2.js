/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * @description- This file is the Register Page
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Right,
  Text,
  Content,
  Form,
  View,
  Item,
  Button,
  Input
} from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import Main from "../Authenticated/Container";
import type { State } from "../../types";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Register page 1 BG.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>
          {this.props.src}
        </Text>
        {this.props.children}
      </Image>
    );
  }
}

class Register2 extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.userInfo);
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left>
              <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </Left>
            <Right>
              <Text style={{ color: "#fff", fontSize: 15 }}>2 of 2</Text>
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <Form
                style={{ paddingLeft: "27%", paddingTop: 45, paddingRight: 15 }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 24
                  }}
                >
                  <Item
                    style={{
                      flex: 1,
                      marginLeft: 6,
                      marginRight: 6,
                      height: 42
                    }}
                  >
                    <Input
                      placeholder="First Name"
                      fontSize="15px"
                      placeholderStyle={{ fontSize: 12, textColor: "#fff" }}
                      placeholderTextColor="#fff"
                      color="#fff"
                      value={this.state.firstName}
                    />
                  </Item>
                  <Item
                    style={{
                      flex: 1,
                      marginLeft: 6,
                      marginRight: 6,
                      height: 42
                    }}
                  >
                    <Input
                      placeholder="Last Name"
                      placeholderTextColor="#fff"
                      value={this.state.lastName}
                    />
                  </Item>
                </View>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Your unique name on badlee"
                    placeholderTextColor="#fff"
                    value={this.state.uniqueName}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Your email address"
                    placeholderTextColor="#fff"
                    value={this.state.email}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Create a password"
                    placeholderTextColor="#fff"
                    value={this.state.password}
                  />
                </Item>
                <Item
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                    height: 42,
                    marginBottom: 24
                  }}
                >
                  <Input
                    placeholder="Re-enter password"
                    placeholderTextColor="#fff"
                  />
                </Item>
              </Form>
              <Button
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  borderRadius: 9
                }}
                onPress={this.goToPageTwo.bind(this)}
              >
                <Text>Next</Text>
              </Button>
            </BackgroundImage>
          </Content>
        </Container>
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
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Register2);

export default _Wrapped;
