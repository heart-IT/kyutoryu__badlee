"use strict";

import React, { Component } from "react";
import { Image } from "react-native";

class BackgroundImage extends Component {
  render() {
    return (
      <Image
        source={require("../images/welcome__bg.png")}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </Image>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
};

export default BackgroundImage;
