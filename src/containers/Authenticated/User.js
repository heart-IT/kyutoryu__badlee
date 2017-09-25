/**
 * @chill- We open our mind so the light of concentration will reveal what is there and liberate what is there. It is the same as untying knots in thread. We have to be calm, and we need to take time.
 *
 * @name- User.js
 * @description- This file contains User Profile page of the App
 * @author- heartit pirates
 */
import { Container, Content, Header, Left, Right, StyleProvider, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import React from 'react';
import { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import BadleesGrid from '../../components/BadleesGrid';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';
import { styles } from '../../theme/mystyle/userpage';
import Login from '../Not__Authenticated/login';

("use strict");

class User extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.unFollowUser = this.unFollowUser.bind(this);
    this.followUser = this.followUser.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onClickBadlee = this.onClickBadlee.bind(this);
    this.state = {
      activeTabIndex: 0,
      currentData: []
    };
  }
  componentDidMount() {
    this.setState(
      { isOtherUser: this.props.params && this.props.params.isOtherUser },
      () => {
        this.getUserBadlees();
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    let { badlees, badleeUserIDs, params, user, guestUser } = nextProps;
    let user_id =
      params && params.isOtherUser
        ? guestUser.get("user_id")
        : user.get("user_id");
    let badleesJS = badlees.toJS();
    let badleesToShowIDS = "";
    switch (this.state.activeTabIndex) {
      case 0:
        badleesToShowIDS = badleeUserIDs.getIn(["exchange", user_id]);
        break;
      case 1:
        badleesToShowIDS = badleeUserIDs.getIn(["shoutout", user_id]);
        break;
      default:
        badleesToShowIDS = badleeUserIDs.getIn(["showoff", user_id]);
    }
    let badleesToShow =
      badleesToShowIDS &&
      badleesToShowIDS.map(id => {
        return badleesJS[id];
      });
    this.setState({
      currentData: badleesToShowIDS ? badleesToShow.toJS() : []
    });
  }

  onTabChange(i, ref) {
    this.setState({ activeTabIndex: i.i }, () => {
      this.getUserBadlees();
    });
  }
  getUserBadlees() {
    let activeTab = ["exchange", "shoutout", "showoff"][
      this.state.activeTabIndex
    ];

    let userID = this.state.isOtherUser
      ? this.props.guestUser.get("user_id")
      : this.props.user.get("user_id");
    this.props.getUserBadlees(userID, activeTab);
  }
  handleLogout() {
    this.props.logout({
      navigator: this.props.navigator,
      component: Login,
      reset: true
    });
  }

  followUser() {
    this.props.followUser(this.props.guestUser.get("user_id"));
  }
  unFollowUser() {
    this.props.unFollowUser(this.props.guestUser.get("user_id"));
  }

  onClickBadlee(id) {
    console.log(id);
  }

  render() {
    let _this = this;
    const { isOtherUser } = this.state;

    const user = isOtherUser
      ? this.props.guestUser.toJS()
      : this.props.user.toJS();
    const loggedUserID = this.props.user.get("user_id");

    const isGuestFollower =
      user.follower && user.follower.indexOf(loggedUserID) !== -1;

    function returnIcon(name, width = 24, height = 24) {
      return <Icon name={name} width={width} height={height} />;
    }
    let guestUserHeader = (
      <Header style={{ backgroundColor: "#fff" }}>
        <Left>
          <TouchableOpacity transparent>
            {returnIcon("menuBackIcon")}
          </TouchableOpacity>
        </Left>
        <Right>
          {isGuestFollower && (
            <TouchableOpacity transparent onPress={this.unFollowUser}>
              {returnIcon("following")}
            </TouchableOpacity>
          )}
          {!isGuestFollower && (
            <TouchableOpacity transparent onPress={this.followUser}>
              {returnIcon("follow_add")}
            </TouchableOpacity>
          )}
        </Right>
      </Header>
    );

    function returnBadleeGrid() {
      if (_this.state.currentData.length) {
        return (
          <BadleesGrid
            data={_this.state.currentData}
            onClickBadlee={_this.onClickBadlee}
          />
        );
      }
    }

    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          {isOtherUser && guestUserHeader}
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {!isOtherUser && (
              <TouchableOpacity
                transparent
                onPress={this.handleLogout}
                style={styles.logout}
              >
                {returnIcon("logout")}
              </TouchableOpacity>
            )}
            <View style={styles.user__info}>
              <Image
                source={{
                  uri: user.avatar
                }}
                style={styles.user__photo}
              />

              <View style={styles.user__knowledge}>
                <Text style={styles.user__name}>
                  {user.fname} {user.lname} -
                </Text>
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
            </View>
            <Tabs
              style={styles.user__badleetory}
              onChangeTab={this.onTabChange}
              initialPage={this.state.activeTabIndex}
            >
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    {returnIcon("exchange", 30, 30)}
                  </TabHeading>
                }
                style={styles.inventory__type}
              />
              {returnBadleeGrid()}
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    {returnIcon("shoutout", 30, 30)}
                  </TabHeading>
                }
                style={styles.inventory__type}
              />
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    {returnIcon("showoff", 36, 36)}
                  </TabHeading>
                }
                style={styles.inventory__type}
              />
            </Tabs>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

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
    badleeUserIDs: state.getIn(["badlees", "users"]),
    loading: state.getIn(["application", "isLoading"]),
    notification: state.getIn(["application", "notifications"])
  }),
  actionCreators
)(User);

export default _Wrapped;
