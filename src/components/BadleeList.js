/**
 * @name- BadleeList
 * 
 * @chill- You never enjoy the world aright, till the sea itself floweth in your veins, till you are clothed with the heavens and crowned with the stars- Till your spirit filleth the whole world.- Thomas Traherne
 * 
 * @chill- Rather than love, than money, than fame, give me truth- Henry David Thoreau
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
      return (
        <BadleeCard
          id={item.id}
          media={item.media}
          purpose={item.purpose}
          userAvatar={item.user_info.avatar}
          userName={item.user_info.username}
          time={item.timestamp}
          location={item.location}
          description={item.description}
          likes={item.likes}
          wishes={item.wishes}
          commentCount={item.comment_count}
          userID={item.user}
          loggedUserID={this.props.loggedUserID}
        />
      );
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
