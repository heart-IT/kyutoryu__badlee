/**
 * @chill- Two monks were arguing about a flag. One said, "The flag is moving." The other said, "The wind is moving." Their teacher happened to be passing by. He told them, "Not the wind, not the flag; It is your mind that is moving." - Mumon Ekai
 * 
 * @description- This file is starting point of react components. Here, we define the initial calm steps needed to start the app
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleProvider, Content } from "native-base";
import * as actionCreators from "../badlee__redux/action_creators";
import getTheme from "../theme/components";

import Welcome from "./Not__Authenticated/Welcome";
// import Main from "./Authenticated/Main";
import Loading from "./../components/LoadingView";

class Init extends Component {
  componentDidMount() {
    const navigator = this.props.navigator;
    let route = {
      navigator: this.props.navigator,
      component: {
        authenticated: {
          component: Welcome
        },
        not__authenticated: {
          component: Welcome
        }
      }
    };
    this.props.setNavigator(navigator);
    this.props.restoreAuth(route);
  }
  render() {
    const { loading } = this.props;
    return (
      <StyleProvider style={getTheme()}>
        <Content
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {loading && <Loading />}
        </Content>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(Init);
export default _Wrapped;
