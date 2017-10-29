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

"use strict";

import {
  Container,
  Content,
  Header,
  Left,
  Right,
  StyleProvider
} from "native-base";
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import Comments from "./comments";
import User from "./user";
import BadleeCard from "../../components/BadleeCard";
import Reactions from "./reactions";
import Picker from "../../components/Picker";

class SingleBadlee extends Component {
  state = {
    showPicker: false
  };
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickWish = this.onClickWish.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickReaction = this.onClickReaction.bind(this);
    this.onClickReport = this.onClickReport.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.onPickerSubmit = this.onPickerSubmit.bind(this);
  }
  onBackPress() {
    this.props.goBack();
  }
  onClickUser(id) {
    requestAnimationFrame(() => {
      this.props.showUserPage(id, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }

  onClickLike(id, didLike) {
    didLike ? this.props.onClickLike(id) : this.props.onClickUnlike(id);
  }
  onClickWish(id, didWish) {
    didWish ? this.props.onClickWish(id) : this.props.onClickUnwish(id);
  }
  onClickComment(id) {
    requestAnimationFrame(() => {
      this.props.showCommentPage(id, {
        navigator: this.props.navigator,
        component: Comments
      });
    });
  }
  onClickDelete(id) {}
  onClickReport(id) {
    this.setState({
      showPicker: true,
      type: "report",
      badleeId: id
    });
  }
  closePicker() {
    this.setState({ showPicker: false });
  }
  onPickerSubmit(submittedVal) {
    this.setState({ showPicker: false }, () => {
      let reason =
        submittedVal && submittedVal.length ? submittedVal[0].name : null;
      let badleeId =
        submittedVal && submittedVal.length ? submittedVal[0].badleeId : null;
      if (reason) {
        this.props.reportPost(badleeId, reason);
      }
    });
  }

  onClickReaction(id) {
    requestAnimationFrame(() => {
      this.props.showReactionPage(id, {
        navigator: this.props.navigator,
        component: Reactions
      });
    });
  }
  render() {
    let cardData = this.props.badlee.toJS();
    let reports = this.props.reports ? this.props.reports.toJS() : [];
    let isItemReport = reports.filter(report => {
      if (
        report.report_type === "badlee" &&
        report.report_id == cardData.id &&
        report.user == this.props.loggedUserID
      ) {
        return true;
      }
    });
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
              {cardData.purpose === "showoff" && (
                <Icon name="showoff" width="39" height="39" />
              )}
              {cardData.purpose === "shoutout" && (
                <Icon name="shoutout" width="33" height="33" />
              )}
              {cardData.purpose === "exchange" && (
                <Icon name="exchange" width="33" height="33" />
              )}
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {!this.state.showPicker && (
              <BadleeCard
                id={cardData.id}
                media={cardData.media}
                purpose={cardData.purpose}
                userAvatar={cardData.user_info.avatar}
                userName={cardData.user_info.username}
                time={cardData.timestamp}
                location={cardData.location}
                description={cardData.description}
                likes={cardData.likes}
                wishes={cardData.wishes}
                isReported={!!isItemReport.length}
                toShowPurpose={false}
                commentCount={cardData.comment_count}
                userID={cardData.user}
                loggedUserID={this.props.loggedUserID}
                onClickUser={this.onClickUser}
                onClickLike={this.onClickLike}
                onClickWish={this.onClickWish}
                onClickReport={this.onClickReport}
                onClickReaction={this.onClickReaction}
                onClickComment={this.onClickComment}
                onClickDelete={this.onClickDelete}
              />
            )}
            {this.state.showPicker && (
              <Picker
                type={this.state.type}
                multiselect={false}
                badleeId={this.state.badleeId}
                needSearch={false}
                onPickerClose={this.closePicker}
                onPickerSubmit={this.onPickerSubmit}
              />
            )}
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
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    reports: state.get("reports")
  }),
  actionCreators
)(SingleBadlee);

export default _Wrapped;
