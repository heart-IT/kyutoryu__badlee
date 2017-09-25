/**
 * An enemy may do great harm to an enemy, but a wrongly-directed mind will do the greatest mischief unto itself -  Buddha
 * 
 * @name- LoadingView
 * @description- Component for showing loading
 * @author- heartit pirates were here \m/
 */
import { Spinner } from 'native-base';
import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';

("use strict");

class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spinner}>
          <Spinner color="#611265" />
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
    opacity: 0.23,
    zIndex: 1040
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default LoadingView;
