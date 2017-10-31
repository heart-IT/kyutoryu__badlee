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

"use strict";

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
import Notification from "./notification";

class GoingMerry extends Component {
  constructor(props) {
    super(props);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.state = {
      activeTabIndex: 0,
      notificationLength: props.notificationsOrder.size,
      isNotificationActive: false
    };
  }
  componentDidMount() {
    let props = this.props;
    props.checkForNotification();
    setInterval(function() {
      props.checkForNotification();
    }, 10000);
  }
  componentWillReceiveProps(nextProps) {
    let newNotificationLength = nextProps.notificationsOrder.size;
    if (newNotificationLength - this.state.notificationLength > 0) {
      this.setState({
        isNotificationActive: true,
        notificationLength: newNotificationLength
      });
    }
  }
  onChangeTab(i, ref) {
    if (i.i === 1) {
      this.setState({ activeTabIndex: i.i, isNotificationActive: false });
    } else {
      this.setState({ activeTabIndex: i.i });
    }
  }
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
              onChangeTab={this.onChangeTab}
              tabBarUnderlineStyle={{ opacity: 0 }}
            >
              <Tab heading={<TabHeading>{returnIcon("home", 0)}</TabHeading>}>
                <Home />
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    {this.state.isNotificationActive &&
                      this.state.activeTabIndex === 1 && (
                        <Icon
                          name="notificationSelect"
                          width="22"
                          height="22"
                          fill="#A071A3"
                          stroke="#A071A3"
                          strokeWidth="2.852"
                        />
                      )}
                    {this.state.isNotificationActive &&
                      this.state.activeTabIndex !== 1 && (
                        <Icon
                          name="notificationSelect"
                          width="22"
                          height="22"
                          fill="#A071A3"
                          stroke="#A071A3"
                          strokeWidth="2.852"
                        />
                      )}
                    {!this.state.isNotificationActive &&
                      returnIcon("notifications", 1)}
                  </TabHeading>
                }
              >
                <Notification />
              </Tab>
              <Tab heading={<TabHeading>{returnIcon("user", 2)}</TabHeading>}>
                <User isMyProfile={true} />
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
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    notificationsOrder: state.getIn(["notifications", "order"])
  }),
  actionCreators
)(GoingMerry);

export default _Wrapped;
