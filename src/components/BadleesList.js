/**
 * @name- BadleesList
 * @description- Component for display List of Badlees
 * @author- heartit pirates
 */

"use strict";
import React from "react";
import { FlatList } from "react-native";
import { Map, toJS } from "immutable";

import BadleeCard from "./BadleeCard";

class MyList extends React.PureComponent {
  state = { selected: (new Map(): Map<string, boolean>) };
  _keyExtractor = (item, index) => item.id;
  _onPressItem = (id: string) => {
    this.setState(state => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return selected;
    });
  };
  _renderItem = ({ item }) => (
    <BadleeCard
      cardData={item}
      onPressItem={this._onPressItem}
      title={item.title}
    />
  );
  render() {
    var data = this.props.data.toJS();
    return (
      <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{ backgroundColor: "#d9d9d9" }}
      />
    );
  }
}

export default MyList;
