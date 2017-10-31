/**
 * @name- notification.js
 * 
 * @chill- Where there is patience and humility there is neither anger nor worry. -Francis of Assisi
 * 
 * 
 * @description- Shows User Notification
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleProvider, Text, Content } from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";
import User from "./user";
import SingleBadlee from "./singleBadlee";
import NotificationComponent from "../../components/notification_comp";
class Notification extends Component {
  constructor(props) {
    super(props);
    let data = props.notificationByID.toJS();
    let order = props.order.toJS();
    let notificationData = order.map(notificationID => data[notificationID]);
    this.state = {
      notificationData: notificationData
    };
    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.notificationPressed = this.notificationPressed.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let data = nextProps.notificationByID.toJS();
    let order = nextProps.order.toJS();
    let notificationData = order.map(notificationID => data[notificationID]);
    this.setState({ notificationData: notificationData });
  }
  onFlatListRefresh() {
    this.props.checkForNotification();
  }
  notificationPressed(badleeID) {
    requestAnimationFrame(() => {
      this.props.showBadleePage(badleeID, {
        navigator: this.props.navigator,
        component: SingleBadlee
      });
    });
  }
  onPressUser(userID) {
    requestAnimationFrame(() => {
      this.props.showUserPage(userID, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
          {this.state.notificationData.length === 0 && (
            <View style={{ alignItems: "center" }}>
              <Text>No notification</Text>
            </View>
          )}
          <NotificationComponent
            data={this.state.notificationData}
            onFlatListRefresh={this.onFlatListRefresh}
            notificationPressed={this.notificationPressed}
            onPressUser={this.onPressUser}
          />
        </View>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    notificationByID: state.getIn(["notifications", "data"]),
    order: state.getIn(["notifications", "order"])
  }),
  actionCreators
)(Notification);

export default _Wrapped;
