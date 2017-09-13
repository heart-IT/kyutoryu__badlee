/**
 * @name- BadleesList.js
 * 
 * @chill- Rather than love, than money, than fame, give me truth- Henry David Thoreau
 * 
 * 
 * @description- Component for display list of Badlees
 * 
 * @author- heartit pirates were here
 */

"use strict";
import React from "react";
import { FlatList } from "react-native";

import BadleeCard from "./BadleeCard";

class MyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickUser = this._onClickUser.bind(this);
    this.onClickLike = this._onClickLike.bind(this);
    this.onClickUnlike = this._onClickUnlike.bind(this);
    this.onClickWish = this._onClickWish.bind(this);
    this.onClickUnwish = this._onClickUnwish.bind(this);
  }
  _keyExtractor = (item, index) => item.id;
  _onClickUser = (id: string) => {
    this.props.onClickUser(id);
  };
  _onClickLike = (id: string) => {
    this.props.onClickLike(id);
  };
  _onClickUnlike = (id: string) => {
    this.props.onClickUnlike(id);
  };
  _onClickWish = (id: string) => {
    this.props.onClickWish(id);
  };
  _onClickUnwish = (id: string) => {
    this.props.onClickUnwish(id);
  };
  _renderItem = ({ item }) => (
    <BadleeCard
      cardData={item}
      onClickUser={this.onClickUser}
      onClickLike={this.onClickLike}
      onClickUnlike={this.onClickUnlike}
      onClickWish={this.onClickWish}
      onClickUnwish={this.onClickUnwish}
      title={item.title}
      userId={this.props.userId}
    />
  );
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{ backgroundColor: "#d9d9d9" }}
      />
    );
  }
}

export default MyList;
