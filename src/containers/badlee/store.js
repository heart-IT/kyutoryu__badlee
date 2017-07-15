"use strict";

import React, { Component } from "react";
import Image from "react-native";
import Moment from "moment";
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
  Button
} from "native-base";
import { connect } from "react-redux";
import getTheme from "../../theme/components";
import * as actionCreators from "../../action_creators";

import { dummy__badleeList } from "../../fixtures";

let request_url = "http://mri2189.badlee.com/posts.php";

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

  componentDidMount() {}

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
            marginLeft: 12,
            marginRight: 12,
            marginBottom: 4,
            marginTop: 2
          }}
          key={data["id"]}
        >
          <CardItem header>
            <Left>
              <Thumbnail source={{ uri: "../images/brook.jpg" }} />
              <Body>
                <Text>
                  {data["user"]}
                </Text>
                <Text>
                  {data["description"]}
                </Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem cardBody>
            {/*<Image
              source={{ uri: "../../images/luffy.png" }}
              style={{ height: 200, width: null, flex: 1 }}
            />*/}
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
          <Tabs style={{ backgroundColor: "#fff" }}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-people" />
                </TabHeading>
              }
              tabStyle={{ backgroundColor: "#fff" }}
            >
              <View style={{ paddingTop: 4 }}>
                {badlees}
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-locate-outline" />
                </TabHeading>
              }
            />
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-globe-outline" />
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
