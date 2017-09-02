/**
 * @name- app.js
 * 
 * @chill- High are the mountains, thick are the shade trees, and under an old pine I sit quietly and contentedly in my monkish home:
 * Perfect tranquility and rustic simplicity rules here. - Yoka Daishi
 * 
 * 
 * @description- This file is the first thing happens to badlee.
 * we combine redux and our react app with navigator and start Badlee app.
 * Here, we go!
 * 
 * @author- heartit pirates were here.
 */

"use strict";

import React, { Component } from "react";
import { View, StyleSheet, BackHandler, StatusBar } from "react-native";
import { connect, Provider } from "react-redux";
import { Navigator } from "react-native-deprecated-custom-components";
import { Root } from "native-base";
import { makeStore } from "./badlee__redux/store";
import * as actionCreators from "./badlee__redux/action_creators";

import Init from "./containers/init";

/**
 * Navigator handles the transition between different scenes in your app.
 * Transition back and unmount the current scene.
 * @description- on backpress button in mobile, show previous route
 */
BackHandler.addEventListener("hardwareBackPress", function() {
  // If scopeNavigator and it has routes information
  if (scopeNavigator && scopeNavigator.getCurrentRoutes().length > 1) {
    // unmount current screen and go to previous scene
    scopeNavigator.pop();
    return true;
  }
  return false;
});

class BadleeApp extends Component {
  /**
   * Function that navigator uses to render the scene for a given route.
   * @param {*} route 
   * @param {*} navigator 
   */
  renderScene(route, navigator) {
    let params = {};
    let Component = route.component;

    if (route.params) {
      params = route.params;
    }

    if (route.component) {
      return (
        <View style={styles.main}>
          <StatusBar hidden={route.statusBarHidden} />
          <Component
            navigator={navigator}
            style={styles.content}
            params={params}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <Root>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#500655" barStyle="light-content" />
            <Navigator
              ref={nav => {
                scopeNavigator = nav;
              }}
              initialRoute={{ component: Init }}
              configureScene={() => {
                return Navigator.SceneConfigs.FloatFromRight;
              }}
              renderScene={this.renderScene.bind(this)}
            />
          </View>
        </Provider>
      </Root>
    );
  }
}

let store = makeStore();
let scopeNavigator;
let styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column"
  }
});

export default BadleeApp;
