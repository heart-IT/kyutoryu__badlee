"use strict";

import React, { Component } from "react";
import { Image, StyleSheet, ListView } from "react-native";
import moment from "moment";

import {
  StyleProvider,
  Content,
  View,
  Text,
  Tabs,
  Tab,
  TabHeading,
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
import * as actionCreators from "../../badlee__redux/action_creators";
import NewBadlee from "./NewBadlee";

import { dummy__badleeList } from "../../fixtures";
import Icon from "../../components/Icon";

let request_url = "http://mri2189.badlee.com/posts.php";

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#fff"
  },
  fab: {
    backgroundColor: "#5067FF"
  }
});

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
      badlees: dummy__badleeList,
      dataSource: ds.cloneWithRows(dummy__badleeList),
      fabActive: "false"
    };
  }

  componentDidMount() {
    var myInit = {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(request_url, myInit).then(response => {
      if (response.status === 200) {
        var json = response.text();
      }
    });
  }

  letsExchange() {
    console.log("who am i?");
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee
      });
    });
    // requestAnimationFrame(() => {
    //   this.props.navigate({
    //     navigator: this.props.navigator,
    //     component: Login
    //   });
    // });
  }

  render() {
    function badlee(data) {
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
    }
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Fab
            active={this.state.fabActive}
            direction="up"
            position="bottomRight"
            style={{ zIndex: 9999, backgroundColor: "none" }}
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}
          >
            <Image
              source={require("../../images/badlee.png")}
              style={{ width: 56, height: 56 }}
            />
            <Button
              style={{
                backgroundColor: "#94c655",
                width: 40,
                height: 40,
                zIndex: 9999
              }}
              onPress={this.letsExchange.bind(this)}
            >
              <Icon
                name="exchange"
                viewBox="0 0 60 60"
                width="25"
                height="25"
              />
            </Button>
            <Button
              style={{
                backgroundColor: "#3B5998",
                width: 40,
                height: 40
              }}
            >
              <Image
                source={require("../../images/show off 2.png")}
                style={{ width: 40, height: 40 }}
              />
            </Button>
            <Button
              style={{
                backgroundColor: "#428ee2",
                width: 40,
                height: 40
              }}
            >
              <Icon
                name="shoutout"
                viewBox="0 0 60 60"
                width="25"
                height="25"
              />
            </Button>
          </Fab>
          <View style={{ flex: 1 }}>
            <Tabs class="secondary">
              <Tab
                heading={
                  <TabHeading
                    style={{ backgroundColor: "#fff", paddingLeft: "12%" }}
                  >
                    <Icon
                      name="community"
                      viewBox="0 0 60 60"
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
                  renderRow={data => badlee(data)}
                />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#fff" }}>
                    <Icon
                      name="location"
                      viewBox="0 0 60 60"
                      height="27"
                      width="27"
                    />
                  </TabHeading>
                }
              />
              <Tab
                heading={
                  <TabHeading
                    style={{ backgroundColor: "#fff", paddingRight: "12%" }}
                  >
                    <Icon
                      name="globe"
                      viewBox="0 0 485.215 485.215"
                      height="27"
                      width="27"
                    />
                  </TabHeading>
                }
                tabStyle={{ backgroundColor: "red" }}
                textStyle={{ color: "#fff" }}
                activeTabStyle={{ backgroundColor: "red" }}
                activeTextStyle={{ color: "#fff", fontWeight: "normal" }}
              />
            </Tabs>
          </View>
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
