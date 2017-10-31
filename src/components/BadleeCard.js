/**
 * @name- BadleeCard.js
 * 
 * @chill- Suffering is only one face of life. Life has another face, the face of wonder. If we can see that face of life, we will have happiness, peace and joy. When our hearts are unfettered, we can make direct contact with the wonders of life. - Thich Nhat Hanh
 * 
 * 
 * @description- Badlee Card component
 * 
 * @author- heartit pirates were here
 */
"use strict";
import moment from "moment";
import {
  Body,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Thumbnail,
  View
} from "native-base";
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import Icon from "./Icon";

class BadleeCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickUser = this._onClickUser.bind(this);
    this.onClickLike = this._onClickLike.bind(this);
    this.onClickUnlike = this._onClickUnlike.bind(this);
    this.onClickWish = this._onClickWish.bind(this);
    this.onClickUnwish = this._onClickUnwish.bind(this);
    this.onClickComment = this._onClickComment.bind(this);
    this.onClickReaction = this._onClickReaction.bind(this);
    this.onClickDelete = this._onClickDelete.bind(this);
    this.onClickReport = this._onClickReport.bind(this);
  }
  _onClickUser = () => {
    this.props.onClickUser(this.props.userID);
  };
  _onClickLike = () => {
    this.props.onClickLike(this.props.id, true);
  };
  _onClickUnlike = () => {
    this.props.onClickLike(this.props.id, false);
  };
  _onClickWish = () => {
    this.props.onClickWish(this.props.id, true);
  };
  _onClickUnwish = () => {
    this.props.onClickWish(this.props.id, false);
  };
  _onClickComment = () => {
    this.props.onClickComment(this.props.id);
  };
  _onClickReaction = () => {
    this.props.onClickReaction(this.props.id);
  };
  _onClickDelete = () => {
    this.props.onClickDelete(this.props.id);
  };
  _onClickReport = () => {
    this.props.onClickReport(this.props.id);
  };
  render() {
    let {
      id,
      media,
      purpose,
      userAvatar,
      userName,
      time,
      location,
      description,
      likes,
      wishes,
      commentCount,
      userID,
      loggedUserID,
      isReported
    } = this.props;
    let reactionCount =
      (likes ? likes.length : 0) + (wishes ? wishes.length : 0);
    let userIdLikes = likes ? likes.map(like => like.user_id) : [];
    let userIdWishes = wishes ? wishes.map(like => like.user_id) : [];
    return (
      <Card style={styles.card}>
        {this.props.toShowPurpose && (
          <Icon
            name={purpose}
            width="36"
            height="36"
            style={styles.purposeIcon}
          />
        )}
        <CardItem header>
          <TouchableOpacity
            onPress={this.onClickUser}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Thumbnail source={{ uri: userAvatar }} style={styles.userAvatar} />
            <Text style={styles.userName}>{userName}</Text>
          </TouchableOpacity>
          <Text>
            <Text style={{ fontSize: 15 }}>'s</Text>
            <Text style={{ fontSize: 15 }}> Thingy </Text>
          </Text>
          <Text style={{ color: "#616161", fontSize: 13 }}>
            {moment(time)
              .add({ hours: 5, minutes: 30 })
              .fromNow()}
          </Text>
        </CardItem>
        <CardItem cardBody style={{ flexDirection: "column", marginTop: 3 }}>
          <Image source={{ uri: media }} style={styles.badleeImage} />
          <View
            style={{
              flex: 0,
              width: "100%",
              justifyContent: "flex-start"
            }}
          >
            {location && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 12,
                  marginTop: 6
                }}
              >
                <Icon name="location" width="13" height="13" fill="#4a6934" />
                <Text style={styles.badleeLocation}>{location}</Text>
              </View>
            )}
            <Text style={styles.badleeDescription}>{description}</Text>
          </View>
        </CardItem>
        <CardItem footer style={{ marginBottom: 12 }}>
          <Left style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              {userIdLikes &&
                userIdLikes.indexOf(loggedUserID) > -1 && (
                  <TouchableOpacity transparent onPress={this.onClickUnlike}>
                    <Icon
                      name="postLiked"
                      width="30"
                      height="30"
                      style={{ margin: 3 }}
                      strokeWidth="17"
                    />
                  </TouchableOpacity>
                )}
              {(!userIdLikes ||
                (userIdLikes && userIdLikes.indexOf(loggedUserID) === -1)) && (
                <TouchableOpacity transparent onPress={this.onClickLike}>
                  <Icon
                    name="postUnliked"
                    width="30"
                    height="30"
                    style={{ margin: 3 }}
                    fill="none"
                    stroke="#000"
                    strokeWidth="17"
                  />
                </TouchableOpacity>
              )}
              {userIdWishes &&
                userIdWishes.indexOf(loggedUserID) > -1 && (
                  <TouchableOpacity transparent onPress={this.onClickUnwish}>
                    <Icon
                      name="postWished"
                      width="30"
                      height="30"
                      fill="#EF5454"
                      style={{ margin: 3 }}
                    />
                  </TouchableOpacity>
                )}
              {(!userIdWishes ||
                (userIdWishes &&
                  userIdWishes.indexOf(loggedUserID) === -1)) && (
                <TouchableOpacity transparent onPress={this.onClickWish}>
                  <Icon
                    name="postUnwished"
                    width="30"
                    height="30"
                    style={{ margin: 3 }}
                    fill="none"
                    stroke="#000"
                    strokeWidth="10"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity transparent onPress={this.onClickComment}>
                <Icon
                  name="postComment"
                  width="30"
                  height="30"
                  fill="#fff"
                  style={{ margin: 3 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 3,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 3
                }}
              >
                View:{" "}
              </Text>
              <TouchableOpacity transparent onPress={this.onClickReaction}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  {reactionCount <= 1
                    ? `${reactionCount} reaction`
                    : `${reactionCount} reactions`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity transparent onPress={this.onClickComment}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  ,
                  {commentCount <= 1
                    ? ` ${commentCount} comment`
                    : ` ${commentCount} comments`}
                </Text>
              </TouchableOpacity>
            </View>
          </Left>
          <Right>
            {userID === loggedUserID && (
              <TouchableOpacity transparent onPress={this.onClickDelete}>
                <Icon name="postDelete" width="30" height="30" />
              </TouchableOpacity>
            )}
            {userID !== loggedUserID &&
              !isReported && (
                <TouchableOpacity transparent onPress={this.onClickReport}>
                  <Icon name="report" width="30" height="30" />
                </TouchableOpacity>
              )}
            {userID !== loggedUserID &&
              isReported && (
                <Icon
                  name="report"
                  width="30"
                  height="30"
                  fill="green"
                  stroke="green"
                />
              )}
          </Right>
        </CardItem>
      </Card>
    );
  }
}

var styles = {
  card: {
    position: "relative",
    marginBottom: 3,
    marginTop: 6,
    borderRadius: 0
  },
  purposeIcon: {
    position: "absolute",
    top: 30,
    right: 18,
    zIndex: 9,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 1
  },
  userAvatar: { height: 32, width: 32, marginLeft: 12, marginRight: 3 },
  userName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.87)"
  },
  badleeImage: { width: "100%", zIndex: 1, flex: 0, height: 300 },
  badleeLocation: {
    fontSize: 13,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.87)"
  },
  badleeDescription: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: "Ubuntu-Regular",
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: 12
  }
};

export default BadleeCard;
