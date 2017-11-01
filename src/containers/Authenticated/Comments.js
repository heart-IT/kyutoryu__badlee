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
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Comments from "../../components/Comments";
import Icon from "../../components/Icon";
import LoadingView from "../../components/LoadingView";
import getTheme from "../../theme/components";
import User from "./user";

("use strict");

class Comment extends Component {
  constructor(props) {
    super(props);
    this.postComment = this.postComment.bind(this);
    this.onCommentDelete = this.onCommentDelete.bind(this);
    this.onPressUser = this.onPressUser.bind(this);
    this.state = {
      commentText: ""
    };
  }
  onPressBack() {
    this.props.goBack();
  }
  postComment() {
    if (this.state.commentText) {
      this.props.onCommentPost(this.props.params.id, this.state.commentText);
      this.setState({ commentText: "" });
    }
  }
  onCommentDelete(commentId) {
    this.props.onCommentDelete(commentId);
  }
  onPressUser(userID) {
    requestAnimationFrame(() => {
      this.props.showUserPage(userID, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  render() {
    var comments = this.props.comments ? this.props.comments.toJS() : [];
    console.log(comments);
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left style={styles.headerLeft}>
              <TouchableOpacity onPress={this.onPressBack.bind(this)}>
                <Icon name="menuBackIcon" width="18" height="18" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Comments</Text>
            </Left>
          </Header>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
          >
            {comments.length === 0 && (
              <View style={styles.noComments}>
                <Text style={styles.noCommentsText}>
                  No comments yet, why not add one ;)
                </Text>
              </View>
            )}

            {comments.length > 0 && (
              <Comments
                data={comments}
                loggedUserID={this.props.loggedUserID}
                onCommentDelete={this.onCommentDelete}
                onPressUser={this.onPressUser}
              />
            )}
            <View style={styles.commentInputWrapper}>
              <Form style={styles.commentForm}>
                <Item style={styles.commentsInput} regular>
                  <Input
                    placeholder="enter something here"
                    onChangeText={commentText => this.setState({ commentText })}
                    value={this.state.commentText}
                    style={styles.commentsInputBox}
                  />
                </Item>
                <Button
                  style={styles.commentEnterBtn}
                  disabled={this.props.loading}
                  onPress={this.postComment}
                >
                  <Text>{this.props.loading ? "Wait.." : "POST"}</Text>
                </Button>
              </Form>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

let styles = {
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "bold"
  },
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
    backgroundColor: "#eeeeee",
    padding: 6
  },
  commentForm: { flexDirection: "row", alignItems: "center", height: 42 },
  commentsInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 18,
    paddingLeft: 12,
    backgroundColor: "#eeeeee"
  },
  commentsInputBox: {
    paddingLeft: 6
  },
  commentEnterBtn: {
    marginLeft: 9,
    height: 33,
    marginTop: 6
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
      state.getIn(["badlees", "activeBadleeID"]),
      "comments"
    ]),
    loggedUserID: state.getIn(["user", "loggedUserID"])
  }),
  actionCreators
)(Comment);

export default _Wrapped;
