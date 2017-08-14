/**
 * Chill of the day -
 * There can be no comparison: nothing exists that is able to reverse itself as quickly as the mind.
 * - Buddha
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../badlee__redux/action_creators";

import {
  StyleProvider,
  Content,
  View,
  Tabs,
  Tab,
  TabHeading,
  Text
} from "native-base";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";

class Badless extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              height: 42,
              width: 270,
              marginLeft: "auto",
              marginRight: "auto",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              marginBottom: 10,
              elevation: 2,
              position: "relative"
            }}
          >
            <Tabs
              tabBarUnderlineStyle={{
                bottom: 12,
                width: 42,
                height: 3,
                borderRadius: 12,
                marginLeft: 29
              }}
            >
              <Tab
                heading={
                  <TabHeading
                    style={{
                      height: 42,
                      width: 100,
                      flex: 0,
                      paddingLeft: 12,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Icon
                      name="community"
                      viewBox="0 0 60 60"
                      height="27"
                      width="27"
                      padding="0"
                    />
                  </TabHeading>
                }
              />
              <Tab
                heading={
                  <TabHeading
                    style={{
                      height: 42,
                      width: 100,
                      flex: 0,
                      padding: 0,
                      paddingLeft: 8,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Icon
                      name="location"
                      viewBox="0 0 60 60"
                      height="21"
                      width="21"
                    />
                  </TabHeading>
                }
              />

              <Tab
                heading={
                  <TabHeading
                    style={{
                      height: 42,
                      width: 100,
                      flex: 0,
                      padding: 0,
                      paddingLeft: 8,
                      backgroundColor: "#fff"
                    }}
                  >
                    <Icon
                      name="globe"
                      viewBox="0 0 485 485"
                      height="21"
                      width="21"
                    />
                  </TabHeading>
                }
              />
            </Tabs>
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Text>Wow</Text>
          </View>
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ user: state.get("user") }),
  actionCreators
)(Badless);

export default _Wrapped;
