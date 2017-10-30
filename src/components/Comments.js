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

import moment from "moment";
import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View, Thumbnail } from "native-base";
import Icon from "./Icon";

export default class Comments extends PureComponent {
  _keyExtractor = (item, index) => item.comment_id;
  constructor(props) {
    super(props);
    this.onCommentDelete = this.onCommentDelete.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }
  onCommentDelete(commentId) {
    this.props.onCommentDelete(commentId);
  }
  onPressUser(userID) {
    this.props.onPressUser(userID);
  }
  _renderItem = ({ item }) => (
    <Comment
      loggedUserID={this.props.loggedUserID}
      userID={item.user_id}
      avatar={item.avatar}
      fname={item.fname}
      comment={item.content}
      commentID={item.comment_id}
      timestamp={item.timestamp}
      onCommentDelete={this.onCommentDelete}
      onPressUser={this.onPressUser}
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
  constructor(props) {
    super(props);
    this.onCommentDelete = this.onCommentDelete.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
  }
  onCommentDelete = () => {
    this.props.onCommentDelete(this.props.commentID);
  };
  onPressUser = () => {
    this.props.onPressUser(this.props.userID);
  };
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
          <TouchableOpacity onPress={this.onPressUser}>
            <Thumbnail
              source={{ uri: this.props.avatar }}
              style={{ width: 42, height: 42 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.onPressUser}>
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
          </TouchableOpacity>
          <Text style={{ fontSize: 17, color: "rgba(0, 0, 0, 0.87)" }}>
            {this.props.comment}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.67)",
                marginRight: 12
              }}
            >
              {moment(this.props.timestamp)
                .add({ hours: 5, minutes: 30 })
                .fromNow()}
            </Text>
            {this.props.loggedUserID === this.props.userID && (
              <TouchableOpacity onPress={this.onCommentDelete}>
                <Icon
                  name="postDelete"
                  width="21"
                  height="24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="14"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
