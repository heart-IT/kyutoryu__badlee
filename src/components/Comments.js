/**
 * @name- Comments.js
 * 
 * @chill- Men concern themselves most about that which passes away- They are like a blind man set to look after a burning lamp- Buddha
 * 
 * 
 * @description- Comments Flatlist component
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { Text } from "native-base";

export default class Comments extends PureComponent {
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => <Comment id={item.id} title={item.title} />;
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

class Comment extends PureComponent {
  render() {
    return <Text>{this.props.title}</Text>;
  }
}
