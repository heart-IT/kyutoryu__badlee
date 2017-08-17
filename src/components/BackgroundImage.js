"use strict";

import React, { Component } from "react";
import { Image, Text } from "react-native";

class BackgroundImage extends Component {
  render() {
    let image = require("../images/" + this.props.backgroundName + ".png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>
          {this.props.src}
        </Text>
        {this.props.children}
      </Image>
    );
  }
}

const styles = {
  backgroundImage: {
    display: "flex",
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
};

export default BackgroundImage;
