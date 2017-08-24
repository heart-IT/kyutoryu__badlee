/**
 * You must live in the present launch yourself on every wave, find your eternity in each moment- There is no other life but this. Henry David Thoreau
 * 
 * https://maps.googleapis.com/maps/api/place/autocomplete/json?input=noi&types=(cities)&components=country:in&key=AIzaSyBoSsuv06OviFbbxKNv0droa4S-Lehk8DA
 * 
 * @name- Register2.js
 * @description- This file is the second part of Register Screen.
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Right,
  Text,
  Content,
  Form,
  View,
  Button,
  Input,
  Thumbnail,
  Radio,
  Picker,
  Icon as IconX
} from "native-base";
var ImagePicker = require("react-native-image-picker");

import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import * as actionCreators from "../../badlee__redux/action_creators";
import DatePicker from "react-native-datepicker";
import Main from "../Authenticated/Container";
import type { State } from "../../types";

const Item = Picker.Item;

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Register page 1 BG.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>
          {this.props.src}
        </Text>
        {this.props.children}
      </Image>
    );
  }
}

class Register2 extends Component {
  constructor(props) {
    super(props);
    this.datePicker = null;
    this.state = {
      avatarSource: null,
      avatarName: null,
      avatarType: null,
      gender: "He",
      date: "01-01-1990", //dd-mm-yyyy
      location: null,
      wish: []
    };
  }

  // Function for Opening Image Picker
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          avatarType: response.type,
          avatarName: response.fileName
        });
      }
    });
  }
  // Function to open Date Picker
  openDatePicker() {
    this.datePicker.onPressDate();
  }
  // Event to set user wishes. Convert wish csv to array format here.
  setWishes(wish) {
    var wishes = wish.split(",");
    var trimmedWishes = wishes.map(function(wish) {
      return wish.trim();
    });
    this.setState({ wish: trimmedWishes });
  }
  // Event triggered when User submits the form.
  submittingUser() {
    console.log(this.state);
    console.log(this.props);
    // var data= {
    //   avatar: {
    //     uri: this.state.avatarSource,
    //     type: this.state.avatarType,
    //     name: this.state.avatarName
    //   },
    //   username: this.props.userInfo.username
    // }
  }

  render() {
    const months = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      "10": "OCT",
      "11": "NOV",
      "12": "DEC"
    };
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left>
              <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </Left>
            <Right>
              <Text style={{ color: "#fff", fontSize: 15 }}>2 of 2</Text>
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BackgroundImage>
              <Form
                style={{ paddingLeft: "24%", paddingTop: 30, paddingRight: 15 }}
              >
                <View style={styles.specialRow}>
                  <Image
                    style={styles.avatar}
                    source={this.state.avatarSource}
                  />
                  {!this.state.avatarSource &&
                    <Icon
                      name="userPlaceholder"
                      width="120"
                      height="120"
                      onPress={this.selectPhotoTapped.bind(this)}
                    />}
                  <Text
                    style={{
                      color: "#4f0554",
                      fontSize: 13,
                      marginTop: 3,
                      borderBottomColor: "#4f0554",
                      borderBottomWidth: 1,
                      paddingLeft: 6,
                      paddingRight: 6
                    }}
                    onPress={this.selectPhotoTapped.bind(this)}
                  >
                    Upload Avatar
                  </Text>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="gender"
                    style={styles.formLabel}
                    width="28"
                    height="28"
                  />
                  <Radio
                    selected={this.state.gender === "He" ? true : false}
                    onPress={text => this.setState({ gender: "He" })}
                  />
                  <Text
                    style={{
                      marginRight: 18,
                      marginLeft: 3,
                      color: "#4f0554",
                      fontSize: 14,
                      lineHeight: 18
                    }}
                    onPress={text => this.setState({ gender: "He" })}
                  >
                    He
                  </Text>
                  <Radio
                    selected={this.state.gender === "She" ? true : false}
                    onPress={text => this.setState({ gender: "She" })}
                  />
                  <Text
                    style={{
                      marginRight: 18,
                      marginLeft: 3,
                      color: "#4f0554",
                      fontSize: 14
                    }}
                    onPress={text => this.setState({ gender: "She" })}
                  >
                    She
                  </Text>
                  <Radio
                    selected={this.state.gender === "Ze" ? true : false}
                    onPress={text => this.setState({ gender: "Ze" })}
                  />
                  <Text
                    style={{
                      marginLeft: 3,
                      color: "#4f0554",
                      fontSize: 14
                    }}
                    onPress={text => this.setState({ gender: "Ze" })}
                  >
                    Ze
                  </Text>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="cake"
                    width="28"
                    height="28"
                    style={styles.formLabel}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                      onPress={this.openDatePicker.bind(this)}
                    />
                    <Text
                      style={{
                        color: "#4f0554",
                        borderBottomWidth: 2,
                        borderBottomColor: "#4f0554",
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginRight: 12,
                        fontSize: 14
                      }}
                      onPress={this.openDatePicker.bind(this)}
                    >
                      {this.state.date.split("-")[0]}
                    </Text>
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                      onPress={this.openDatePicker.bind(this)}
                    />
                    <Text
                      style={{
                        color: "#4f0554",
                        borderBottomWidth: 2,
                        borderBottomColor: "#4f0554",
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginRight: 12,
                        fontSize: 14
                      }}
                      onPress={this.openDatePicker.bind(this)}
                    >
                      {months[this.state.date.split("-")[1]]}
                    </Text>
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                      onPress={this.openDatePicker.bind(this)}
                    />
                    <Text
                      style={{
                        color: "#4f0554",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderBottomWidth: 2,
                        borderBottomColor: "#4f0554",
                        paddingLeft: 6,
                        paddingRight: 6,
                        fontSize: 14
                      }}
                      onPress={this.openDatePicker.bind(this)}
                    >
                      {this.state.date.split("-")[2]}
                    </Text>
                  </View>
                  <DatePicker
                    date={this.state.date}
                    style={{ width: 0 }}
                    ref={d => {
                      this.datePicker = d;
                    }}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => this.setState({ date: date })}
                  />
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="locationBadlee"
                    width="28"
                    height="28"
                    fill="#9625b1"
                    style={{ marginRight: 18 }}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                    />
                    <Input
                      style={{
                        color: "#4f0554",
                        borderBottomWidth: 2,
                        borderBottomColor: "#4f0554",
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginRight: 12,
                        fontSize: 14,
                        height: 20,
                        lineHeight: 20,
                        paddingBottom: 3,
                        paddingTop: 0
                      }}
                      placeholder="Your Location"
                      onChangeText={location => this.setState({ location })}
                    />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="wishBadlee"
                    width="28"
                    height="28"
                    fill="#9625b1"
                    style={{ marginRight: 18 }}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                    />
                    <Input
                      style={{
                        color: "#4f0554",
                        borderBottomWidth: 2,
                        borderBottomColor: "#4f0554",
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginRight: 12,
                        fontSize: 14,
                        height: 20,
                        lineHeight: 20,
                        paddingBottom: 3,
                        paddingTop: 0
                      }}
                      placeholder="(Fashion, Gaming, Cameras, etc)"
                      onChangeText={this.setWishes.bind(this)}
                    />
                  </View>
                </View>
              </Form>

              <Button
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  borderRadius: 9
                }}
              >
                <Text onPress={this.submittingUser.bind(this)}>Submit</Text>
              </Button>
            </BackgroundImage>
          </Content>
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
    resizeMode: "cover"
  },
  avatar: {
    borderRadius: 120,
    width: 120,
    height: 120
  },
  specialRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    paddingRight: 18
  },
  formLabel: { marginRight: 18 }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Register2);

export default _Wrapped;
