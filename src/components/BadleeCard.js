/**
 * @chill- Suffering is only one face of life. Life has another face, the face of wonder. If we can see that face of life, we will have happiness, peace and joy. When our hearts are unfettered, we can make direct contact with the wonders of life. - Thich Nhat Hanh
 * @name- BadleeCard
 * @description- Component for displaying in Badlees List
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
class BadleeCard extends Component {
  render() {
    var cardData = this.props.cardData;
    return (
      <Card
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 6,
          marginTop: 3,
          borderRadius: 0,
          position: "relative"
        }}
      >
        <Icon
          name="shoutOut"
          width="36"
          height="36"
          style={{
            position: "absolute",
            top: 30,
            right: 6,
            zIndex: 9,
            shadowColor: "#000",
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.8,
            shadowRadius: 100,
            width: 36,
            height: 36
          }}
        />
        <CardItem header>
          <Thumbnail
            source={{
              uri: cardData.user_info
                ? cardData.user_info.avatar
                : cardData.media
            }}
            style={{ height: 32, width: 32, marginLeft: 12 }}
          />
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: "bold" }}>
              {cardData.user_info ? (
                cardData.user_info.First_name
              ) : (
                cardData.user.substring(0, 12)
              )}
            </Text>
            <Text>'s</Text>
            <Text style={{ fontWeight: "bold" }}> Thingy</Text>
            <Text style={{ color: "#616161" }}>
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
                fontWeight: "bold",
                fontSize: 12
              }}
            >
              {cardData.location}
            </Text>
            <Text
              style={{
                marginLeft: 12,
                marginTop: 12,
                marginBottom: 6,
                fontWeight: "bold",
                fontSize: 24,
                lineHeight: 36,
                fontStyle: "italic"
              }}
            >
              {cardData.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Left style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="postLiked"
                width="30"
                height="30"
                style={{ marginRight: 3 }}
              />
              <Icon
                name="postWished"
                width="30"
                height="30"
                fill="#EF5454"
                style={{ marginRight: 3 }}
              />
              <Icon name="postComment" width="30" height="30" fill="#fff" />
            </View>
            <View>
              <Text style={{ fontSize: 12, marginLeft: 4 }}>
                View {cardData.comment_count} comments{" "}
              </Text>
            </View>
          </Left>
          <Right>
            <Button transparent>
              <Icon name="postDelete" width="24" height="24" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default BadleeCard;
