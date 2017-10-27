/**
 * @name- Comments.js
 * 
 * @chill- Men concern themselves most about that which passes away- They are like a blind man set to look after a burning lamp- Buddha
 * 
 * 
 * @description- Comments Flatlist component
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View, Thumbnail } from "native-base";
import Icon from "./Icon";

export default class Comments extends PureComponent {
  _keyExtractor = (item, index) => {
    return item.user_id + "," + item.timestamp;
  };
  _renderItem = ({ item }) => (
    <Comment
      loggedUserID={this.props.loggedUserID}
      userID={item.user_id}
      id={item.id}
      avatar={item.avatar}
      fname={item.fname}
      comment={item.content}
    />
  );
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{ marginBottom: 12, marginTop: 12 }}
      />
    );
  }
}

class Comment extends PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 6,
          marginBottom: 6
        }}
      >
        <View style={{ paddingLeft: 6, paddingRight: 9 }}>
          <Thumbnail
            source={{ uri: this.props.avatar }}
            style={{ width: 42, height: 42 }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 30
            }}
          >
            {this.props.fname}
          </Text>
          <Text style={{ fontSize: 17, color: "rgba(0, 0, 0, 0.72)" }}>
            {this.props.comment}
          </Text>
          {this.props.loggedUserID === this.props.userID && (
            <TouchableOpacity>
              <Icon
                name="postDelete"
                width="20"
                height="24"
                fill="none"
                stroke="#000"
                strokeWidth="17"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
