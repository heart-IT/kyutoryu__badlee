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

class NotificationItem extends React.PureComponent {
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
            <TouchableOpacity>
              <Thumbnail source={{ uri: this.props.userAvatar }} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingLeft: 6 }}>
              {this.props.type === "like" && (
                <Text style={{ lineHeight: 24 }}>
                  <Text>You received a like from </Text>
                  <Text style={{ fontWeight: "bold" }}>{this.props.name}</Text>
                </Text>
              )}
              {this.props.type === "wish" && (
                <Text style={{ lineHeight: 24 }}>
                  <Text style={{ fontWeight: "bold" }}>{this.props.name} </Text>
                  <Text>wished for your post </Text>
                </Text>
              )}
              {this.props.type === "comment" && (
                <Text style={{ lineHeight: 24 }}>
                  <Text>You received a comment from </Text>
                  <Text style={{ fontWeight: "bold" }}>{this.props.name} </Text>
                </Text>
              )}
              {this.props.type === "follow" && (
                <Text style={{ lineHeight: 24 }}>
                  <Text style={{ fontWeight: "bold" }}>{this.props.name} </Text>
                  <Text>started following you </Text>
                </Text>
              )}
              <Text style={{ fontSize: 14, color: "#bababa" }}>
                {moment(this.props.time)
                  .add({ hours: 5, minutes: 30 })
                  .fromNow()}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default class NotificationList extends React.PureComponent {
  _keyExtractor = (item, index) => item.notification_id;
  _renderItem = ({ item }) => (
    <NotificationItem
      id={item.notification_id}
      type={item.type}
      userAvatar={item.source_user_info.avatar}
      name={item.source_user_info.fname + " " + item.source_user_info.lname}
      userID={item.source_user_info.user_id}
      typeID={item.type_id}
      time={item.timestamp}
      stauts={item.status}
    />
  );
  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
