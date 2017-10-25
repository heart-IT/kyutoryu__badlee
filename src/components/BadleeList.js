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

  constructor(props) {
    super(props);
    this.onClickUser = this._onClickUser.bind(this);
    this.onClickLike = this._onClickLike.bind(this);
    this.onClickWish = this._onClickWish.bind(this);
    this.onClickComment = this._onClickComment.bind(this);
    this.onClickDelete = this._onClickDelete.bind(this);
    this.onFlatListRefresh = this._onFlatListRefresh.bind(this);
    this.onListEnd = this._onListEnd.bind(this);
  }
  _onClickUser = id => {
    this.props.onClickUser(id);
  };
  _onClickLike = (id, didLike) => {
    this.props.onClickLike(id, didLike);
  };
  _onClickWish = (id, didWish) => {
    this.props.onClickWish(id, didWish);
  };
  _onClickComment = id => {
    this.props.onClickComment(id);
  };
  _onClickDelete = id => {
    this.props.onClickDelete(id);
  };
  _onFlatListRefresh() {
    this.props.onFlatListRefresh();
  }
  _onListEnd() {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.onListEnd();
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

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
          onClickUser={this.onClickUser}
          onClickLike={this.onClickLike}
          onClickWish={this.onClickWish}
          onClickComment={this.onClickComment}
          onClickDelete={this.onClickDelete}
        />
      );
    } else {
      console.log("hey");
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
        numColumns={4}
        renderItem={this._renderItem}
        style={{ backgroundColor: "#eeeeee" }}
        onRefresh={this.onFlatListRefresh}
        onEndReached={this.onListEnd}
        refreshing={false}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
      />
    );
  }
}

export default BadleeList;
