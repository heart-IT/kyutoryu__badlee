// @flow
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Content,
  Text,
  Tab,
  Tabs,
  TabHeading,
  Icon
} from "native-base";
import Toolbar from "../../components/toolbar";
import getTheme from "../../theme/components";
import * as actionCreators from "../../action_creators";
import type { State } from "../../types";

class Main extends Component {
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Toolbar
          title={"Badlee"}
          navigator={this.props.navigator}
          openSidebar={this.props.openSidebar}
        >
          <Content>
            <Tabs initialPage={0}>
              <Tab
                heading={
                  <TabHeading>
                    <Icon name="ios-people" />
                  </TabHeading>
                }
              >
                <Text>Hello world</Text>
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
              />
            </Tabs>
          </Content>
        </Toolbar>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Main);

export default _Wrapped;
