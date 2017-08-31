/**
 * @chill- We open our mind so the light of concentration will reveal what is there and liberate what is there. It is the same as untying knots in thread. We have to be calm, and we need to take time.
 *
 * @name- User.js
 * @description- This file contains User Profile page of the App
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { Image } from "react-native";
import {
  StyleProvider,
  Content,
  Text,
  Button,
  ListItem,
  Left,
  Body,
  View,
  Header,
  Tab,
  Tabs,
  TabHeading
} from "native-base";
import { connect } from "react-redux";
import getTheme from "../../theme/components";
import * as actionCreators from "../../badlee__redux/action_creators";
import Login from "../Not__Authenticated/Login";

var exchange__icon = require("../../images/exchange.png");
var showoff__icon = require("../../images/show off 2.png");
var shout__icon = require("../../images/shout badge.png");

class User extends Component {
  componentDidMount() {}
  handleLogout() {
    this.props.logout({
      navigator: this.props.navigator,
      component: Login,
      reset: true
    });
  }

  render() {
    const { user } = this.props;
    return (
      <StyleProvider style={getTheme()}>
        <Content>
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
              <Text style={styles.user__location}>
                {this.props.user.location}
              </Text>
            </View>
            <View style={styles.user__supporters}>
              <View style={styles.user__following}>
                <Text style={styles.supporters__label}>Following</Text>
                <Text style={styles.supporters__value}>
                  {user.following ? user.following : 0}
                </Text>
              </View>
              <View style={styles.user__follower}>
                <Text style={styles.supporters__label}>Follower</Text>
                <Text style={styles.supporters__value}>
                  {user.follower ? user.follower : 0}
                </Text>
              </View>
            </View>
            <View style={styles.user__interestedin}>
              <Text style={styles.interestedin__label}>Interested in : </Text>
              <Text style={styles.user__interests}>
                {this.props.user.interests}
              </Text>
            </View>
          </View>
          <View>
            <Tabs style={styles.user__badleetory}>
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Image
                      source={exchange__icon}
                      style={styles.inventorytype__icon}
                    />
                  </TabHeading>
                }
                style={styles.inventory__type}
              />
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Image
                      source={shout__icon}
                      style={styles.inventorytype__icon}
                    />
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                <Image source={shout__icon} />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={styles.inventorytype__head}>
                    <Image
                      source={showoff__icon}
                      style={styles.inventorytype__icon}
                    />
                  </TabHeading>
                }
                style={styles.inventory__type}
              >
                <Image source={showoff__icon} />
              </Tab>
            </Tabs>
          </View>

          <Button
            red
            block
            marxFormElement
            onPress={this.handleLogout.bind(this)}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
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
  state => ({ user: state.getIn(["user", "information"]) }),
  actionCreators
)(User);

export default _Wrapped;
