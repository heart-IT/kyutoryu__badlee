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
    let { type } = props.params;
    this.state = {
      type: type
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
    let userFollowing = this.props.userFollowing
      ? this.props.userFollowing.toJS()
      : [];
    let userFollower = this.props.userFollower
      ? this.props.userFollower.toJS()
      : [];
    let data = this.state.type === "following" ? userFollowing : userFollower;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left style={styles.headerLeft}>
              <TouchableOpacity onPress={this.goBack}>
                <Icon
                  name="menuBackIcon"
                  stroke="rgba(0, 0, 0, 0.81)"
                  width="16"
                  height="16"
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {this.state.type === "following" && "Following"}
                {this.state.type === "follower" && "Follower"}
              </Text>
            </Left>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
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
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: 6,
    fontSize: 18,
    fontWeight: "bold"
  }
};

const _Wrapped = connect(
  state => ({
    loggedUserID: state.getIn(["user", "loggedUserID"]),
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
