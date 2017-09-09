/**
 * @chill- Suffering is only one face of life. Life has another face, the face of wonder. If we can see that face of life, we will have happiness, peace and joy. When our hearts are unfettered, we can make direct contact with the wonders of life. - Thich Nhat Hanh
 * @name- BadleeCard
 * @description- Component for displaying in Badlees List. Must be pure component
 * @author- heartit pirates
 */
"use strict";

import React, { Component } from "react";
import { Image } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Body,
  View,
  Left,
  Right,
  Button
} from "native-base";
import moment from "moment";

import Icon from "./Icon";
class BadleeCard extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };
  _onClickUser = () => {
    this.props.onClickUser(this.props.cardData.user);
  };
  _onClickLike = () => {
    console.log(this.props.onClickLike);
    this.props.onClickLike(this.props.cardData.user);
  };
  _onLikePress = () => {};
  render() {
    var cardData = this.props.cardData;
    return (
      <Card
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 3,
          marginTop: 6,
          borderRadius: 0,
          position: "relative"
        }}
      >
        {cardData.purpose === "give away" && (
          <Icon
            name="exchange"
            width="36"
            height="36"
            style={styles.purposeIcon}
          />
        )}
        {cardData.purpose === "showOff" && (
          <Icon
            name="showOff"
            width="36"
            height="36"
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
          <Thumbnail
            source={{
              uri: cardData.user_info
                ? cardData.user_info.avatar
                : cardData.media
            }}
            style={{ height: 32, width: 32, marginLeft: 12, marginRight: 3 }}
          />
          <Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 15 }}
              onPress={this._onClickUser}
            >
              {cardData.user_info ? (
                cardData.user_info.username
              ) : (
                cardData.user.substring(0, 12)
              )}
            </Text>
            <Text style={{ fontSize: 15 }}>'s</Text>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}> Thingy</Text>
            <Text style={{ color: "#616161", fontSize: 15 }}>
              {" "}
              {moment(cardData.timestamp).fromNow()}
            </Text>
          </Text>
        </CardItem>
        <CardItem cardBody style={{ flexDirection: "column", marginTop: 2 }}>
          <Image
            source={{ uri: cardData.media }}
            style={{ height: 200, width: "100%", flex: 1, zIndex: 1 }}
          />
          <Body>
            <Text
              style={{
                marginLeft: 12,
                marginTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.87)"
              }}
            >
              {cardData.location}
            </Text>
            <Text
              style={{
                marginLeft: 12,
                marginTop: 6,
                marginBottom: 5,
                fontSize: 24,
                lineHeight: 36,
                fontFamily: "Ubuntu-Regular",
                color: "rgba(0, 0, 0, 0.87)"
              }}
            >
              {cardData.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer style={{ marginBottom: 12 }}>
          <Left style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Button transparent onPress={this._onClickLike.bind(this)}>
                <Icon
                  name="postUnliked"
                  width="30"
                  height="30"
                  style={{ marginRight: 3 }}
                  fill="none"
                  stroke="#000"
                  strokeWidth="17"
                />
              </Button>
              <Icon
                name="postWished"
                width="30"
                height="30"
                fill="#EF5454"
                style={{ marginRight: 3 }}
              />
              <Icon name="postComment" width="30" height="30" fill="#fff" />
            </View>
            <View
              style={{
                marginTop: 3
              }}
            >
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
            </View>
          </Left>
          <Right>
            <Button transparent>
              <Icon name="postDelete" width="30" height="30" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

var styles = {
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
  }
};

export default BadleeCard;
