/**
 * name- BadleeGrid.js
 * 
 * @chill- Heaven, earth, and I are of one root. We are of the same essence. -Seng-chao
 * 
 * 
 * @description- Badlee Grid component
 * 
 * @author- heartit pirates were here
 */
import { PureComponent } from 'react';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import Icon from './Icon';

("use strict");

class BadleeGridItem extends React.PureComponent {
  _onPress = () => {
    this.props._onClickBadlee(this.props.id);
  };

  render() {
    let _this = this;
    function returnIcon(name, width = 24, height = 24) {
      return (
        <Icon
          name={name}
          width={width}
          height={height}
          style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
        />
      );
    }
    return (
      <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={this._onPress}>
          {returnIcon(this.props.purpose.toLowerCase())}
          <Image
            source={{ uri: this.props.media }}
            resizeMode={"cover"}
            style={{
              flex: 1,
              alignSelf: "stretch",
              width: 84,
              height: 84,
              margin: 3
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default class BadleesGrid extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;
  _onClickBadlee = id => {
    this.props.onClickBadlee(id);
  };
  _renderItem = ({ item }) => (
    <BadleeGridItem
      id={item.id}
      media={item.media}
      purpose={item.purpose}
      _onClickBadlee={this._onClickBadlee}
    />
  );
  render() {
    return (
      <FlatList
        data={this.props.data}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "stretch",
          flexWrap: "wrap",
          paddingBottom: 108,
          paddingTop: 12
        }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
