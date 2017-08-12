/**
 * Chill of the day -
 * There is no shelter from aging and death. Knowing this inevitability, Seek joy instead in the goodness of your actions - Buddha
 * 
 * @author - heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../badlee__redux/action_creators";

import { StyleProvider, Content, Tabs, Tab, Text } from "native-base";
import getTheme from "../theme/components";

import Svg from "react-native-svg";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      initial_tab: 0
    };
  }
  componentDidMount() {}
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Content>
          <Tabs
            initialPage={this.state.initial_tab}
            tabBarUnderlineStyle={{ borderBottomWidth: 0 }}
          >
            <Tab heading="Tab 1" style={styles.mainTab}>
              <Text>Tab 1</Text>
            </Tab>
            <Tab heading="Tab 2" style={styles.mainTab}>
              <Text>Tab 2</Text>
            </Tab>
            <Tab heading="Tab 3" style={styles.mainTab}>
              <Text>Tab 3</Text>
            </Tab>
          </Tabs>
        </Content>
      </StyleProvider>
    );
  }
}

var styles = {};

const _Wrapped = connect(
  state => ({ user: state.get("user") }),
  actionCreators
)(Main);

export default _Wrapped;
