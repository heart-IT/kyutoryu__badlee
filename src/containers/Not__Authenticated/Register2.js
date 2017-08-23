/**
 * All the senses are aflame, all thoughts are aflame-- aflame with the fire of desire. There is anger, there is ignorance, there is hatred, 
 * and as long as the fire finds fuel upon which it can feed, so long will it burn. - Buddha
 * 
 * 
 * @description- This file is the Register Page
 * @author- heartit pirates
 */

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, PixelRatio } from "react-native";
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
      gender: "He",
      date: "01-01-1990"
    };
  }

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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  onDateChange(date) {
    this.setState({ date: date });
  }
  crazyBtnClicked() {
    this.datePicker.onPressDate();
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
                      onPress={this.crazyBtnClicked.bind(this)}
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
                      onPress={this.crazyBtnClicked.bind(this)}
                    >
                      {this.state.date.split("-")[0]}
                    </Text>
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                      onPress={this.crazyBtnClicked.bind(this)}
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
                      onPress={this.crazyBtnClicked.bind(this)}
                    >
                      {months[this.state.date.split("-")[1]]}
                    </Text>
                    <IconX
                      name="ios-arrow-down"
                      style={{ fontSize: 20, color: "#4f0554", marginRight: 3 }}
                      onPress={this.crazyBtnClicked.bind(this)}
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
                      onPress={this.crazyBtnClicked.bind(this)}
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
                    onDateChange={this.onDateChange.bind(this)}
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
                      onPress={this.crazyBtnClicked.bind(this)}
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
                    >
                      Your Location
                    </Text>
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="wishBadlee"
                    width="28"
                    height="28"
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
                    >
                      (Fashion, Gaming, Cameras, etc)
                    </Text>
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
                <Text>Submit</Text>
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
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
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
    marginBottom: 18
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
