/**
 * @name- BadleeCard.js
 * 
 * @chill- Suffering is only one face of life. Life has another face, the face of wonder. If we can see that face of life, we will have happiness, peace and joy. When our hearts are unfettered, we can make direct contact with the wonders of life. - Thich Nhat Hanh
 * 
 * 
 * @description- BadleeCard component
 * 
 * @author- heartit pirates were here
 */
"use strict";
import moment from 'moment';
import { Body, Card, CardItem, Left, Right, Text, Thumbnail, View } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import Icon from './Icon';

class BadleeCard extends React.PureComponent {
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

  _onClickUser = () => {
    this.props.onClickUser(this.props.cardData.user);
  };
  _onClickLike = () => {
    this.props.onClickLike(this.props.cardData.id);
  };
  _onClickUnlike = () => {
    this.props.onClickUnlike(this.props.cardData.id);
  };
  _onClickWish = () => {
    this.props.onClickWish(this.props.cardData.id);
  };
  _onClickUnwish = () => {
    this.props.onClickUnwish(this.props.cardData.id);
  };
  _onClickComment = () => {
    this.props.onClickComment(this.props.cardData.id);
  };
  _onClickBadlee = () => {
    this.props.onClickBadlee(this.props.cardData.id);
  };
  _onClickDelete = () => {
    this.props.onClickDelete(this.props.cardData.id);
  };
  render() {
    let { cardData } = this.props;
    return (
      <Card style={styles.card}>
        {cardData.purpose === "showOff" && (
          <Icon
            name="showoff"
            width="45"
            height="45"
            style={styles.purposeIcon}
          />
        )}
        {cardData.purpose === "shoutOut" && (
          <Icon
            name="shoutout"
            width="36"
            height="36"
            style={styles.purposeIcon}
          />
        )}
        {cardData.purpose === "exchange" && (
          <Icon
            name="exchange"
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
            <Thumbnail
              source={{
                uri: cardData.user_info
                  ? cardData.user_info.avatar
                  : cardData.media
              }}
              style={styles.userAvatar}
            />
            <Text style={styles.userName}>
              {cardData.user_info ? (
                cardData.user_info.username
              ) : (
                cardData.user.substring(0, 12)
              )}
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14 }}>
            <Text>'s</Text>
            <Text style={{ fontWeight: "bold" }}> Thingy</Text>
          </Text>
          <Text style={{ color: "#616161", fontSize: 15 }}>
            {" "}
            {moment(cardData.timestamp).fromNow()}
          </Text>
        </CardItem>
        <CardItem cardBody style={{ flexDirection: "column", marginTop: 2 }}>
          <TouchableOpacity
            transparent
            style={styles.badleeImage}
            onPress={this.onClickBadlee}
          >
            <Image
              source={{ uri: cardData.media }}
              style={styles.badleeImage}
            />
          </TouchableOpacity>
          <Body>
            <Text style={styles.badleeLocation}>{cardData.location}</Text>
            <Text style={styles.badleeDescription} onPress={this.onClickBadlee}>
              {cardData.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer style={{ marginBottom: 12 }}>
          <Left style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              {cardData.likes &&
              cardData.likes.indexOf(this.props.userId) > -1 && (
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
              {(!cardData.likes ||
                (cardData.likes &&
                  cardData.likes.indexOf(this.props.userId) === -1)) && (
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
              {cardData.wishes &&
              cardData.wishes.indexOf(this.props.userId) > -1 && (
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
              {(!cardData.wishes ||
                (cardData.wishes &&
                  cardData.wishes.indexOf(this.props.userId) === -1)) && (
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
                marginTop: 3
              }}
            >
              <TouchableOpacity transparent onPress={this.onClickComment}>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 4,
                    fontWeight: "bold",
                    color: "rgba(0, 0, 0, 0.87)"
                  }}
                >
                  View {cardData.comment_count} comments{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Left>
          <Right>
            <TouchableOpacity transparent onPress={this.onClickDelete}>
              {cardData.user === this.props.userId && (
                <Icon name="postDelete" width="30" height="30" />
              )}
            </TouchableOpacity>
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
    width: 36,
    height: 36
  },
  userAvatar: { height: 32, width: 32, marginLeft: 12, marginRight: 3 },
  userName: { fontWeight: "bold", fontSize: 15, color: "rgba(0, 0, 0, 0.87)" },
  badleeImage: { height: 200, width: "100%", flex: 1, zIndex: 1 },
  badleeLocation: {
    marginLeft: 12,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.87)"
  },
  badleeDescription: {
    marginLeft: 12,
    marginTop: 6,
    marginBottom: 5,
    fontSize: 24,
    lineHeight: 36,
    fontFamily: "Ubuntu-Regular",
    color: "rgba(0, 0, 0, 0.87)"
  }
};

export default BadleeCard;
