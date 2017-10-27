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
import { FlatList } from "react-native";
import { Text, View, Thumbnail } from "native-base";

export default class Comments extends PureComponent {
  _keyExtractor = (item, index) => {
    return item.user_id + "," + item.timestamp;
  };
  _renderItem = ({ item }) => (
    <Comment
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
      />
    );
  }
}

class Comment extends PureComponent {
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingLeft: 6, paddingRight: 6 }}>
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
              fontSize: 17,
              lineHeight: 30
            }}
          >
            {this.props.fname}
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(0, 0, 0, 0.72)" }}>
            {this.props.comment}
          </Text>
        </View>
      </View>
    );
  }
}
