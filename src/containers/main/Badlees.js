/**
 * Chill of the day -
 * There can be no comparison: nothing exists that is able to reverse itself as quickly as the mind.
 * - Buddha
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../badlee__redux/action_creators";

import {
  StyleProvider,
  Content,
  Tabs,
  Tab,
  TabHeading,
  Text
} from "native-base";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";

class Badless extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 0 }}>
            <Tab
              heading={
                <TabHeading>
                  <Icon
                    name="home"
                    viewBox="0 0 60 60"
                    width="22"
                    height="22"
                  />
                </TabHeading>
              }
            >
              <Text>hello</Text>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon
                    name="messages"
                    viewBox="0 0 60 60"
                    width="22"
                    height="22"
                  />
                </TabHeading>
              }
            >
              <Text>Tab 2</Text>
            </Tab>

            <Tab
              heading={
                <TabHeading>
                  <Icon
                    name="notifications"
                    viewBox="0 0 60 60"
                    width="22"
                    height="22"
                  />
                </TabHeading>
              }
            >
              <Text>Tab 3</Text>
            </Tab>
          </Tabs>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ user: state.get("user") }),
  actionCreators
)(Badless);

export default _Wrapped;
