/**
 * @name- userList.js
 * 
 * @chill- We have to practice letting og of our ideas in order to see life everywhere,,, you are not enlcosed in your small shell of your body or the small shell of your lifespan. -Thich Nhat Hanh
 * 
 * 
 * @description- Component for showing List of user [like in reaction or following page]
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { Text, View, Thumbnail } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { connect } from "react-redux";
import * as actionCreators from "../badlee__redux/action_creators";

class UserRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onUserClicked = this.onUserClicked.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  onUserClicked() {
    this.props.onUserClicked(this.props.userId);
  }
  follow() {
    this.props.follow(this.props.userId);
  }
  unfollow() {
    this.props.unfollow(this.props.userId);
  }
  render() {
    return (
      <View
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          marginTop: 12,
          marginBottom: 3,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          onPress={this.onUserClicked}
        >
          <Thumbnail
            style={{ width: 45, height: 45, marginRight: 6 }}
            source={{ uri: this.props.avatar }}
          />
          <Text style={{ fontSize: 18 }}>{this.props.userName}</Text>
        </TouchableOpacity>
        {this.props.loggedUserID !== this.props.userId &&
          this.props.userFollowing.indexOf(this.props.userId) > -1 &&
          (this.props.loading ? (
            <TouchableOpacity transparent>
              <Icon name="follow_add_low" width="27" height="27" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity transparent onPress={this.unfollow}>
              <Icon name="following" width="27" height="27" />
            </TouchableOpacity>
          ))}

        {this.props.loggedUserID !== this.props.userId &&
          this.props.userFollowing.indexOf(this.props.userId) === -1 &&
          (this.props.loading ? (
            <TouchableOpacity transparent>
              <Icon name="following_low" width="27" height="27" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity transparent onPress={this.follow}>
              <Icon name="follow_add" width="27" height="27" />
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}

class UserList extends React.PureComponent {
  state = { following: new Map(), clickedUserID: -1 };
  _keyExtractor = (item, index) =>
    item.user_id
      ? item.user_id
      : item.user_id_following ? item.user_id_following : item.user_id_follower;
  constructor(props) {
    super(props);
    this.onUserClicked = this.onUserClicked.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }
  onUserClicked(userId) {
    this.setState({ clickedUserID: userId, type: "click" }, () => {
      this.props.onClickUser(userId);
    });
  }
  follow(userId) {
    this.setState({ clickedUserID: userId, type: "follow" }, () => {
      this.props.onFollow(userId);
    });
  }
  unfollow(userId) {
    this.setState({ clickedUserID: userId, type: "unfollow" }, () => {
      this.props.onUnfollow(userId);
    });
  }

  _renderItem = ({ item }) => (
    <UserRow
      userId={
        item.user_id
          ? item.user_id
          : item.user_id_following
            ? item.user_id_following
            : item.user_id_follower
      }
      userName={item.name ? item.name : item.fname + " " + item.lname}
      avatar={item.avatar}
      userFollowing={this.props.following}
      loggedUserID={this.props.loggedUserID}
      onUserClicked={this.onUserClicked}
      follow={this.follow}
      unfollow={this.unfollow}
      loading={
        this.props.loading &&
        this.state.clickedUserID ===
          (item.user_id || item.user_id_following || item.user_id_follower) &&
        this.state.type !== "click"
      }
    />
  );
  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.following}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(UserList);

export default _Wrapped;
