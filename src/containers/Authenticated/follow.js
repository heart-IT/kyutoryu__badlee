/**
 * @name- follow.js
 * 
 * @chill- It is only life and love that give love and life. -Elbert Hubbard
 * 
 * 
 * @description- Follower/Following Page
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  Left,
  StyleProvider,
  Text,
  View
} from "native-base";
import User from "./user";
import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import UserList from "../../components/userList";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onFollow = this.onFollow.bind(this);
    this.onUnfollow = this.onUnfollow.bind(this);
    let { type, isMyProfile } = props.params;
    this.state = {
      type: type,
      isMyProfile: isMyProfile,
      isOtherUser:
        !props.isMyProfile || props.loggedUserID !== props.activeUserID
    };
  }
  goBack() {
    this.props.goBack();
  }
  onClickUser(userID) {
    requestAnimationFrame(() => {
      this.props.showUserPage(userID, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  onFollow(userId) {
    this.props.onFollowUser(userId);
  }
  onUnfollow(userId) {
    this.props.onUnfollowUser(userId);
  }
  render() {
    let loggedUserFollowing = this.props.loggedUserFollowing
      ? this.props.loggedUserFollowing
          .map(user => {
            return user.get("user_id_following");
          })
          .toJS()
      : [];
    let userFollowing = this.state.isMyProfile
      ? this.props.loggedUserFollowing
        ? this.props.loggedUserFollowing.toJS()
        : []
      : this.props.userFollowing ? this.props.userFollowing.toJS() : [];
    let userFollower = this.state.isMyProfile
      ? this.props.loggedUserFollower
        ? this.props.loggedUserFollower.toJS()
        : []
      : this.props.userFollower ? this.props.userFollower.toJS() : [];
    let data = this.state.type === "following" ? userFollowing : userFollower;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left style={styles.headerLeft}>
              <TouchableOpacity onPress={this.goBack}>
                <Icon name="menuBackIcon" width="18" height="18" />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {this.state.type === "following" && "Following"}
                {this.state.type === "follower" && "Follower"}
              </Text>
            </Left>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {!data ||
              (data.length === 0 && (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    No User
                  </Text>
                </View>
              ))}
            <UserList
              data={data}
              following={loggedUserFollowing}
              loggedUserID={this.props.loggedUserID}
              onClickUser={this.onClickUser}
              onFollow={this.onFollow}
              onUnfollow={this.onUnfollow}
            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

var styles = {
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    marginLeft: 12,
    fontSize: 18
  }
};

const _Wrapped = connect(
  state => ({
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    activeUserID: state.getIn(["user", "activeUserID"]),
    userFollower: state.getIn([
      "user",
      "data",
      state.getIn(["user", "activeUserID"]),
      "follower"
    ]),
    userFollowing: state.getIn([
      "user",
      "data",
      state.getIn(["user", "activeUserID"]),
      "following"
    ]),
    loggedUserFollower: state.getIn([
      "user",
      "data",
      state.getIn(["user", "loggedUserID"]),
      "follower"
    ]),
    loggedUserFollowing: state.getIn([
      "user",
      "data",
      state.getIn(["user", "loggedUserID"]),
      "following"
    ])
  }),
  actionCreators
)(Follow);

export default _Wrapped;
