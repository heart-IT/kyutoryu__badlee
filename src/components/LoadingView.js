/**
 * An enemy may do great harm to an enemy, but a wrongly-directed mind will do the greatest mischief unto itself -  Buddha
 * 
 * @name- LoadingView
 * @description- Component for showing loading
 * @author- heartit pirates were here \m/
 */

"use strict";

import React, { Component } from "react";
import { View, Text } from "react-native";
import { Spinner } from "native-base";

class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spinner}>
          <Spinner color="#611265" />
          <Text
            style={{
              color: "rgba(0, 0, 0, 0.87)",
              fontWeight: "bold"
            }}
          >
            {this.props.message ? this.props.message : "Loading badlee"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    opacity: 0.67,
    zIndex: 1040
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default LoadingView;
