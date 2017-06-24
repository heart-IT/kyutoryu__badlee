/**
 * High are the mountains, thick are the shade trees, and under an old pine I sit quietly and contentedly in my monkish home:
 * Perfect tranquility and rustic simplicity rules here. - Yoka Daishi
 * 
 * 
 * This file is the first thing happens to badlee.
 * we do all lots of react and redux configuration and start up our app.
 * Here, we go
 * 
 * @author- heartit pirates were here.
 */

"use strict";

import React, { Component } from "react";
import { View, StyleSheet, BackHandler, StatusBar } from "react-native";
import { Drawer } from "native-base";
import { makeStore } from "./store";
import { connect, Provider } from "react-redux";
import * as actionCreators from "./action_creators";
import SplashScreen from "./containers/static/SplashScreen";
import SideBar from "./components/sidebar";
import { Navigator } from "react-native-deprecated-custom-components";

/**
 * Backhandler : Detect hardware button presses for back navigation
 * Navigator handles the transition between different scenes in your app.
 * Transition back and unmount the current scene.
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
  // Function to open Sidebar drawer
  openSidebar() {
    this._drawer._root.open();
  }

  // Function to close Sidebar
  closeSidebar() {
    this._drawer._root.close();
  }

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
        // Put drawer, Open Sidebar Component in it.
        <Drawer
          ref={ref => {
            this._drawer = ref;
          }}
          content={
            <SideBar
              navigator={navigator}
              closeSidebar={this.closeSidebar.bind(this)}
            />
          }
          onClose={() => this.closeSidebar()}
        >
          {/*Our Main Content View*/}
          <View style={styles.main}>
            <StatusBar
              hidden={route.statusBarHidden}
              barStyle="light-content"
            />
            <Component
              navigator={navigator}
              style={styles.content}
              openSidebar={this.openSidebar.bind(this)}
              closeSidebar={this.closeSidebar.bind(this)}
              params={params}
            />
          </View>
        </Drawer>
      );
    }
  }

  /**
   * Render Badlee App with our Redux store provider. 
   * Initial Route is SplashScreen.
   */
  render() {
    return (
      <Provider store={store}>
        <Navigator
          ref={nav => {
            scopeNavigator = nav;
          }}
          initialRoute={{ component: SplashScreen }}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={this.renderScene.bind(this)}
        />
      </Provider>
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
