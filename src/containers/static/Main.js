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

import Store from "../badlee/store";
import User from "../account/User";

class Main extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Tabs initialPage={0} locked="true">
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
              <Text>Wingardium Levoisa</Text>
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
