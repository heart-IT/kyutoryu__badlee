/**
 * @name- notification_comp.js
 * 
 * @chill- We know so little about so much. -Christopher Organ
 * 
 * 
 * @description- Component for showing Notifications
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { Text } from "native-base";

class NotificationItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  render() {
    return <Text>lol</Text>;
  }
}

export default class NotificationList extends React.PureComponent {
  state = { selected: new Map() };
  _keyExtractor = (item, index) => item.id;
  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };
  _renderItem = ({ item }) => (
    <NotificationItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
    />
  );
  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
