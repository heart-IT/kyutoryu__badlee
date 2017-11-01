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
    this.onClickReaction = this._onClickReaction.bind(this);
    this.onFlatListRefresh = this._onFlatListRefresh.bind(this);
    this.onListEnd = this._onListEnd.bind(this);
    this.onClickReport = this._onClickReport.bind(this);
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
  _onClickReaction = id => {
    this.props.onClickReaction(id);
  };
  _onClickDelete = id => {
    console.log("list delete");
    this.props.onClickDelete(id);
  };
  _onClickReport = id => {
    this.props.onClickReport(id);
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
      let isItemReport = this.props.reports.filter(report => {
        if (
          report.report_type === "badlee" &&
          report.report_id == item.id &&
          report.user == this.props.loggedUserID
        ) {
          return true;
        }
      });
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
          isReported={!!isItemReport.length}
          toShowPurpose={this.props.toShowPurpose}
          commentCount={item.comment_count}
          userID={item.user_info.user_id}
          loggedUserID={this.props.loggedUserID}
          onClickUser={this.onClickUser}
          onClickLike={this.onClickLike}
          onClickWish={this.onClickWish}
          onClickReport={this.onClickReport}
          onClickReaction={this.onClickReaction}
          onClickComment={this.onClickComment}
          onClickDelete={this.onClickDelete}
        />
      );
    } else {
      return (
        <BadleeGridItem
          id={item.id}
          media={item.media}
          purpose={item.purpose}
          toShowPurpose={this.props.toShowPurpose}
          _onClickBadlee={this.props.onClickBadlee}
        />
      );
    }
  };

  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        numColumns={this.props.type === "card" ? 1 : 4}
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
