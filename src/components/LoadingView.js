/**
 * An enemy may do great harm to an enemy, but a wrongly-directed mind will do the greatest mischief unto itself -  Buddha
 * 
 * 
 */

"use strict";

import React, { Component } from "react";
import { View } from "react-native";
import { Spinner } from "native-base";

class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner color="#9C27B0" style={styles.spinner} />
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
    backgroundColor: "#CCC",
    opacity: 0.5,
    zIndex: 9999
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default LoadingView;
