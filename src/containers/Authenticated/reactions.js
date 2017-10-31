/**
 * @name- reactions.js
 * 
 * @chill- Finish every day and be done with it. You have done what you could. Some blunders and absurdities, no doubt crept in. Forget them as soon as you can- This new day is too dear, with its hopes and invitations, to waste a moment on the yesterdays. -Ralph Waldo Emerson
 * 
 * 
 * @description- reaction page for badlee
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
  TabHeading,
  Left,
  StyleProvider,
  Text,
  View,
  Tabs,
  Tab
} from "native-base";

import User from "./user";
import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import UserList from "../../components/userList";
class Reactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0
    };
    this.onTabChange = this.onTabChange.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onFollow = this.onFollow.bind(this);
    this.onUnfollow = this.onUnfollow.bind(this);
  }
  goBack() {
    this.props.goBack();
  }
  onTabChange(i, ref) {
    this.setState({
      activeTabIndex: i.i
    });
  }
  onClickUser(userId) {
    requestAnimationFrame(() => {
      this.props.showUserPage(userId, {
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
    let userFollowing = this.props.userFollowing
      ? this.props.userFollowing
          .map(user => {
            return user.get("user_id_following");
          })
          .toJS()
      : [];
    let likes = this.props.likes ? this.props.likes.toJS() : [];
    let wishes = this.props.wishes ? this.props.wishes.toJS() : [];
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left style={styles.headerLeft}>
              <TouchableOpacity onPress={this.goBack.bind(this)}>
                <Icon name="menuBackIcon" width="18" height="18" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Reactions</Text>
            </Left>
          </Header>
          <Tabs initialPage={0} onChangeTab={this.onTabChange}>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  {this.state.activeTabIndex === 0 ? (
                    <Icon
                      name="postLiked"
                      width="30"
                      height="30"
                      style={{ margin: 3 }}
                      strokeWidth="17"
                    />
                  ) : (
                    <Icon
                      name="postUnliked"
                      width="30"
                      height="30"
                      style={{ margin: 3 }}
                      fill="none"
                      stroke="#000"
                      strokeWidth="17"
                    />
                  )}
                  <Text>Likes</Text>
                </TabHeading>
              }
            >
              <UserList
                data={likes}
                following={userFollowing}
                loggedUserID={this.props.loggedUserID}
                onClickUser={this.onClickUser}
                onFollow={this.onFollow}
                onUnfollow={this.onUnfollow}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Icon
                    name="postWished"
                    width="30"
                    height="30"
                    fill={
                      this.state.activeTabIndex === 1 ? "#EF5454" : "#b09091"
                    }
                    style={{ margin: 3 }}
                  />
                  <Text>Wish</Text>
                </TabHeading>
              }
            >
              <UserList
                data={wishes}
                following={userFollowing}
                loggedUserID={this.props.loggedUserID}
                onClickUser={this.onClickUser}
                onFollow={this.onFollow}
                onUnfollow={this.onUnfollow}
              />
            </Tab>
          </Tabs>
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
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "bold"
  }
};

const _Wrapped = connect(
  state => ({
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    userFollowing: state.getIn([
      "user",
      "data",
      state.getIn(["user", "loggedUserID"]),
      "following"
    ]),
    likes: state.getIn([
      "badlees",
      "data",
      state.getIn(["badlees", "activeBadleeID"]),
      "likes"
    ]),
    wishes: state.getIn([
      "badlees",
      "data",
      state.getIn(["badlees", "activeBadleeID"]),
      "wishes"
    ])
  }),
  actionCreators
)(Reactions);

export default _Wrapped;
