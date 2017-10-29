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
    this.props.followUser(userId);
  }
  onUnfollow(userId) {
    this.props.unFollowUser(userId);
  }
  render() {}
}

const _Wrapped = connect(
  state => ({
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    user: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "loggedUserID"])
    ]),
    guestUser: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "guestUserID"])
    ])
  }),
  actionCreators
)(Follow);

export default _Wrapped;
