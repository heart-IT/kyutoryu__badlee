/**
 * @chill- We open our mind so the light of concentration will reveal what is there and liberate what is there. It is the same as untying knots in thread. We have to be calm, and we need to take time.
 *
 * @name- User.js
 * @description- This file contains User Profile page of the App
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Right,
  Content,
  View,
  Text,
  Button,
  Tabs,
  Tab,
  TabHeading
} from "native-base";

import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";

import Icon from "../../components/Icon";
import LoadingView from "../../components/LoadingView";

import Login from "../Not__Authenticated/login";

class User extends Component {
  componentDidMount() {
    this.setState({
      isOtherUser: this.props.params && this.props.params.isOtherProfile,
      otherUser: this.props.params && this.props.params.user
    });
  }
  handleLogout() {
    this.props.logout({
      navigator: this.props.navigator,
      component: Login,
      reset: true
    });
  }

  followUser() {
    this.props.followUser(this.props.params.user.user_id);
  }
  unFollowUser() {
    console.log("ai");
    this.props.unFollowUser(this.props.params.user.user_id);
  }

  render() {
    const { user } = this.props;
    const isOtherUser = this.state.isOtherProfile;
    const otherUser = this.state.otherUser;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          {isOtherUser && (
            <Header style={{ backgroundColor: "#fff" }}>
              <Left>
                <Button transparent>
                  <Icon name="menuBackIcon" width="24" height="24" />
                </Button>
              </Left>
              <Right>
                {this.props.notification === "User Followed" ||
                  (otherUser &&
                  otherUser.follower &&
                  otherUser.follower.indexOf(user.get("user_id")) > -1 && (
                    <Button transparent onPress={this.unFollowUser.bind(this)}>
                      <Icon name="following" width="24" height="24" />
                    </Button>
                  ))}
                {this.props.notification === "User Unfollowed" ||
                  (otherUser &&
                  (!otherUser.follower ||
                    (otherUser.follower &&
                      otherUser.follower.indexOf(user.get("user_id")) ===
                        -1)) && (
                    <Button transparent onPress={this.followUser.bind(this)}>
                      <Icon name="follow_add" width="24" height="24" />
                    </Button>
                  ))}

                <Icon name="messages" width="24" height="24" />
              </Right>
            </Header>
          )}
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.user__info}>
              <Image
                source={{
                  uri: isOtherUser ? otherUser.avatar : user.get("avatar")
                }}
                style={styles.user__photo}
              />

              <View style={styles.user__knowledge}>
                <Text style={styles.user__name}>
                  {isOtherUser ? otherUser.fname : user.get("fname")}{" "}
                  {isOtherUser ? otherUser.lname : user.get("lname")} -
                </Text>
                <Text style={styles.user__gender}>
                  {isOtherUser ? otherUser.gender : user.get("gender")}
                </Text>
                <Text style={styles.user__location}>
                  {isOtherUser ? otherUser.location : user.get("location")}
                </Text>
              </View>
              <View style={styles.user__supporters}>
                <View style={styles.user__following}>
                  <Text style={styles.supporters__label}>Following</Text>
                  <Text style={styles.supporters__value}>
                    {isOtherUser ? otherUser.following ? (
                      otherUser.following.length
                    ) : (
                      0
                    ) : user.get("following") ? (
                      user.get("following").length
                    ) : (
                      0
                    )}
                  </Text>
                </View>
                <View style={styles.user__follower}>
                  <Text style={styles.supporters__label}>Follower</Text>
                  <Text style={styles.supporters__value}>
                    {isOtherUser ? otherUser.follower ? (
                      otherUser.follower.length
                    ) : (
                      0
                    ) : user.get("follower") ? (
                      user.get("follower").length
                    ) : (
                      0
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.user__interestedin}>
                <Text style={styles.interestedin__label}>Interested in : </Text>
                <Text style={styles.user__interests}>
                  {isOtherUser ? otherUser.interests : user.get("interests")}
                </Text>
              </View>
            </View>
            <Tabs style={styles.user__badleetory}>
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Icon name="exchange" width="30" height="30" />
                  </TabHeading>
                }
                style={styles.inventory__type}
              />
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Icon name="shoutout" width="30" height="30" />
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                <Icon name="shoutout" width="30" height="30" />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Icon name="showoff" width="36" height="36" />
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                <Icon name="showoff" width="30" height="30" />
              </Tab>
            </Tabs>

            <Button
              red
              block
              marxFormElement
              onPress={this.handleLogout.bind(this)}
            >
              <Text>Logout</Text>
            </Button>
          </Content>
          {this.props.loading && <LoadingView message="Doing action.." />}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  user__info: {
    display: "flex",
    alignItems: "center",
    marginTop: 24
  },
  user__photo: {
    width: 96,
    height: 96,
    borderRadius: 48
  },
  user__knowledge: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  user__name: {
    fontWeight: "bold"
  },
  user__gender: {
    fontSize: 15,
    color: "#757575",
    borderRightWidth: 1,
    borderColor: "#757575",
    paddingLeft: 9,
    paddingRight: 9
  },
  user__location: {
    fontSize: 15,
    color: "#757575",
    paddingLeft: 9,
    paddingRight: 9
  },
  user__supporters: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9
  },
  user__following: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 30,
    paddingRight: 30,
    borderRightWidth: 1,
    borderColor: "#757575"
  },
  user__follower: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 30,
    paddingRight: 30
  },
  supporters__label: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  supporters__value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  user__interestedin: {
    marginTop: 9,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    flexDirection: "row"
  },
  interestedin__label: {
    fontWeight: "bold",
    flex: 4
  },
  user__interests: {
    flex: 7,
    color: "#616161",
    fontSize: 15,
    fontWeight: "bold"
  },
  user__badleetory: {
    marginTop: 18,
    paddingBottom: 12
  },
  inventory__type: {
    width: 90
  },
  inventorytype__head: {
    backgroundColor: "#fff"
  },
  inventorytype__icon: {
    width: 30,
    height: 30
  }
};

const _Wrapped = connect(
  state => ({
    user: state.getIn(["user", "information"]),
    loading: state.getIn(["application", "isLoading"]),
    notification: state.getIn(["application", "notification"])
  }),
  actionCreators
)(User);

export default _Wrapped;
