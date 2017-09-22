/**
 * @chill- We open our mind so the light of concentration will reveal what is there and liberate what is there. It is the same as untying knots in thread. We have to be calm, and we need to take time.
 *
 * @name- User.js
 * @description- This file contains User Profile page of the App
 * @author- heartit pirates
 */
import {
    Button,
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
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import BadleesGrid from '../../components/BadleesGrid';
import Icon from '../../components/Icon';
import LoadingView from '../../components/LoadingView';
import getTheme from '../../theme/components';
import Login from '../Not__Authenticated/login';

("use strict");

class User extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.unFollowUser = this.unFollowUser.bind(this);
    this.followUser = this.followUser.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.state = {
      currentData: [],
      activeTabIndex: 0
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
            <Button transparent onPress={this.unFollowUser}>
              {returnIcon("following")}
            </Button>
          )}
          {!isGuestFollower && (
            <Button transparent onPress={this.followUser}>
              {returnIcon("follow_add")}
            </Button>
          )}
        </Right>
      </Header>
    );

    function returnBadleeGrid() {
      return <BadleesGrid data={_this.state.currentData} />;
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
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    {returnIcon("shoutout", 30, 30)}
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                {returnIcon("shoutout", 30, 30)}
              </Tab>
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    {returnIcon("showoff", 36, 36)}
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                {returnIcon("showoff", 36, 36)}
              </Tab>
            </Tabs>
          </Content>
          {this.props.loading && <LoadingView message="Doing action.." />}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  logout: {
    position: "absolute",
    top: 6,
    right: 15,
    zIndex: 99
  },
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
    guestUser: state.get("guestUser"),

    loading: state.getIn(["application", "isLoading"]),
    notification: state.getIn(["application", "notification"])
  }),
  actionCreators
)(User);

export default _Wrapped;
