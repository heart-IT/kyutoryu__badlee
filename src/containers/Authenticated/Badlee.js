"use strict";

import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  StyleProvider,
  Container,
  Content,
  View,
  Tabs,
  Tab,
  TabHeading,
  Text,
  Button
} from "native-base";
import getTheme from "../../theme/components";

import * as actionCreators from "../../badlee__redux/action_creators";
import BadleeFab from "../../components/Fab";
import Icon from "../../components/Icon";
import BadleesList from "../../components/BadleesList";
import NewBadlee from "./NewBadlee";

let request_url = "http://mri2189.badlee.com/posts.php?offset=0&limit=10";
let follower_url =
  "http://mri2189.badlee.com/postbyfollow.php?offset=0&limit=30";
let location_url =
  "http://mri2189.badlee.com/posts.php?location=jaipur, rajasthan, india";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current__tab: 0,
      data: [],
      page: 1,
      offset: 10,
      request_url: "http://mri2189.badlee.com/posts.php?offset=0&limit=10",
      follower_url:
        "http://mri2189.badlee.com/postbyfollow.php?offset=0&limit=30",
      location_url:
        "http://mri2189.badlee.com/posts.php?location=jaipur, rajasthan, india"
    };
  }
  componentDidMount() {
    if (this.state.current__tab === 1) {
      this.makeBadleesFetchRequest(location_url);
    } else if (this.state.current__tab === 0) {
      this.makeBadleesFetchRequest(follower_url);
    } else {
      this.makeBadleesFetchRequest(request_url);
    }
  }
  makeBadleesFetchRequest = url => {
    console.log(url);
    const { page, offset } = this.state;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });
      });
  };
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
      this.makeBadleesFetchRequest(location_url);
    } else if (i.i === 0) {
      this.makeBadleesFetchRequest(follower_url);
    } else {
      this.makeBadleesFetchRequest(request_url);
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Content style={styles.content} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab
              isActive={false}
              onSelection={this.onFabSelect.bind(this)}
            />
            <View style={styles.content}>
              <Tabs
                tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
                onChangeTab={this.onTabChange.bind(this)}
              >
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.firstTab }}
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text>No item present yet</Text>
                  </View>
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.tabHead}>
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
                  <BadleesList data={this.state.data} />
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.lastTab }}
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
                  <BadleesList data={this.state.data} />
                </Tab>
              </Tabs>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  content: { flex: 1 },
  tabHead: { backgroundColor: "#fff" },
  firstTab: { paddingLeft: "12.5%" },
  lastTab: { paddingRight: "12.5%" }
};

const _Wrapped = connect(
  state => ({ user: state.getIn(["user", "information"]) }),
  actionCreators
)(Store);

export default _Wrapped;
