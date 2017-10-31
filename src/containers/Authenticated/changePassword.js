/**
 * @name- changePassword
 * 
 * @chill- We awaken in others the same attitude of mind we hold toward them. -Elbert Hubbard
 * 
 * 
 * @description- Change Password Screen
 * 
 * @author- heartit pirates were here
 */
"use strict";
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  StyleProvider,
  Text,
  View
} from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Loading from "../../components/LoadingView";
import getTheme from "../../theme/components";

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/reset-password-phone.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>{this.props.src}</Text>
        {this.props.children}
      </Image>
    );
  }
}

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: null,
      new: null,
      renew: null,
      error: null
    };
    this.onChangeNewpassword = this.onChangeNewpassword.bind(this);
    this.onChangeNewRepassword = this.onChangeNewRepassword.bind(this);
  }
  onChangeNewpassword() {
    if (this.state.new !== this.state.renew) {
      this.setState({ error: "Password dont match" });
    } else {
      this.setState({ error: null });
    }
  }
  onChangeNewRepassword() {
    if (this.state.new !== this.state.renew) {
      this.setState({ error: "Password dont match" });
    } else {
      this.setState({ error: null });
    }
  }
  handleFormSubmit() {
    requestAnimationFrame(() => {
      this.props.changePassword(
        this.state.old,
        this.state.new,
        this.state.renew
      );
    });
  }
  render() {
    let { notification } = this.props;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
          >
            <BackgroundImage>
              <Text style={styles.heading}>Change Password</Text>
              <Form>
                <Item style={styles.boxWrapper}>
                  <Input
                    onChangeText={text => this.setState({ old: text })}
                    secureTextEntry={true}
                    value={this.state.old}
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    style={styles.inputBox}
                    placeholder="Old Password"
                  />
                </Item>
                {this.props.errors &&
                this.props.errors.includes("Wrong Password given") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#b27fe7",
                        fontSize: 13,
                        marginLeft: 3,
                        marginRight: 18
                      }}
                    >
                      Wrong Password given
                    </Text>
                  </View>
                ) : (
                  <Text />
                )}
                <Item style={styles.boxWrapper}>
                  <Input
                    onChangeText={text => this.setState({ new: text })}
                    onEndEditing={this.onChangeNewpassword}
                    secureTextEntry={true}
                    value={this.state.new}
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    style={styles.inputBox}
                    placeholder="New Password(min 6 characters)"
                  />
                </Item>
                <Item style={styles.boxWrapper}>
                  <Input
                    onChangeText={text => this.setState({ renew: text })}
                    onEndEditing={this.onChangeNewRepassword}
                    secureTextEntry={true}
                    value={this.state.renew}
                    placeholderTextColor="#7d5c85"
                    fontFamily="PoiretOne-Regular"
                    style={styles.inputBox}
                    placeholder="Reenter New Password"
                  />
                </Item>
                {this.state.error === "Password dont match" ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#b27fe7",
                        fontSize: 13,
                        marginLeft: 3,
                        marginRight: 18
                      }}
                    >
                      Password dont match
                    </Text>
                  </View>
                ) : (
                  <Text />
                )}
                <View style={styles.submitButtonWrapper}>
                  <Button
                    common
                    action="submit"
                    style={styles.submitButton}
                    onPress={this.handleFormSubmit.bind(this)}
                    disabled={
                      !this.state.old ||
                      !this.state.new ||
                      !this.state.renew ||
                      (this.state.new && this.state.new.length < 6) ||
                      !!this.state.error
                    }
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </Button>
                </View>
                {notification.includes("Password Updated") && (
                  <Text style={styles.successMessage}>Updated password.</Text>
                )}
              </Form>
            </BackgroundImage>
          </Content>
          {this.props.loading && <Loading message="Sending email.." />}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "stretch"
  },
  heading: {
    paddingTop: "15%",
    paddingLeft: 30,
    fontSize: 30,
    color: "#611265",
    fontFamily: "Righteous-Regular",
    marginBottom: 60
  },
  formLabel: {
    marginTop: 60,
    paddingLeft: 30,
    fontFamily: "PoiretOne-Regular",
    fontSize: 18,
    color: "#500655"
  },
  inputBox: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#fff"
  },
  submitButtonWrapper: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  submitButton: {
    borderRadius: 6
  },
  successMessage: {
    marginTop: 60,
    textAlign: "center",
    color: "#500655",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: "12.5%",
    paddingRight: "12.5%"
  }
};
const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"]),
    notification: state.getIn(["application", "notifications"]),
    errors: state.getIn(["application", "errors"])
  }),
  actionCreators
)(ChangePassword);

export default _Wrapped;
