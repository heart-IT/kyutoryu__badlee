/**
 * @name- editProfile.js
 * 
 * @chill- Do not be too timid and squeamish about your actions. All life is an experiment. The more experiments you make the better- Ralph Waldo Emerson
 * 
 * 
 * @description- Edit Profile Page
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Left,
  Radio,
  Right,
  StyleProvider,
  Text,
  View
} from "native-base";
import { connect } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
import DatePicker from "react-native-datepicker";
import * as actionCreators from "../../badlee__redux/action_creators";
import LoadingView from "../../components/LoadingView";
import Picker from "../../components/Picker";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import { Locations, Categories } from "../../constants";

var ImagePicker = require("react-native-image-picker");

class EditProfile extends Component {
  constructor(props) {
    super(props);
    let user = props.user.toJS();
    let location = {};
    let interests = [];
    if (typeof user.location === "string") {
      location = Locations.filter(location => {
        return location.city === user.location.split(",")[0];
      })[0];
    }
    if (typeof user.interests === "string") {
      let allUserInterests = user.interests
        .split(",")
        .map(interest => interest.trim());
      interests = Categories.filter(category => {
        return allUserInterests.indexOf(category.name) > -1;
      });
    }
    this.datePicker = null;
    this.state = {
      avatarSource: null,
      avatarName: null,
      avatarType: null,
      avatar: user.avatar,
      gender: user.gender,
      date: "01-01-1990", //dd-mm-yyyy
      location: location,
      selectedWish: interests,
      wish: user.interests,
      showPicker: false
    };
    console.log(this.state);
    this.closePicker = this.closePicker.bind(this);
    this.onPickerSubmit = this.onPickerSubmit.bind(this);
    this.locationInputFocussed = this.locationInputFocussed.bind(this);
    this.categoryInputFocussed = this.categoryInputFocussed.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.submittingUser = this.submittingUser.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
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
  locationInputFocussed() {
    this.setState({
      showPicker: true,
      pickerType: "location",
      isMultiselect: false,
      pickerSelectedValue: this.state.location ? this.state.location : {}
    });
  }
  categoryInputFocussed() {
    this.setState({
      showPicker: true,
      pickerType: "category",
      isMultiselect: true,
      pickerSelectedValue: this.state.selectedWish
        ? this.state.selectedWish
        : []
    });
  }
  onPickerSubmit(selectedVal) {
    if (selectedVal && selectedVal.length) {
      if (this.state.pickerType === "location") {
        this.props.clearAllErrors();
        this.setState({
          location: selectedVal[0],
          showPicker: false
        });
      } else {
        let selectedValues = selectedVal.map(function(val) {
          return `${val.name}`;
        });
        this.setState({
          wish: selectedValues.join(", "),
          selectedWish: selectedVal,
          showPicker: false
        });
      }
    } else {
      if (this.state.pickerType === "location") {
        this.setState({
          location: null,
          showPicker: false
        });
      } else {
        this.setState({ showPicker: false, wish: null, selectedWish: [] });
      }
    }
  }
  closePicker() {
    this.setState({ showPicker: false });
  }
  goBack() {
    this.props.goBack();
  }

  // Event triggered when User submits the form.
  submittingUser() {
    if (!this.state.location) {
      return;
    }
    var data = {
      avatarName: this.state.avatarName,
      avatarSource: this.state.avatarSource && this.state.avatarSource.uri,
      avatarType: this.state.avatarType,
      dob: this.state.date,
      gender: this.state.gender,
      location: this.state.location.city,
      wish: this.state.wish
    };
    this.props.updateUser(data);
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
              <TouchableOpacity onPress={this.goBack.bind(this)}>
                <Icon
                  name="menuBackIcon"
                  width="18"
                  height="18"
                  fill="#fff"
                  style={{ marginRight: 12 }}
                />
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 18 }}>Edit Profile</Text>
            </Left>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {this.state.showPicker && (
              <Picker
                type={this.state.pickerType}
                multiselect={this.state.isMultiselect}
                onPickerClose={this.closePicker}
                onPickerSubmit={this.onPickerSubmit}
                needSearch={true}
                selectedValue={
                  this.state.pickerSelectedValue
                    ? this.state.pickerSelectedValue
                    : {}
                }
              />
            )}
            {!this.state.showPicker && (
              <Form style={styles.register2form}>
                <View style={styles.specialRow}>
                  {!this.state.avatarSource &&
                    this.state.avatar && (
                      <Image
                        style={styles.avatar}
                        source={{ uri: this.state.avatar }}
                      />
                    )}
                  {this.state.avatarSource && (
                    <Image
                      style={styles.avatar}
                      source={this.state.avatarSource}
                    />
                  )}
                  {!this.state.avatarSource &&
                    !this.state.avatar && (
                      <Button
                        transparent
                        onPress={this.selectPhotoTapped}
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
                    onPress={this.selectPhotoTapped}
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
                  <View style={styles.formOptionContainer}>
                    <View style={styles.formOption}>
                      <Radio
                        selected={this.state.gender === "He" ? true : false}
                        onPress={text => this.setState({ gender: "He" })}
                      />
                      <Text
                        style={styles.formOptionText}
                        onPress={text => this.setState({ gender: "He" })}
                      >
                        He
                      </Text>
                    </View>
                    <View style={styles.formOption}>
                      <Radio
                        selected={this.state.gender === "She" ? true : false}
                        onPress={text => this.setState({ gender: "She" })}
                      />
                      <Text
                        style={styles.formOptionText}
                        onPress={text => this.setState({ gender: "She" })}
                      >
                        She
                      </Text>
                    </View>
                    <View style={styles.formOption}>
                      <Radio
                        selected={this.state.gender === "Ze" ? true : false}
                        onPress={text => this.setState({ gender: "Ze" })}
                      />
                      <Text
                        style={styles.formOptionText}
                        onPress={text => this.setState({ gender: "Ze" })}
                      >
                        Ze
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="cake"
                    width="28"
                    height="28"
                    style={styles.formLabel}
                  />
                  <View style={styles.formOptionContainer}>
                    <View style={styles.formOption}>
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        onPress={this.openDatePicker}
                      />
                      <Text
                        style={{
                          ...styles.formOptionText,
                          ...styles.underlinedText
                        }}
                        onPress={this.openDatePicker}
                      >
                        {this.state.date.split("-")[0]}
                      </Text>
                    </View>
                    <View style={styles.formOption}>
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        onPress={this.openDatePicker}
                      />
                      <Text
                        style={{
                          ...styles.formOptionText,
                          ...styles.underlinedText
                        }}
                        onPress={this.openDatePicker}
                      >
                        {months[this.state.date.split("-")[1]]}
                      </Text>
                    </View>
                    <View style={styles.formOption}>
                      <Icon
                        name="drop_arrow"
                        width="16"
                        height="10"
                        onPress={this.openDatePicker}
                      />
                      <Text
                        style={{
                          ...styles.formOptionText,
                          ...styles.underlinedText
                        }}
                        onPress={this.openDatePicker}
                      >
                        {this.state.date.split("-")[2]}
                      </Text>
                    </View>
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
                    style={styles.formLabel}
                  />
                  <View style={styles.formOptionContainer}>
                    <View style={styles.formOption}>
                      <Icon name="drop_arrow" width="16" height="10" />
                      <Text
                        style={{
                          ...styles.formOptionText,
                          ...styles.underlinedText
                        }}
                        onPress={this.locationInputFocussed}
                      >
                        {this.state.location
                          ? this.state.location.city
                          : "Select a location (required)"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Icon
                    name="wishBadlee"
                    width="28"
                    height="28"
                    fill="#9625b1"
                    style={styles.formLabel}
                  />
                  <View style={styles.formOptionContainer}>
                    <View style={styles.formOption}>
                      <Icon name="drop_arrow" width="16" height="10" />
                      <Text
                        style={{
                          ...styles.formOptionText,
                          ...styles.underlinedText
                        }}
                        onPress={this.categoryInputFocussed}
                      >
                        {this.state.wish
                          ? this.state.wish.substring(0, 25) + ".."
                          : "(Fashion, Gaming, Cameras, etc)"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Button
                    disabled={!this.state.location}
                    style={styles.submitButton}
                  >
                    <Text onPress={this.submittingUser}>Submit</Text>
                  </Button>
                </View>
              </Form>
            )}
          </Content>
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
  register2form: {
    paddingTop: 24,
    paddingLeft: "12%",
    paddingRight: "12%",
    width: "100%",
    zIndex: 99,
    flex: 1,
    height: "100%"
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
    marginBottom: 12
  },
  formLabel: { marginRight: 12 },
  formOptionContainer: {
    flex: 1,
    flexDirection: "row"
  },
  formOption: { flexDirection: "row", marginRight: 18, alignItems: "center" },
  formOptionText: {
    marginLeft: 3,
    color: "#4f0554",
    fontSize: 15,
    paddingLeft: 3,
    paddingRight: 3
  },
  underlinedText: {
    borderBottomWidth: 2,
    borderBottomColor: "#4f0554"
  },
  tncView: {
    marginTop: 18,
    marginBottom: 6,
    alignItems: "center"
  },
  tncText: {
    fontSize: 14
  },
  tncLink: {
    color: "#611265",
    borderBottomWidth: 1,
    borderBottomColor: "#4f0554"
  },
  submitButton: {
    borderRadius: 9,
    zIndex: 2,
    alignSelf: "flex-end",
    marginTop: 12
  }
};

const _Wrapped = connect(
  state => ({
    user: state.getIn(["user", "data", state.getIn(["user", "loggedUserID"])]),
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(EditProfile);

export default _Wrapped;
