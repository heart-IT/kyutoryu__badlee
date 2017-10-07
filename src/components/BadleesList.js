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
    this.onFlatListRefresh = this._onFlatListRefresh.bind(this);
    this.handleMore = this._handleMore.bind(this);
  }
  _keyExtractor = (item, index) => item.id;
  _onClickUser = id => {
    this.props.onClickUser(id);
  };
  _onClickLike = id => {
    this.props.onClickLike(id);
  };
  _onClickUnlike = id => {
    this.props.onClickUnlike(id);
  };
  _onClickWish = id => {
    this.props.onClickWish(id);
  };
  _onClickUnwish = id => {
    this.props.onClickUnwish(id);
  };
  _onClickComment = id => {
    this.props.onClickComment(id);
  };
  _onClickBadlee = id => {
    this.props.onClickBadlee(id);
  };
  _onClickDelete = id => {
    this.props.onClickDelete(id);
  };
  _onFlatListRefresh() {
    this.props.onFlatListRefresh();
  }
  _handleMore() {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.onListEnd();
      this.onEndReachedCalledDuringMomentum = true;
    }
  }
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
        refreshing={false}
        onRefresh={this.onFlatListRefresh}
        onEndReached={this.handleMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
      />
    );
  }
}

export default MyList;
