/**
 * @name- userList.js
 * 
 * @chill- We have to practice letting og of our ideas in order to see life everywhere,,, you are not enlcosed in your small shell of your body or the small shell of your lifespan. -Thich Nhat Hanh
 * 
 * 
 * @description- Component for showing List of user [like in reaction or following page]
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { Text } from "native-base";
import { FlatList } from "react-native";
class UserRow extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  render() {
    return <Text>{this.props.userName}</Text>;
  }
}

export default class UserList extends React.PureComponent {
  state = { following: new Map() };
  _keyExtractor = (item, index) => item.user_id;
  _onPressItem = id => {
    console.log(id);
  };
  _renderItem = ({ item }) => (
    <UserRow
      id={item.user_id}
      onPressItem={this._onPressItem}
      userName={item.name}
    />
  );
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.following}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
