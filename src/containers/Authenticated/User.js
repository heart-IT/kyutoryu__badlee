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
import Picker from "../../components/Picker";
import Follow from "./follow";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      currentData: [],
      isOtherUser:
        props.user.get("user_id") !== props.loggedUser.get("user_id"),
      userProfile: props.user.toJS(),
      paging: { page: 0, limit: 32 }
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.unFollowUser = this.unFollowUser.bind(this);
    this.followUser = this.followUser.bind(this);
    this.onClickFollower = this.onClickFollower.bind(this);
    this.onClickFollowing = this.onClickFollowing.bind(this);

    this.onTabChange = this.onTabChange.bind(this);

    this.onClickBadlee = this.onClickBadlee.bind(this);
    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.onListEnd = this.onListEnd.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.onPickerSubmit = this.onPickerSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserBadlees();
  }

  componentWillReceiveProps(nextProps) {
    let { badlees, badleeUserIDs, params, user, guestUser } = nextProps;
    let activeTabs = ["exchange", "shoutout", "showoff", "wish"];
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
    let { page, limit } = this.state.paging;
    let activeTabs = ["exchange", "shoutout", "showoff", "wish"];
    let activeTab = activeTabs[this.state.activeTabIndex];
    let userID = this.state.userProfile.user_id;
    this.props.getUserBadlees(userID, activeTab, page * limit, limit);
  }

  openMenu(id) {
    this.setState({ showPicker: true, type: "userMenu" });
  }
  closePicker() {
    this.setState({ showPicker: false });
  }
  onPickerSubmit(submittedVal) {
    console.log(submittedVal);
    let response = submittedVal && submittedVal[0].name;
    console.log(response);
    this.setState({ showPicker: false });
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
  onClickFollower() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Follow,
        params: {
          type: "follower"
        }
      });
    });
  }
  onClickFollowing() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Follow,
        params: {
          type: "following"
        }
      });
    });
  }

  onClickBadlee(id) {
    console.log(id);
  }
  onFlatListRefresh() {
    let { page, limit } = this.state.paging;
    this.setState({ paging: { page: 0, limit: limit } }, () => {
      this.getUserBadlees();
    });
  }

  onListEnd() {
    let { page, limit } = this.state.paging;
    this.setState(
      {
        paging: {
          page: page + 1,
          limit: limit
        }
      },
      () => {
        let { tabNames, activeTabIndex } = this.state;
        this.getUserBadlees();
      }
    );
  }

  render() {
    function returnIcon(name, width = 21, height = 21) {
      return <Icon name={name} width={width} height={height} />;
    }
    let user = this.state.userProfile;
    console.log(user);
    const loggedUserID = this.props.loggedUser.get("user_id");
    let isGuestFollower = false;
    if (user.follower) {
      user.follower.map(follower => {
        if (follower.user_id_follower == loggedUserID) {
          isGuestFollower = true;
        }
      });
    }
    console.log(user.follower);
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
                  onPress={this.openMenu}
                  style={styles.logout}
                >
                  {returnIcon("hamburger", 48, 48)}
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
                <TouchableOpacity
                  style={styles.user__following}
                  onPress={this.onClickFollowing}
                >
                  <Text style={styles.supporters__label}>Following</Text>
                  <Text style={styles.supporters__value}>
                    {user.following ? user.following.length : 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.user__follower}
                  onPress={this.onClickFollower}
                >
                  <Text style={styles.supporters__label}>Follower</Text>
                  <Text style={styles.supporters__value}>
                    {user.follower ? user.follower.length : 0}
                  </Text>
                </TouchableOpacity>
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
                  <BadleeList
                    data={this.state.currentData}
                    type="grid"
                    toShowPurpose={false}
                    onClickBadlee={this.onClickBadlee}
                    onFlatListRefresh={this.onFlatListRefresh}
                    onListEnd={this.onListEnd}
                    loggedUserID={loggedUserID}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      {returnIcon("shoutout", 30, 30)}
                    </TabHeading>
                  }
                >
                  <BadleeList
                    data={this.state.currentData}
                    type="grid"
                    toShowPurpose={false}
                    onClickBadlee={this.onClickBadlee}
                    onFlatListRefresh={this.onFlatListRefresh}
                    onListEnd={this.onListEnd}
                    loggedUserID={loggedUserID}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      {returnIcon("showoff", 36, 36)}
                    </TabHeading>
                  }
                >
                  <BadleeList
                    data={this.state.currentData}
                    type="grid"
                    toShowPurpose={false}
                    onClickBadlee={this.onClickBadlee}
                    onFlatListRefresh={this.onFlatListRefresh}
                    onListEnd={this.onListEnd}
                    loggedUserID={loggedUserID}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.inventorytype__head}>
                      <Icon name="wish" height="36" width="36" fill="#EF5454" />
                    </TabHeading>
                  }
                >
                  <BadleeList
                    data={this.state.currentData}
                    type="grid"
                    toShowPurpose={false}
                    onClickBadlee={this.onClickBadlee}
                    onFlatListRefresh={this.onFlatListRefresh}
                    onListEnd={this.onListEnd}
                    loggedUserID={loggedUserID}
                  />
                </Tab>
              </Tabs>
              {this.state.showPicker && (
                <Picker
                  type={this.state.type}
                  multiselect={false}
                  onPickerClose={this.closePicker}
                  onPickerSubmit={this.onPickerSubmit}
                  needSearch={false}
                />
              )}
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
      state.getIn(["user", "showing"])
    ]),
    userShowing: state.getIn(["user", "showing"]),
    loggedUser: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "loggedUserID"])
    ]),
    badlees: state.getIn(["badlees", "data"]),
    badleeUserIDs: state.getIn(["badlees", "users"])
  }),
  actionCreators
)(User);

export default _Wrapped;
