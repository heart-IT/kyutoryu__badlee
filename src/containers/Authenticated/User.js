/**
 * @name- User.js
 * 
 * @chill- We open our mind so the light of concentration will reveal what is there and liberate what is there. It is the same as untying knots in thread. We have to be calm, and we need to take time.
 * 
 * 
 *
 * @description- This file contains User Profile page of the App
 * 
 * @author- heartit pirates
 */

"use strict";

import {
  Container,
  Content,
  Header,
  Left,
  Right,
  StyleProvider,
  Tab,
  TabHeading,
  Tabs,
  Text,
  View
} from "native-base";
import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import BadleeList from "../../components/BadleeList";
import getTheme from "../../theme/components";
import Login from "../Not__Authenticated/login";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      currentData: [],
      isOtherUser: props.params && props.params.isOtherUser,
      userProfile:
        props.params && props.params.isOtherUser
          ? props.guestUser.toJS()
          : props.user.toJS()
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.unFollowUser = this.unFollowUser.bind(this);
    this.followUser = this.followUser.bind(this);

    this.onTabChange = this.onTabChange.bind(this);

    this.onClickBadlee = this.onClickBadlee.bind(this);
  }

  componentDidMount() {
    this.getUserBadlees();
  }

  componentWillReceiveProps(nextProps) {
    let { badlees, badleeUserIDs, params, user, guestUser } = nextProps;
    let activeTabs = ["exchange", "shoutout", "showoff"];
    let user_id = this.state.userProfile.user_id;
    let badleesJS = badlees.toJS();
    let badleesToShowIDS = badleeUserIDs.getIn([
      user_id,
      activeTabs[this.state.activeTabIndex]
    ]);
    let badleesToShow = [];
    if (badleesToShowIDS) {
      badleesToShow = badleesToShowIDS
        .map(id => {
          return badleesJS[id];
        })
        .toJS();
    }
    this.setState({ currentData: badleesToShow });
  }

  onTabChange(i, ref) {
    this.setState({ activeTabIndex: i.i }, () => {
      this.getUserBadlees();
    });
  }
  getUserBadlees() {
    let activeTabs = ["exchange", "shoutout", "showoff"];
    let activeTab = activeTabs[this.state.activeTabIndex];
    let userID = this.state.userProfile.user_id;
    this.props.getUserBadlees(userID, activeTab);
  }

  handleLogout() {
    this.props.logout({
      navigator: this.props.navigator,
      component: Login,
      reset: true
    });
  }

  onBackPress() {
    this.props.goBack();
  }

  followUser() {
    this.props.followUser(this.state.userProfile.user_id);
  }
  unFollowUser() {
    this.props.unFollowUser(this.state.userProfile.user_id);
  }

  onClickBadlee(id) {
    console.log(id);
  }

  render() {
    function returnIcon(name, width = 21, height = 21) {
      return <Icon name={name} width={width} height={height} />;
    }
    let user = this.state.userProfile;
    const loggedUserID = this.props.user.get("user_id");
    const isGuestFollower =
      user.follower && user.follower.indexOf(loggedUserID) !== -1;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          {this.state.isOtherUser && (
            <Header style={{ backgroundColor: "#fff", height: 48 }}>
              <Left
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity transparent onPress={this.onBackPress}>
                  {returnIcon("menuBackIcon")}
                </TouchableOpacity>
                <Text style={{ marginLeft: 6, fontSize: 20 }}>
                  {user.username}
                </Text>
              </Left>
              <Right>
                {isGuestFollower && (
                  <TouchableOpacity transparent onPress={this.unFollowUser}>
                    {returnIcon("following", 27, 27)}
                  </TouchableOpacity>
                )}
                {!isGuestFollower && (
                  <TouchableOpacity transparent onPress={this.followUser}>
                    {returnIcon("follow_add", 27, 27)}
                  </TouchableOpacity>
                )}
              </Right>
            </Header>
          )}
          <Content
            style={{ flex: 1, paddingTop: 18 }}
            contentContainerStyle={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                zIndex: 99,
                position: "relative"
              }}
            >
              {!this.state.isOtherUser && (
                <TouchableOpacity
                  transparent
                  onPress={this.handleLogout}
                  style={styles.logout}
                >
                  {returnIcon("logout")}
                </TouchableOpacity>
              )}
              <View>
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.user__photo}
                />
              </View>
              <View style={styles.user__knowledge}>
                <Text
                  style={styles.user__name}
                >{`${user.fname} ${user.lname} -`}</Text>
                <Text style={styles.user__gender}>{user.gender}</Text>
                <Text style={styles.user__location}>{user.location}</Text>
              </View>
              <View style={styles.user__supporters}>
                <View style={styles.user__following}>
                  <Text style={styles.supporters__label}>Following</Text>
                  <Text style={styles.supporters__value}>
                    {user.following ? user.following.length : 0}
                  </Text>
                </View>
                <View style={styles.user__follower}>
                  <Text style={styles.supporters__label}>Follower</Text>
                  <Text style={styles.supporters__value}>
                    {user.follower ? user.follower.length : 0}
                  </Text>
                </View>
              </View>
              <View style={styles.user__interestedin}>
                <Text style={styles.interestedin__label}>Interested in : </Text>
                <Text style={styles.user__interests}>{user.interests}</Text>
              </View>
              <Tabs
                style={styles.user__badleetory}
                onChangeTab={this.onTabChange}
                initialPage={this.state.activeTabIndex}
                tabBarUnderlineStyle={{
                  backgroundColor: "#611265",
                  height: 3
                }}
              >
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      {returnIcon("exchange", 30, 30)}
                    </TabHeading>
                  }
                >
                  <BadleeList data={this.state.currentData} type="grid" />
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      {returnIcon("shoutout", 30, 30)}
                    </TabHeading>
                  }
                />
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      {returnIcon("showoff", 36, 36)}
                    </TabHeading>
                  }
                />
              </Tabs>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

let styles = {
  logout: {
    position: "absolute",
    top: 6,
    right: 15,
    width: 40,
    height: 40
  },
  user__photo: {
    width: 96,
    height: 96,
    borderRadius: 48
  },
  user__knowledge: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  user__name: {
    fontWeight: "bold",
    color: "#000"
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
    marginTop: 12
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
    user: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "loggedUserID"])
    ]),
    guestUser: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "guestUserID"])
    ]),
    badlees: state.getIn(["badlees", "data"]),
    badleeUserIDs: state.getIn(["badlees", "users"])
  }),
  actionCreators
)(User);

export default _Wrapped;
