/**
 * Chill of the day -
 * There is no shelter from aging and death. Knowing this inevitability, Seek joy instead in the goodness of your actions - Buddha
 * 
 * @author - heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../badlee__redux/action_creators";

import {
  StyleProvider,
  Content,
  TabHeading,
  Tabs,
  Tab,
  Text
} from "native-base";
import getTheme from "../theme/components";

import Icon from "../components/Icon";

import Badlees from "./main/Badlees";
import UserProfile from "./account/User";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      initial_tab: 0
    };
  }
  componentDidMount() {}
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Tabs
            initialPage={this.state.initial_tab}
            tabBarUnderlineStyle={{ borderBottomWidth: 0 }}
          >
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
              <Badlees />
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
              <Text>Wingardium Leviousa</Text>
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
              <Text>One Piece is hidden somewhere in the app</Text>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon
                    name="user"
                    viewBox="0 0 60 60"
                    width="22"
                    height="22"
                  />
                </TabHeading>
              }
            >
              <UserProfile />
            </Tab>
          </Tabs>
        </Content>
      </StyleProvider>
    );
  }
}

var styles = {};

const _Wrapped = connect(
  state => ({ user: state.get("user") }),
  actionCreators
)(Main);

export default _Wrapped;
