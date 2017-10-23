/**
 * @name- goingMerry.js
 * 
 * @chill -There is no shelter from aging and death. Knowing this inevitability, Seek joy instead in the goodness of your actions - Buddha
 * 
 * 
 * @description- This file is the parent component for the home page shown after logging in.
 * Child components are -> Home, Notifications and User
 * 
 * @author- heartit pirates were here
 */

import {
  Container,
  Content,
  StyleProvider,
  Tab,
  TabHeading,
  Tabs
} from "native-base";

import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import Loading from "../../components/LoadingView";
import getTheme from "../../theme/components";
import Home from "./home";
import User from "./user";

("use strict");

class GoingMerry extends Component {
  state = {
    activeTabIndex: 0
  };
  render() {
    let _this = this;
    function returnIcon(name, position, width = 22, height = 22) {
      return (
        <Icon
          name={name}
          width={width}
          height={height}
          fill={_this.state.activeTabIndex === position ? "#FFF" : "#A071A3"}
          stroke={_this.state.activeTabIndex === position ? "#FFF" : "#A071A3"}
        />
      );
    }
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Tabs
              locked={true}
              onChangeTab={(i, ref) => this.setState({ activeTabIndex: i.i })}
              tabBarUnderlineStyle={{ opacity: 0 }}
            >
              <Tab heading={<TabHeading>{returnIcon("home", 0)}</TabHeading>}>
                <Home />
              </Tab>
              <Tab
                heading={
                  <TabHeading>{returnIcon("notifications", 1)}</TabHeading>
                }
              />
              <Tab heading={<TabHeading>{returnIcon("user", 2)}</TabHeading>}>
                <User profile={this.props.user} />
              </Tab>
            </Tabs>
          </Content>
          {this.props.loading && <Loading />}
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    user: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "loggedUserID"])
    ])
  }),
  actionCreators
)(GoingMerry);

export default _Wrapped;
