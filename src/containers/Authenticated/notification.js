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
import { View, StyleProvider, Text } from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";
import NotificationComponent from "../../components/notification_comp";
class Notification extends Component {
  state = {
    notificationData: []
  };
  componentWillReceiveProps(nextProps) {
    let data = nextProps.notificationByID.toJS();
    let order = nextProps.order.toJS();
    let notificationData = order.map(notificationID => data[notificationID]);
    this.setState({ notificationData: notificationData });
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
          <NotificationComponent data={this.state.notificationData} />
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
