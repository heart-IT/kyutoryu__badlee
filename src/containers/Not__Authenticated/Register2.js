/**
 * @name- register2.js
 * 
 * @chill- You must live in the present launch yourself on every wave, find your eternity in each moment- There is no other life but this. -Henry David Thoreau
 * 
 * 
 * @description- This file is the second part of Register Screen.
 * 
 * @author- heartit pirates were here
 */
import {
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Left,
    Picker,
    Radio,
    Right,
    StyleProvider,
    Text,
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import LoadingView from '../../components/LoadingView';
import Locator from '../../components/Location';
import getTheme from '../../theme/components';
import Welcome from './welcome';

("use strict");

var ImagePicker = require("react-native-image-picker");
const Item = Picker.Item;

class BackgroundImage extends Component {
  render() {
    let image = require("../../images/Register page 1 BG.png");
    return (
      <Image source={image} style={styles.backgroundImage}>
        <Text>{this.props.src}</Text>
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
      maxWidth: 800,
      maxHeight: 800,
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

  //
  locationInputFocussed() {
    this.setState({ showLocator: true });
  }
  locationSelection(location) {
    this.setState({ location: location });
    this.setState({ showLocator: false });
  }
  closeLocation() {
    this.setState({ showLocator: false });
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
    let { userInfo } = this.props.params;
    var data = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      password: userInfo.password,
      uniqueName: userInfo.uniqueName,
      email: userInfo.email,
      avatarName: this.state.avatarName,
      avatarSource: this.state.avatarSource && this.state.avatarSource.uri,
      avatarType: this.state.avatarType,
      date: this.state.date,
      gender: this.state.gender,
      location: this.state.location,
      wish: this.state.wish
    };
    this.props.register(data, {
      navigator: this.props.navigator,
      component: Welcome,
      reset: true
    });
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
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              {!this.state.showLocator && (
                <Text style={{ color: "#fff", fontSize: 18 }}>Sign Up</Text>
              )}
              {this.state.showLocator && (
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Select a Location
                </Text>
              )}
            </Left>
            <Right>
              {!this.state.showLocator && (
                <Text style={{ color: "#fff", fontSize: 15 }}>2 of 2</Text>
              )}
              {this.state.showLocator && (
                <Button transparent onPress={this.closeLocation.bind(this)}>
                  <Icon name="menuCloseIcon" width="15" height="15" />
                </Button>
              )}
            </Right>
          </Header>

          {this.state.showLocator && (
            <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
              <Locator
                defaultValue={this.state.location}
                onSelection={this.locationSelection.bind(this)}
              />
            </Content>
          )}
          {!this.state.showLocator && (
            <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
              <BackgroundImage>
                <Form
                  style={{
                    paddingLeft: "24%",
                    paddingTop: 30,
                    paddingRight: 15
                  }}
                >
                  <View style={styles.specialRow}>
                    <Image
                      style={styles.avatar}
                      source={this.state.avatarSource}
                    />
                    {!this.state.avatarSource && (
                      <Button
                        transparent
                        onPress={this.selectPhotoTapped.bind(this)}
                        style={{
                          width: 160,
                          height: 120,
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                      >
                        <Icon name="userPlaceholder" width="120" height="120" />
                      </Button>
                    )}
                    <Text
                      style={{
                        color: "#4f0554",
                        fontSize: 15,
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
                        fontSize: 15,
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
                        fontSize: 15
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
                        fontSize: 15
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
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        style={{
                          marginRight: 3
                        }}
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
                          fontSize: 15
                        }}
                        onPress={this.openDatePicker.bind(this)}
                      >
                        {this.state.date.split("-")[0]}
                      </Text>
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        style={{
                          marginRight: 3
                        }}
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
                          fontSize: 15
                        }}
                        onPress={this.openDatePicker.bind(this)}
                      >
                        {months[this.state.date.split("-")[1]]}
                      </Text>
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        style={{
                          marginRight: 3
                        }}
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
                          fontSize: 15
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
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        style={{
                          marginRight: 3
                        }}
                      />
                      <Input
                        style={{
                          color: "#4f0554",
                          borderBottomWidth: 2,
                          borderBottomColor: "#4f0554",
                          paddingLeft: 6,
                          paddingRight: 6,
                          marginRight: 12,
                          fontSize: 15,
                          height: 20,
                          lineHeight: 20,
                          paddingBottom: 3,
                          paddingTop: 0
                        }}
                        value={this.state.location}
                        placeholder="Your Location"
                        onChangeText={location => this.setState({ location })}
                        onFocus={this.locationInputFocussed.bind(this)}
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
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        style={{
                          marginRight: 3
                        }}
                      />
                      <Input
                        style={{
                          color: "#4f0554",
                          borderBottomWidth: 2,
                          borderBottomColor: "#4f0554",
                          paddingLeft: 6,
                          paddingRight: 6,
                          marginRight: 12,
                          fontSize: 15,
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
          )}
          {this.props.loading && <LoadingView message="Registering you.." />}
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
    borderRadius: 60,
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
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(Register2);

export default _Wrapped;
