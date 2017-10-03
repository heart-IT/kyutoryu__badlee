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
    Body,
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
    ListItem,
    StyleProvider,
    Text,
    Thumbnail,
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import LoadingView from '../../components/LoadingView';
import getTheme from '../../theme/components';

("use strict");

class Comment extends Component {
  constructor(props) {
    super(props);
    this.postComment = this.postComment.bind(this);
    this.state = {
      commentText: ""
    };
  }
  postComment() {
    if (this.state.commentText) {
      this.props.postComment(this.props.params.id, this.state.commentText);
    }
  }
  onClickLike(hello, hel2) {
    console.log(hello, hel2);
  }
  render() {
    var comments = this.props.comments ? this.props.comments.toJS() : [];
    var commentsText = comments.map(comment => {
      return (
        <ListItem key={comment.user_id + comment.timestamp} avatar>
          <Left>
            <Thumbnail source={{ uri: comment.avatar }} />
          </Left>
          <Body>
            <Text>{comment.fname}</Text>
            <Text note>{comment.content}</Text>
            <View style={styles.icons}>
              <TouchableOpacity transparent>
                <Icon
                  name="postUnliked"
                  width="24"
                  height="27"
                  fill="none"
                  stroke="#000"
                  strokeWidth="17"
                />
              </TouchableOpacity>
              <TouchableOpacity transparent>
                <Icon name="postDelete" width="30" height="30" />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.77)"
                }}
              >
                2 likes
              </Text>
            </View>
          </Body>
        </ListItem>
      );
    });
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <IconX name="arrow-back" />
              <Text style={{ marginLeft: 12, fontWeight: "bold" }}>
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
              <ScrollView style={styles.comments}>
                <List style={{ flex: 1 }}>{commentsText}</List>
              </ScrollView>
            )}

            <View style={styles.commentInputWrapper}>
              <Form style={styles.commentForm}>
                <Item style={styles.commentsInput}>
                  <Input
                    placeholder="enter something here"
                    onChangeText={commentText => this.setState({ commentText })}
                    value={this.state.commentText}
                  />
                </Item>
                <Button
                  transparent
                  style={styles.commentEnterBtn}
                  onPress={this.postComment}
                >
                  <Text>Save</Text>
                </Button>
              </Form>
            </View>
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
  commentInputWrapper: { height: 50, backgroundColor: "#eeeeee" },
  commentForm: { flexDirection: "row", alignItems: "center" },
  commentsInput: { flex: 1 },
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
    alignItems: "center"
  }
};

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    comments: state.getIn(["badlees", "data", "currentShowing", "comments"])
  }),
  actionCreators
)(Comment);

export default _Wrapped;
