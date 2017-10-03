/**
 * @name- SingleBadlee.js
 * 
 * @chill- Do not seek to follow in the footsteps of the wise ones: seek what they sought- Matsuo Basho
 * 
 * 
 * @description- Single Badlee Page
 * 
 * @author- heartit pirates
 */
import moment from 'moment';
import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon as IconX,
    Left,
    Right,
    StyleProvider,
    Text,
    Thumbnail,
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';

("use strict");

class SingleBadlee extends Component {
  render() {
    let cardData = this.props.badlee.toJS();
    console.log(cardData);
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left>
              <IconX name="arrow-back" />
            </Left>
            <Right>
              {cardData.purpose === "showOff" && (
                <Icon name="showoff" width="39" height="39" />
              )}
              {cardData.purpose === "shoutOut" && (
                <Icon name="shoutout" width="33" height="33" />
              )}
              {cardData.purpose === "exchange" && (
                <Icon name="exchange" width="33" height="33" />
              )}
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Card style={styles.card}>
              <CardItem header>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Thumbnail
                    source={{
                      uri: cardData.user_info.avatar
                    }}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.userName}>
                    {cardData.user_info.username}
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
              <CardItem cardBody style={{ flexDirection: "column" }}>
                <Image
                  source={{ uri: cardData.media }}
                  style={styles.badleeImage}
                />
                <Body>
                  <Text style={styles.badleeLocation}>{cardData.location}</Text>
                  <Text style={styles.badleeDescription}>
                    {cardData.description}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer style={{ marginBottom: 12 }}>
                <Left
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {cardData.likes &&
                    cardData.likes.indexOf(this.props.userId) > -1 && (
                      <TouchableOpacity transparent>
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
                      <TouchableOpacity transparent>
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
                      <TouchableOpacity transparent>
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
                      <TouchableOpacity transparent>
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
                    <TouchableOpacity transparent>
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
                    <TouchableOpacity transparent>
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
                  <TouchableOpacity transparent>
                    {cardData.user === this.props.userId && (
                      <Icon name="postDelete" width="30" height="30" />
                    )}
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

var styles = {
  card: {
    position: "relative",
    marginBottom: 3,
    marginTop: 6,
    borderRadius: 0,
    flex: 1
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
  badleeImage: { height: 200, width: "100%", zIndex: 1 },
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

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    badlee: state.getIn([
      "badlees",
      "data",
      state.getIn(["badlees", "currentShowing"])
    ])
  }),
  actionCreators
)(SingleBadlee);

export default _Wrapped;
