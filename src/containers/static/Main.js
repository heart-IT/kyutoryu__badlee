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
import * as actionCreators from "../../action_creators";
import type { State } from "../../types";

import User from "../account/User";

class Main extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Tabs initialPage={0}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-home" />
                </TabHeading>
              }
            >
              <Tabs hello style={{ backgroundColor: "#fff" }}>
                <Tab
                  heading={
                    <TabHeading>
                      <Icon name="ios-people" />
                    </TabHeading>
                  }
                  tabStyle={{ backgroundColor: "red" }}
                  textStyle={{ color: "#fff" }}
                  activeTabStyle={{ backgroundColor: "red" }}
                  activeTextStyle={{ color: "#fff", fontWeight: "normal" }}
                >
                  <Text>Hello world</Text>
                </Tab>
                <Tab
                  heading={
                    <TabHeading>
                      <Icon name="ios-locate-outline" />
                    </TabHeading>
                  }
                  tabStyle={{ backgroundColor: "red" }}
                  textStyle={{ color: "#fff" }}
                  activeTabStyle={{ backgroundColor: "red" }}
                  activeTextStyle={{ color: "#fff", fontWeight: "normal" }}
                />
                <Tab
                  heading={
                    <TabHeading>
                      <Icon name="ios-globe-outline" />
                    </TabHeading>
                  }
                  tabStyle={{ backgroundColor: "red" }}
                  textStyle={{ color: "#fff" }}
                  activeTabStyle={{ backgroundColor: "red" }}
                  activeTextStyle={{ color: "#fff", fontWeight: "normal" }}
                />
              </Tabs>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-paper-plane" />
                </TabHeading>
              }
            >
              <Text>Wrold</Text>
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
