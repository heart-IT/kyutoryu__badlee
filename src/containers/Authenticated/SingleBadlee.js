/**
 * @name- SingleBadlee.js
 * 
 * @chill- Do not seek to follow in the footsteps of the wise ones: seek what they sought- Matsuo Basho
 * 
 * 
 * @description- Single badlee Page
 * 
 * @author- heartit pirates
 */
import moment from "moment";
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Left,
  Right,
  StyleProvider,
  Text,
  Thumbnail,
  View
} from "native-base";
import { Component } from "react";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import Comments from "./Comments";
import User from "./User";

("use strict");

class SingleBadlee extends Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
    this.onClickUser = this._onClickUser.bind(this);
    this.onClickLike = this._onClickLike.bind(this);
    this.onClickUnlike = this._onClickUnlike.bind(this);
    this.onClickWish = this._onClickWish.bind(this);
    this.onClickUnwish = this._onClickUnwish.bind(this);
    this.onClickComment = this._onClickComment.bind(this);
    this.onClickDelete = this._onClickDelete.bind(this);
    this.onClickReport = this._onClickReport.bind(this);
  }
  onBackPress() {
    this.props.goBack();
  }
  _onClickUser() {
    requestAnimationFrame(() => {
      this.props.showUserPage(this.props.badlee.get("user"), {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  _onClickLike() {
    this.props.onClickLike(this.props.badlee.get("id"));
  }
  _onClickUnlike() {
    this.props.onClickUnlike(this.props.badlee.get("id"));
  }
  _onClickWish() {
    this.props.onClickWish(this.props.badlee.get("id"));
  }
  _onClickUnwish() {
    this.props.onClickUnwish(this.props.badlee.get("id"));
  }
  _onClickComment() {
    requestAnimationFrame(() => {
      this.props.showCommentPage(this.props.badlee.get("id"), {
        navigator: this.props.navigator,
        component: Comments
      });
    });
  }
  _onClickDelete() {
    this.props.onClickDelete(this.props.badlee.get("id"));
  }
  _onClickReport() {
    this.props.onClickReport(this.props.badlee.get("id"));
  }
  render() {
    let cardData = this.props.badlee.toJS();
    console.log(cardData);
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left>
              <TouchableOpacity onPress={this.onBackPress}>
                <Icon name="menuBackIcon" width="21" height="21" />
              </TouchableOpacity>
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
                <Left style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={this.onClickUser}
                  >
                    <Thumbnail
                      source={{
                        uri: cardData.user_info.avatar
                      }}
                      style={styles.userAvatar}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text>
                      <Text style={styles.userName} onPress={this.onClickUser}>
                        {cardData.user_info.username}
                      </Text>
                      <Text style={{ fontSize: 14 }}>
                        <Text>'s</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                          {" "}
                          Thingy
                        </Text>
                      </Text>
                      <Text style={{ color: "#616161", fontSize: 14 }}>
                        {" "}
                        {moment(cardData.timestamp).fromNow()}
                      </Text>
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="location"
                        width="14"
                        height="14"
                        fill="#4c6a36"
                      />
                      <Text
                        style={{
                          color: "#616161",
                          fontSize: 12,
                          marginLeft: 2
                        }}
                      >
                        {cardData.location}
                      </Text>
                    </View>
                  </View>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Image
                    source={{ uri: cardData.media }}
                    style={styles.badleeImage}
                  />
                  <Text style={styles.badleeDescription}>
                    {cardData.description}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Left
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {cardData.likes &&
                      cardData.likes.indexOf(this.props.userId) > -1 && (
                        <TouchableOpacity
                          transparent
                          onPress={this.onClickUnlike}
                        >
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
                        <TouchableOpacity
                          transparent
                          onPress={this.onClickUnwish}
                        >
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
                    <TouchableOpacity transparent>
                      <Text
                        style={{
                          fontSize: 14,
                          marginLeft: 4,
                          fontWeight: "bold",
                          color: "rgba(0, 0, 0, 0.73)"
                        }}
                      >
                        {(cardData.wishes ? cardData.wishes.length : 0) +
                          (cardData.likes ? cardData.likes.length : 0)}{" "}
                        reactions{" "}
                      </Text>
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
                          fontSize: 14,
                          marginLeft: 4,
                          fontWeight: "bold",
                          color: "rgba(0, 0, 0, 0.73)"
                        }}
                      >
                        {cardData.comment_count
                          ? `View ${cardData.comment_count}`
                          : 0}{" "}
                        {cardData.comment_count > 1 ? "comments" : "comment"}
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
                  <TouchableOpacity transparent onPress={this.onClickReport}>
                    {cardData.user !== this.props.userId && <Text>report</Text>}
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
  userAvatar: { height: 40, width: 40, marginRight: 6 },
  userName: { fontWeight: "bold", fontSize: 14, color: "rgba(0, 0, 0, 0.87)" },
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
    ]),
    userId: state.getIn(["user", "loggedUserID"])
  }),
  actionCreators
)(SingleBadlee);

export default _Wrapped;
