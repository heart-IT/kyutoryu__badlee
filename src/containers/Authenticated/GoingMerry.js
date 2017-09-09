/**
 * @name- GoingMerry.js
 * 
 * @chill -There is no shelter from aging and death. Knowing this inevitability, Seek joy instead in the goodness of your actions - Buddha
 * 
 * 
 * @description- This file is the parent container of Badlee App after logging in. Everything is loaded inside
 * 
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Container,
  Content,
  TabHeading,
  Tabs,
  Tab,
  Text
} from "native-base";

import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import Loading from "../../components/LoadingView";

import Badlee from "./Badlee";
import Chat from "./Chat";
import UserProfile from "./User";

class AuthContainer extends Component {
  constructor() {
    super();
    this.state = {
      current__tab: 0
    };
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Tabs
              initialPage={this.state.current__tab}
              locked={true}
              tabBarUnderlineStyle={{ borderBottomWidth: 0 }}
              onChangeTab={(i, ref) => this.setState({ current__tab: i.i })}
            >
              <Tab
                heading={
                  <TabHeading>
                    <Icon
                      name="home"
                      fill={this.state.current__tab === 0 ? "#fff" : "#A071A3"}
                      width="22"
                      height="22"
                    />
                  </TabHeading>
                }
              >
                <Badlee />
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Icon
                      name="messages"
                      width="22"
                      height="22"
                      fill={this.state.current__tab === 1 ? "#fff" : "#A071A3"}
                    />
                  </TabHeading>
                }
              >
                <Chat />
              </Tab>

              <Tab
                heading={
                  <TabHeading>
                    <Icon
                      name="notifications"
                      width="22"
                      height="22"
                      fill={this.state.current__tab === 2 ? "#fff" : "#A071A3"}
                      stroke={
                        this.state.current__tab === 2 ? "#fff" : "#A071A3"
                      }
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
                      width="22"
                      height="22"
                      fill={this.state.current__tab === 3 ? "#fff" : "#A071A3"}
                    />
                  </TabHeading>
                }
              >
                <UserProfile />
              </Tab>
            </Tabs>
          </Content>
          {this.props.loading && <Loading message="Loading badlee.." />}
        </Container>
      </StyleProvider>
    );
  }
}

var styles = {};

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(AuthContainer);

export default _Wrapped;
