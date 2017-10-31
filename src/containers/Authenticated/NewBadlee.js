/**
 * 
 * @name- newBadlee.js
 * 
 * @chill- Even as the dense and solid rock Cannot be stirred by either wind or storm: Even so the wise cannot be moved By voices of blame or voices of praise - Buddha
 * 
 * 
 * @description- NewBadlee Screen for Badlee
 * 
 * @author- heartit pirates were here.
 */

"use strict";
import {
  Container,
  Content,
  Header,
  Icon as IconX,
  Input,
  Item,
  Left,
  Form,
  Right,
  StyleProvider,
  Text,
  View,
  Label,
  Button
} from "native-base";
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import SingleBadlee from "./singleBadlee";
import Picker from "../../components/Picker";

var ImagePicker = require("react-native-image-picker");

class NewBadlee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badleePhotoUrl: null,
      badleePhotoName: null,
      badleePhotoType: null,
      title: null,
      description: null,
      category: null,
      location: null,
      ip: "95.99.52.29.37",
      showLocator: false,
      showPicker: false,
      pickerSelectedValue: ""
    };
    this.backPress = this._backPress.bind(this);
    this.onPhotoTap = this._onPhotoTap.bind(this);
    this.onLocationInputTap = this._onLocationInputTap.bind(this);
    this.closeLocator = this._closeLocator.bind(this);
    this.onLocationSelect = this._onLocationSelect.bind(this);
    this.saveBadlee = this._saveBadlee.bind(this);
  }

  // go back
  _backPress() {
    requestAnimationFrame(() => {
      this.props.goBack();
    });
  }

  // open image picker
  _onPhotoTap() {
    const options = {
      quality: 1.0,
      maxWidth: 600,
      maxHeight: 400,
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
        this.setState({
          badleePhotoUrl: source,
          badleePhotoType: response.type,
          badleePhotoName: response.fileName
        });
      }
    });
  }

  // on location input, show locator
  _onLocationInputTap() {
    this.setState({ showLocator: true });
  }

  // close locator
  _closeLocator() {
    this.setState({ showLocator: false });
  }

  // set state and close locator
  _onLocationSelect(location) {
    this.setState({ location: location });
    this.closeLocator();
  }

  showLocationPicker() {
    this.setState({ showPicker: true, type: "location" });
  }

  showCategoryPicker() {
    this.setState({ showPicker: true, type: "category" });
  }

  /**
   * 
   * validation.. xDD
   * 
   * purpose   photo    result
   *    ex      1        1
   *    ex      0        0
   *    show      1      1
   *    show    0       0
   *    shout   1       1
   *    shout   0        1
   */
  _saveBadlee() {
    let { purpose } = this.props.params;
    var data = {
      uri: this.state.badleePhotoUrl.uri,
      imageType: this.state.badleePhotoType,
      fileName: this.state.badleePhotoName,
      description: this.state.description,
      location: this.state.location.city + ", " + this.state.location.state,
      category: this.state.category.name,
      ip: this.state.ip,
      purpose: purpose
    };
    this.props.saveBadlee(data, {
      navigator: this.props.navigator,
      component: SingleBadlee
    });
  }

  closePicker() {
    this.setState({ showPicker: false });
  }

  onPickerSubmit(submittedVal) {
    if (this.state.type === "location") {
      let location = {};
      if (submittedVal && submittedVal.length) {
        location = submittedVal[0];
      }
      this.setState({ location: location, showPicker: false });
    } else if (this.state.type === "category") {
      let category = {};
      if (submittedVal && submittedVal.length) {
        category = submittedVal[0];
      }
      this.setState({ category: category, showPicker: false });
    }
  }

  render() {
    let { purpose } = this.props.params;
    let { showLocator } = this.state;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left style={styles.headerLeft}>
              <TouchableOpacity onPress={this.backPress}>
                <Icon name="menuBackIcon" width="18" height="18" />
              </TouchableOpacity>
            </Left>
            <Right>
              <Icon name={purpose} width="30" height="30" />
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={styles.badleePhotoWrapper}>
                <Image
                  style={styles.avatar}
                  source={this.state.badleePhotoUrl}
                />
                {!this.state.badleePhotoUrl && (
                  <TouchableOpacity
                    transparent
                    onPress={this.onPhotoTap}
                    style={{
                      width: 160,
                      height: 100,
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                  >
                    <Icon name="upload" width="160" height="100" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={this.onPhotoTap}>
                  <Text style={{ color: "rgba(0, 0, 0, 0.67)" }}>
                    Upload Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <Form>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="ENTER DESCRIPTION HERE"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    style={{ fontSize: 15 }}
                  />
                </Item>
              </Form>
              <TouchableOpacity
                style={styles.pickerInput}
                onPress={this.showLocationPicker.bind(this)}
              >
                <Text style={styles.pickerLabel}>
                  {purpose === "shoutout"
                    ? "WHERE IS IT NEEDED?"
                    : "WHERE IS IT?"}
                </Text>
                <View style={styles.pickerInputStyle}>
                  {this.state.location && (
                    <Text>{this.state.location.city}</Text>
                  )}
                  {!this.state.location && (
                    <Text style={styles.pickerPlaceholderText}>LOCATION</Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pickerInput}
                onPress={this.showCategoryPicker.bind(this)}
              >
                <Text style={styles.pickerLabel}>WHERE DOES IT FITS?</Text>
                <View style={styles.pickerInputStyle}>
                  {this.state.category ? (
                    <Text>{this.state.category.name}</Text>
                  ) : (
                    <Text style={styles.pickerPlaceholderText}>CATEGORY</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {!this.state.showPicker && (
              <Button
                primary
                style={{
                  marginBottom: 30,
                  marginRight: 15,
                  alignSelf: "flex-end"
                }}
                disabled={
                  (purpose !== "shoutout" && !this.state.badleePhotoUrl) ||
                  !this.state.description ||
                  !this.state.location ||
                  !this.state.category
                }
                onPress={this.saveBadlee}
              >
                <Text>{this.props.loading ? "Wait.." : "POST"}</Text>
              </Button>
            )}
            {this.state.showPicker && (
              <Picker
                type={this.state.type}
                multiselect={false}
                onPickerClose={this.closePicker.bind(this)}
                onPickerSubmit={this.onPickerSubmit.bind(this)}
                needSearch={true}
                selectedValue={
                  this.state.type === "location"
                    ? this.state.location
                    : this.state.category
                }
              />
            )}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
var styles = {
  headerLeft: { flex: 1 },
  badleePhotoWrapper: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center"
  },
  avatar: {
    width: 180,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto"
  },
  newBadleeForm: {
    paddingLeft: 12,
    paddingRight: 12
  },
  inputItem: {
    marginTop: 12,
    marginBottom: 3,
    marginRight: 12
  },
  input: {
    height: 36
  },
  pickerInput: {
    paddingLeft: 18,
    marginTop: 18,
    marginBottom: 12
  },
  pickerLabel: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 15
  },
  pickerInputStyle: {
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: "rgb(226, 226, 226)"
  },
  pickerPlaceholderText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.54)"
  }
};
const _Wrapped = connect(
  state => ({ loading: state.getIn(["application", "isLoading"]) }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
