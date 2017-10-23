/**
 * @name- Comment.js
 * 
 * @chill- Peace is always beautiful- Walt Whitman
 * 
 * 
 * @description- Comment screen of badlee
 * 
 * @author- heartit pirates
 */
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon as IconX,
  Input,
  Item,
  Left,
  List,
  StyleProvider,
  Text,
  Thumbnail,
  View
} from "native-base";
import React from "react";
import { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import LoadingView from "../../components/LoadingView";
import getTheme from "../../theme/components";

("use strict");

class Comment extends Component {
  constructor(props) {
    super(props);
    this.postComment = this.postComment.bind(this);
    this.commentDelete = this.commentDelete.bind(this);
    this.state = {
      commentText: ""
    };
  }
  postComment() {
    if (this.state.commentText) {
      this.props.postComment(this.props.params.id, this.state.commentText);
      this.setState({ commentText: "" });
    }
  }
  onClickLike(hello, hel2) {
    console.log(hello, hel2);
  }
  commentDelete(comment) {
    console.log(comment);
  }
  render() {
    var comments = this.props.comments ? this.props.comments.toJS() : [];
    var commentsText = comments.map(comment => {
      return (
        <View key={comment.user_id + comment.timestamp}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 6, paddingRight: 6 }}>
              <Thumbnail
                source={{ uri: comment.avatar }}
                style={{ width: 42, height: 42 }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontWeight: "bold",
                  fontSize: 17,
                  lineHeight: 30
                }}
              >
                {comment.fname}
              </Text>
              <Text style={{ fontSize: 15, color: "rgba(0, 0, 0, 0.72)" }}>
                {comment.content}
              </Text>
              <View style={styles.icons}>
                <TouchableOpacity transparent>
                  <Icon
                    name="postLiked"
                    width="22"
                    height="24"
                    fill="none"
                    strokeWidth="17"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#611265",
                    borderRadius: 3,
                    marginLeft: 2,
                    marginRight: 2
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "rgba(0, 0, 0, 0.77)",
                    paddingLeft: 2,
                    paddingRight: 2
                  }}
                >
                  Reply
                </Text>
                {comment.user_id === this.props.loggedUserID && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: 5,
                        height: 5,
                        backgroundColor: "#611265",
                        borderRadius: 3,
                        marginLeft: 2,
                        marginRight: 2
                      }}
                    />
                    <TouchableOpacity
                      transparent
                      onPress={this.commentDelete(comment)}
                    >
                      <Icon
                        name="postDelete"
                        width="25"
                        height="25"
                        fill="none"
                        stroke="#000"
                        strokeWidth="17"
                      />
                    </TouchableOpacity>
                  </View>
                )}

                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: "#611265",
                    borderRadius: 3,
                    marginLeft: 2,
                    marginRight: 2
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "rgba(0, 0, 0, 0.77)",
                    paddingLeft: 2,
                    paddingRight: 2
                  }}
                >
                  2 likes
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.commentsEndline} />
        </View>
      );
    });
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <IconX name="arrow-back" stroke="rgba(0, 0, 0, 0.81)" />
              <Text
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                  marginLeft: 12,
                  fontSize: 18
                }}
              >
                Comments
              </Text>
            </Left>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {comments.length === 0 && (
              <View style={styles.noComments}>
                <Text style={styles.noCommentsText}>
                  No comments yet, why not add one ;)
                </Text>
              </View>
            )}

            {comments.length > 0 && (
              <ScrollView
                style={styles.comments}
                keyboardShouldPersistTaps={true}
                keyboardDismissMode="on-drag"
              >
                <List style={{ flex: 1 }}>{commentsText}</List>
                <View style={styles.commentInputWrapper}>
                  <Form style={styles.commentForm}>
                    <Item style={styles.commentsInput}>
                      <Input
                        placeholder="enter something here"
                        onChangeText={commentText =>
                          this.setState({ commentText })}
                        value={this.state.commentText}
                        style={styles.commentsInputBox}
                      />
                    </Item>
                    <Button
                      style={styles.commentEnterBtn}
                      onPress={this.postComment}
                    >
                      <Text>Post</Text>
                    </Button>
                  </Form>
                </View>
              </ScrollView>
            )}
          </Content>
          {this.props.loading && <LoadingView message="Doing action.." />}
        </Container>
      </StyleProvider>
    );
  }
}

let styles = {
  comments: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 21,
    marginBottom: 21
  },
  commentsEndline: {
    width: "42%",
    marginLeft: "29%",
    marginTop: 15,
    marginBottom: 6,
    height: 1,
    backgroundColor: "#dcccdc"
  },
  commentInputWrapper: {
    height: 60,
    backgroundColor: "#eeeeee",
    padding: 9,
    paddingLeft: 0
  },
  commentForm: { flexDirection: "row", alignItems: "center", height: 42 },
  commentsInput: {
    flex: 1,
    height: 42
  },
  commentsInputBox: {
    backgroundColor: "#fff",
    height: 40,
    paddingLeft: 6,
    borderRadius: 3
  },
  commentEnterBtn: {
    marginLeft: 9,
    height: 36,
    borderRadius: 18,
    marginTop: 3
  },
  noComments: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  noCommentsText: {
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.67)"
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 3,
    marginTop: 3
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#611265"
  }
};

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    comments: state.getIn([
      "badlees",
      "data",
      state.getIn(["badlees", "currentShowing"]),
      "comments"
    ]),
    loggedUserID: state.getIn(["user", "loggedUserID"])
  }),
  actionCreators
)(Comment);

export default _Wrapped;
