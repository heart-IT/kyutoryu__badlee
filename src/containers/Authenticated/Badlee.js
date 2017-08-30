"use strict";

import React, { Component } from "react";
import { Image, StyleSheet, ListView, AsyncStorage } from "react-native";
import BadleeCard from "../../components/BadleeCard";

import {
  StyleProvider,
  Content,
  View,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Button
} from "native-base";
import { connectStyle } from "native-base";
import { connect } from "react-redux";
import getTheme from "../../theme/components";

import base64 from "base-64";
import * as actionCreators from "../../badlee__redux/action_creators";
import NewBadlee from "./NewBadlee";

import BadleeFab from "../../components/Fab";
import Icon from "../../components/Icon";

let request_url = "http://mri2189.badlee.com/posts.php";
let follower_url =
  "http://mri2189.badlee.com/postbyfollow.php?offset=0&limit=30";
let location_url = "http://mri2189.badlee.com/posts.php?location=jaipur";

class Store extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      offset: 0,
      loaded: false,
      isLoading: false,
      dataSource: ds.cloneWithRows([]),
      fabState: false,
      current__tab: 1
    };
  }

  componentDidMount() {
    this.fetchBadlees(location_url);
  }

  fetchBadlees(request_url) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log(request_url);
    fetch(request_url, {
      headers: {
        Authorization: `Basic ${base64.encode(
          this.props.user.username + ":" + this.props.user.password
        )}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(dataSource => {
        console.log(dataSource);
        this.setState({
          dataSource: ds.cloneWithRows(dataSource),
          paused: true
        });
      })
      .catch(err => console.log(err))
      .done();
  }

  onFabToggle(fabState) {
    this.state.fabState = fabState;
  }
  onFabSelect(type) {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee,
        params: { type }
      });
    });
  }
  onTabChange(i, ref) {
    this.setState({ current__tab: i.i });
    if (i.i === 1) {
      this.fetchBadlees(location_url);
    } else if (i.i === 0) {
      this.fetchBadlees(follower_url);
    } else {
      this.fetchBadlees(request_url);
    }
  }

  render() {
    console.log(this.props.user);
    return (
      <StyleProvider style={getTheme()}>
        <Content
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, position: "relative" }}
        >
          <BadleeFab
            isActive={this.state.fabState}
            onToggle={this.onFabToggle.bind(this)}
            onSelection={this.onFabSelect.bind(this)}
          />
          <View style={{ flex: 1 }}>
            <Tabs
              secondary
              tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
              onChangeTab={this.onTabChange.bind(this)}
            >
              <Tab
                heading={
                  <TabHeading
                    style={{ backgroundColor: "#fff", paddingLeft: "12.5%" }}
                  >
                    <Icon
                      fill={
                        this.state.current__tab === 0 ? "#611265" : "#4D4D4D"
                      }
                      name="community"
                      height="30"
                      width="30"
                    />
                  </TabHeading>
                }
              >
                <ListView
                  style={{
                    paddingTop: 4,
                    backgroundColor: "#bdbdbd",
                    overflow: "scroll"
                  }}
                  dataSource={this.state.dataSource}
                  renderRow={data => <BadleeCard cardData={data} />}
                />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#fff" }}>
                    <Icon
                      fill={
                        this.state.current__tab === 1 ? "#611265" : "#4D4D4D"
                      }
                      name="location"
                      height="24"
                      width="24"
                    />
                  </TabHeading>
                }
              >
                <ListView
                  style={{
                    paddingTop: 4,
                    backgroundColor: "#bdbdbd",
                    overflow: "scroll"
                  }}
                  dataSource={this.state.dataSource}
                  renderRow={data => <BadleeCard cardData={data} />}
                />
              </Tab>
              <Tab
                heading={
                  <TabHeading
                    style={{ backgroundColor: "#fff", paddingRight: "12.5%" }}
                  >
                    <Icon
                      fill={
                        this.state.current__tab === 2 ? "#611265" : "#4D4D4D"
                      }
                      name="globe"
                      height="24"
                      width="24"
                    />
                  </TabHeading>
                }
              >
                <ListView
                  style={{
                    paddingTop: 4,
                    backgroundColor: "#bdbdbd",
                    overflow: "scroll"
                  }}
                  dataSource={this.state.dataSource}
                  renderRow={data => <BadleeCard cardData={data} />}
                />
              </Tab>
            </Tabs>
          </View>
        </Content>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#fff"
  },
  fab: {
    backgroundColor: "#5067FF"
  },
  badleePurposeIcon: {
    position: "absolute",
    top: 30,
    right: 6,
    zIndex: 9,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
    width: 36,
    height: 36
  }
});

const _Wrapped = connect(
  state => ({ user: state.getIn(["user", "information"]) }),
  actionCreators
)(Store);

export default _Wrapped;
