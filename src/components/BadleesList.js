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
import React from 'react';
import { Component, PureComponent } from 'react';
import { FlatList } from 'react-native';

import BadleeCard from './BadleeCard';

("use strict");
class Error extends React.Component {
  render() {
    return <Text>Nothing to see here</Text>;
  }
}

class MyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickUser = this._onClickUser.bind(this);
    this.onClickLike = this._onClickLike.bind(this);
    this.onClickUnlike = this._onClickUnlike.bind(this);
    this.onClickWish = this._onClickWish.bind(this);
    this.onClickUnwish = this._onClickUnwish.bind(this);
    this.onClickComment = this._onClickComment.bind(this);
    this.onClickBadlee = this._onClickBadlee.bind(this);
    this.onClickDelete = this._onClickDelete.bind(this);
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
  _onClickComment = (id: string) => {
    this.props.onClickComment(id);
  };
  _onClickBadlee = (id: string) => {
    this.props.onClickBadlee(id);
  };
  _onClickDelete = (id: string) => {
    this.props.onClickDelete(id);
  };
  _renderItem = ({ item }) => (
    <BadleeCard
      cardData={item}
      onClickUser={this.onClickUser}
      onClickLike={this.onClickLike}
      onClickUnlike={this.onClickUnlike}
      onClickWish={this.onClickWish}
      onClickUnwish={this.onClickUnwish}
      onClickComment={this.onClickComment}
      onClickBadlee={this.onClickBadlee}
      onClickDelete={this.onClickDelete}
      title={item.title}
      userId={this.props.userId}
    />
  );
  noItemDisplay() {
    return <Text>Nothing to see here</Text>;
  }
  render() {
    return (
      <FlatList
        ListEmptyComponent={Error}
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
