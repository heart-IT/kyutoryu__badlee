"use strict";

import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import moment from "moment";
// import TimeAgo from "react-native-timeago";
// import Moment from "react-moment";

import {
  StyleProvider,
  Content,
  View,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  Button,
  Fab
} from "native-base";
import { connectStyle } from "native-base";
import { connect } from "react-redux";
import getTheme from "../../theme/components";
import * as actionCreators from "../../action_creators";

import { dummy__badleeList } from "../../fixtures";

let request_url = "http://mri2189.badlee.com/posts.php";

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#fff"
  }
});

class Store extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      loaded: false,
      isLoading: false,
      badlees: dummy__badleeList
    };
  }

  componentDidMount() {
    var myHeaders = new Headers();

    var myInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors"
      }
    };

    fetch(request_url, myInit).then(response => {
      if (response.status === 200) {
        var json = response.json();
        console.log(json);
        this.setState("badlees", json);
      }
    });
  }

  fetchData(offset) {
    fetch(request_url, {
      method: "GET",
      headers: {
        "Content-Type": "text/json"
      }
    }).then(response => {
      console.log(response);
    });
  }

  render() {
    var badlees = this.state.badlees.map(data => {
      return (
        <Card
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 6,
            marginTop: 3,
            borderRadius: 0
          }}
          key={data["id"]}
        >
          <CardItem header>
            <Left>
              <Thumbnail
                source={{
                  uri: data["photo"]
                }}
                style={{ height: 32, width: 32, marginLeft: 12 }}
              />
              <Text>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  {data["user"]}
                </Text>
                <Text style={{ fontSize: 12 }}>'s</Text>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  {" "}Thingy
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}{moment(data["timestamp"]).fromNow()}
                </Text>
              </Text>
            </Left>
          </CardItem>

          <CardItem cardBody style={{ flexDirection: "column", marginTop: 2 }}>
            <Image
              source={{
                uri: data["photo"]
              }}
              style={{ height: 200, width: "100%", flex: 1 }}
            />
            <Body>
              <Text
                style={{
                  marginLeft: 12,
                  marginTop: 2,
                  fontWeight: "bold",
                  fontSize: 12
                }}
              >
                {data["place"]}
              </Text>
              <Text
                style={{
                  marginLeft: 12,
                  marginTop: 12,
                  fontWeight: "bold",
                  fontSize: 18,
                  fontStyle: "italic"
                }}
              >
                {data["description"]}
              </Text>
            </Body>
          </CardItem>

          <CardItem footer>
            <Button transparent>
              <Icon active name="thumbs-up" />
              {/*<Text>{data["photo"]}</Text>*/}
            </Button>
            <Button transparent>
              <Icon active name="chatbubbles" />
              {/*<Text>{data["comments"]} Comments</Text>*/}
            </Button>
            <Text>11h ago</Text>
          </CardItem>
        </Card>
      );
    });
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
          >
            <Icon name="ios-people" />
            <Button style={{ backgroundColor: "#34A34F" }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: "#DD5144" }}>
              <Icon name="mail" />
            </Button>
          </Fab>
          <Tabs class="secondary" style={styles.tabs}>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Icon name="ios-people" style={{ color: "#4b4b4b" }} />
                </TabHeading>
              }
            >
              <View style={{ paddingTop: 4, backgroundColor: "#bdbdbd" }}>
                {badlees}
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Icon
                    name="ios-locate-outline"
                    style={{ color: "#4b4b4b" }}
                  />
                </TabHeading>
              }
            />
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Icon name="ios-globe-outline" style={{ color: "#4b4b4b" }} />
                </TabHeading>
              }
              tabStyle={{ backgroundColor: "red" }}
              textStyle={{ color: "#fff" }}
              activeTabStyle={{ backgroundColor: "red" }}
              activeTextStyle={{ color: "#fff", fontWeight: "normal" }}
            />
          </Tabs>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ user: state.get("user") }),
  actionCreators
)(Store);

export default _Wrapped;
