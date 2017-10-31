/**
 * @name- notification_comp.js
 * 
 * @chill- We know so little about so much. -Christopher Organ
 * 
 * 
 * @description- Component for showing Notifications
 * 
 * @author- heartit pirates were here
 */

"use strict";
import moment from "moment";
import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Card, CardItem, Body, Text, Thumbnail, View, Left } from "native-base";
import Icon from "./Icon";
class NotificationItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.notificationPressed = this.notificationPressed.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }
  onFlatListRefresh() {
    this.props.onFlatListRefresh();
  }
  notificationPressed() {
    this.props.notificationPressed(this.props.typeID);
  }
  onPressUser() {
    this.props.onPressUser(this.props.userID);
  }
  render() {
    return (
      <Card>
        <CardItem>
          <Body
            style={{
              paddingTop: 12,
              paddingBottom: 16,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={this.onPressUser}>
              <Thumbnail source={{ uri: this.props.userAvatar }} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingLeft: 6 }}>
              {this.props.type === "like" && (
                <View style={styles.notificationRow}>
                  <TouchableOpacity
                    onPress={this.onPressUser}
                    style={styles.notificationOpacity}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      {this.props.name}
                    </Text>
                  </TouchableOpacity>
                  <Text> likes your badlee</Text>
                </View>
              )}
              {this.props.type === "wish" && (
                <View style={styles.notificationRow}>
                  <TouchableOpacity style={styles.notificationOpacity}>
                    <Text style={{ fontWeight: "bold" }}>
                      {this.props.name}{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text>wish for your badlee</Text>
                </View>
              )}
              {this.props.type === "comment" && (
                <View style={styles.notificationRow}>
                  <Text>You received a comment from </Text>
                  <TouchableOpacity style={styles.notificationOpacity}>
                    <Text style={{ fontWeight: "bold" }}>
                      {this.props.name}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {this.props.type === "follow" && (
                <View style={styles.notificationRow}>
                  <TouchableOpacity style={styles.notificationOpacity}>
                    <Text style={{ fontWeight: "bold" }}>
                      {this.props.name}{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text>started following you</Text>
                </View>
              )}
              <Text style={{ fontSize: 14, color: "#bababa" }}>
                {moment(this.props.time)
                  .add({ hours: 5, minutes: 30 })
                  .fromNow()}
              </Text>
            </View>
            {this.props.type !== "follow" && (
              <TouchableOpacity
                onPress={this.notificationPressed}
                style={{ paddingLeft: 6, paddingRight: 3 }}
              >
                <Icon
                  name="menuForwardIcon"
                  width="18"
                  height="18"
                  fill="rgba(0, 0, 0, 0.7)"
                />
              </TouchableOpacity>
            )}
          </Body>
        </CardItem>
      </Card>
    );
  }
}

var styles = {
  notificationRow: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  notificationOpacity: {}
};

export default class NotificationList extends React.PureComponent {
  _keyExtractor = (item, index) => item.notification_id;
  constructor(props) {
    super(props);
    this.notificationPressed = this.notificationPressed.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }
  notificationPressed(badleeID) {
    this.props.notificationPressed(badleeID);
  }
  onPressUser(userID) {
    this.props.onPressUser(userID);
  }
  _renderItem = ({ item }) => (
    <NotificationItem
      id={item.notification_id}
      type={item.type}
      userAvatar={item.source_user_info.avatar}
      name={item.source_user_info.fname + " " + item.source_user_info.lname}
      userID={item.source_user_info.user_id}
      typeID={item.type_id}
      time={item.timestamp}
      status={item.status}
      notificationPressed={this.notificationPressed}
      onPressUser={this.onPressUser}
    />
  );
  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onRefresh={this.onFlatListRefresh}
        refreshing={false}
      />
    );
  }
}
