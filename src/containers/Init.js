/**
 * @name- init.js
 * 
 * @chill- Two monks were arguing about a flag. One said, "The flag is moving." The other said, "The wind is moving."
 * Their teacher happened to be passing by. He told them, "Not the wind, not the flag; It is your mind that is moving." - Mumon Ekai
 * 
 * 
 * @description- This file is starting point of badlee App. Here, we take initial calm steps needed to start the app like cheking auth,
 * redirecting user to right place.
 * 
 * @author- heartit pirates were here.
 * 
 * @todo- 1. Onboarding only comes first time.
 */
import { Container, Content, StyleProvider } from "native-base";
import { Component } from "react";
import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../badlee__redux/action_creators";
import getTheme from "../theme/components";
import Loading from "./../components/LoadingView";
import BadleeAuthApp from "./Authenticated/goingMerry";
import Onboarding from "./Not__Authenticated/onboarding";

("use strict");

class Init extends Component {
  componentDidMount() {
    const navigator = this.props.navigator;
    let route = {
      navigator: this.props.navigator,
      component: {
        authenticated: {
          component: BadleeAuthApp
        },
        not__authenticated: {
          component: Onboarding
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
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} />
          {loading && <Loading />}
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({ loading: state.getIn(["application", "isLoading"]) }),
  actionCreators
)(Init);
export default _Wrapped;
