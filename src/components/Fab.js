/**
 * @chill- Behave with great virtue, and others who see you will be inspired to do the same.- Buddha
 * @name- Fab
 * @description- Fab component
 * @author- heartit pirates were here
 */

"use strict";
import React, { Component } from "react";
import { Image, Button, View } from "react-native";
import { Fab } from "native-base";
import Icon from "./Icon";

export default class BadleeFab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive ? this.props.isActive : false,
      direction: this.props.direction ? this.props.direction : "up",
      position: this.props.position ? this.props.position : "bottomRight"
    };
  }
  fabClicked() {
    this.setState({ isActive: !this.state.isActive });
    // this.props.onToggle(this.state.isActive);
  }
  onlendAndBorrowClick() {
    this.props.onSelection("exchange");
  }
  onshowOffClick() {
    this.props.onSelection("showOff");
  }
  onshoutOutClick() {
    this.props.onSelection("shoutOut");
  }
  render() {
    return (
      <Fab
        active={this.state.isActive}
        direction={this.state.direction}
        position={this.state.position}
        onPress={this.fabClicked.bind(this)}
        style={{ backgroundColor: "transparent", zIndex: 1001 }}
      >
        <Image
          source={require("../images/badlee.png")}
          style={{ width: 56, height: 56 }}
        />
        <Button
          title="lend and borrow"
          onPress={this.onlendAndBorrowClick.bind(this)}
          style={{
            backgroundColor: "#94C655",
            width: 40,
            height: 40,
            zIndex: 1001
          }}
        >
          <Icon name="exchange" width="40" height="40" />
        </Button>
        <Button
          title="show off"
          onPress={this.onshowOffClick.bind(this)}
          style={{
            backgroundColor: "transparent",
            width: 40,
            height: 40,
            zIndex: 1001
          }}
        >
          <Image
            source={require("../images/show off 2.png")}
            style={{ width: 40, height: 40 }}
          />
        </Button>
        <Button
          title="shout out"
          onPress={this.onshoutOutClick.bind(this)}
          style={{
            backgroundColor: "#418EE2",
            width: 40,
            height: 40,
            zIndex: 1001
          }}
        >
          <Icon name="shoutout" width="40" height="40" />
        </Button>
      </Fab>
    );
  }
}
