// @flow
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Content,
  Text,
  Tab,
  Tabs,
  TabHeading,
  Icon
} from "native-base";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import type { State } from "../../types";

import Store from "../badlee/store";
import MessageThread from "../MessageThread";
import User from "../account/User";

class Main extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Content>
          <Tabs initialPage={0}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-home" />
                </TabHeading>
              }
            >
              <Store />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-paper-plane" />
                </TabHeading>
              }
            >
              <MessageThread />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-megaphone" />
                </TabHeading>
              }
            >
              <Text>Boombastik</Text>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-person" />
                </TabHeading>
              }
            >
              <User />
            </Tab>
          </Tabs>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Main);

export default _Wrapped;

<Card
  style={{
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 6,
    marginTop: 3,
    borderRadius: 0,
    position: "relative"
  }}
  key={data["id"]}
>
  {data["purpose"] === "shoutOut" && (
    <Icon
      name="shoutout"
      viewBox="0 0 60 60"
      width="36"
      height="36"
      style={styles.badleePurposeIcon}
    />
  )}
  {data["purpose"] === "showOff" && (
    <Image
      source={require("../../images/show off 2.png")}
      style={styles.badleePurposeIcon}
    />
  )}
  {data["purpose"] === "exchange" && (
    <Icon
      name="exchange"
      viewBox="0 0 60 60"
      width="36"
      height="36"
      style={styles.badleePurposeIcon}
    />
  )}

  <CardItem header>
    <Left>
      <Thumbnail
        source={{
          uri: data["media"]
        }}
        style={{ height: 32, width: 32, marginLeft: 12 }}
      />
      <Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          {data["user"].substring(0, 12)}
        </Text>
        <Text style={{ fontSize: 12 }}>'s</Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}> Thingy</Text>
        <Text style={{ fontSize: 12, color: "#616161" }}>
          {" "}
          {moment(data["timestamp"]).fromNow()}
        </Text>
      </Text>
    </Left>
  </CardItem>

  <CardItem cardBody style={{ flexDirection: "column", marginTop: 2 }}>
    <Image
      source={{
        uri: data["media"]
      }}
      style={{ height: 200, width: "100%", flex: 1, zIndex: 1 }}
    />
    <Body>
      <Text
        style={{
          marginLeft: 12,
          marginTop: 2,
          fontWeight: "bold",
          fontSize: 12
        }}
      >
        {data["location"]}
      </Text>
      <Text
        style={{
          marginLeft: 12,
          marginTop: 12,
          marginBottom: 6,
          fontWeight: "bold",
          fontSize: 24,
          fontStyle: "italic"
        }}
      >
        {data["description"]}
      </Text>
    </Body>
  </CardItem>

  <CardItem footer>
    <Left style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="postLiked"
          width="30"
          height="30"
          style={{ marginRight: 3 }}
        />
        <Icon
          name="postWished"
          width="30"
          height="30"
          fill="#EF5454"
          style={{ marginRight: 3 }}
        />
        <Icon name="postComment" width="30" height="30" fill="#fff" />
      </View>
      <View>
        <Text style={{ fontSize: 12, marginLeft: 4 }}>
          View {Math.floor(Math.random() * 11)} comments{" "}
        </Text>
      </View>
    </Left>
    <Right>
      <Button transparent>
        <Icon name="postDelete" width="24" height="24" />
      </Button>
    </Right>
  </CardItem>
</Card>;

<Fab
  active={this.state.fabActive}
  direction="up"
  position="bottomRight"
  style={{ zIndex: 9999, backgroundColor: "none" }}
  onPress={() => this.setState({ fabActive: !this.state.fabActive })}
>
  <Image
    source={require("../../images/badlee.png")}
    style={{ width: 56, height: 56 }}
  />
  <Button
    style={{
      backgroundColor: "#94c655",
      width: 40,
      height: 40,
      zIndex: 9999
    }}
    onPress={this.letsExchange.bind(this)}
  >
    <Icon name="exchange" viewBox="0 0 60 60" width="25" height="25" />
  </Button>
  <Button
    style={{
      backgroundColor: "#3B5998",
      width: 40,
      height: 40,
      zIndex: 9999
    }}
    onPress={this.showOff.bind(this)}
  >
    <Image
      source={require("../../images/show off 2.png")}
      style={{ width: 40, height: 40 }}
    />
  </Button>
  <Button
    style={{
      backgroundColor: "#428ee2",
      width: 40,
      height: 40,
      zIndex: 9999
    }}
    onPress={this.shoutOut.bind(this)}
  >
    <Icon name="shoutout" viewBox="0 0 60 60" width="25" height="25" />
  </Button>
</Fab>;
