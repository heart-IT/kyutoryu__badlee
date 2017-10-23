/**
 * @name- BadleeList
 * 
 * @chill- You never enjoy the world aright, till the sea itself floweth in your veins, till you are clothed with the heavens and crowned with the stars- Till your spirit filleth the whole world.- Thomas Traherne
 * 
 * 
 * @description- Component for showing Badlees in ListView
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import BadleeCard from "./BadleeCard";
import BadleeGridItem from "./BadleesGrid";
class BadleeList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => {
    if (this.props.type === "card") {
      return <BadleeCard id={item.id} cardData={item} />;
    } else {
      return (
        <BadleeGridItem
          id={item.id}
          media={item.media}
          purpose={item.purpose}
          toShowPurpose={this.props.toShowPurpose}
        />
      );
    }
  };

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

export default BadleeList;
