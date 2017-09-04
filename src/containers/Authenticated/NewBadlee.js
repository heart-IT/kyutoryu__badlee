/**
 * @chill- Even as the dense and solid rock Cannot be stirred by either wind or storm: Even so the wise cannot be moved By voices of blame or voices of praise - Buddha
 * @name- NewBadlee
 */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import Locator from "../../components/Location";
import { Image } from "react-native";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Right,
  Text,
  Content,
  View,
  Form,
  Icon as IconX,
  Item,
  Input,
  Button
} from "native-base";
var ImagePicker = require("react-native-image-picker");

import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import * as actionCreators from "../../badlee__redux/action_creators";
import type { State } from "../../types";
import Main from "./GoingMerry";
import LoadingView from "../../components/LoadingView";

class NewBadlee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badleePhotoUrl: null,
      badleePhotoName: null,
      badleePhotoType: null,
      title: null,
      description: null,
      purpose: this.props.params.type ? this.props.params.type : null,
      category: null,
      ip: "11.12.13.14"
    };
  }
  backPress() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Main
      });
    });
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
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          badleePhotoUrl: source,
          badleePhotoType: response.type,
          badleePhotoName: response.fileName
        });
      }
    });
  }
  locationInputFocussed() {
    this.setState({ showLocator: true });
  }
  locationSelection(locatoin) {
    this.setState({ location: locatoin });
    this.setState({ showLocator: false });
  }
  closeLocation() {
    this.setState({ showLocator: false });
  }
  saveBadlee() {
    requestAnimationFrame(() => {
      var data = {
        badleePhotoUrl: this.state.badleePhotoUrl,
        badleePhotoType: this.state.badleePhotoType,
        badleePhotoName: this.state.badleePhotoName,
        description: this.state.description,
        ip: this.state.ip,
        location: this.state.location,
        category: this.state.category,
        purpose: this.state.purpose
      };
      this.props.saveBadlee(data, {
        navigator: this.props.navigator,
        component: Main,
        reset: true
      });
    });
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          {this.props.loading && <LoadingView />}
          <Header style={{ backgroundColor: "#611265" }}>
            <Left
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              {!this.state.showLocator && (
                <Button transparent onPress={this.backPress.bind(this)}>
                  <IconX name="arrow-back" />
                </Button>
              )}
              {this.state.showLocator && (
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Select a Location
                </Text>
              )}
            </Left>
            <Right>
              {!this.state.showLocator && (
                <Button transparent onPress={this.saveBadlee.bind(this)}>
                  <Text style={{ color: "#fff", fontSize: 15 }}>POST</Text>
                </Button>
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
              <Form>
                <View style={styles.badleePhotoWrapper}>
                  <Image
                    style={styles.avatar}
                    source={this.state.badleePhotoUrl}
                  />
                  {!this.state.badleePhotoUrl && (
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
                </View>
                <Item>
                  <Input
                    placeholder="Title.."
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Write a Caption"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Where is it?"
                    value={this.state.location}
                    onChangeText={location => this.setState({ location })}
                    onFocus={this.locationInputFocussed.bind(this)}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Where does it fit?"
                    value={this.state.category}
                    onChangeText={category => this.setState({ category })}
                  />
                </Item>
              </Form>
            </Content>
          )}
        </Container>
      </StyleProvider>
    );
  }
}
var styles = {
  badleePhotoWrapper: {
    paddingTop: 12,
    paddingBottom: 12
  },
  avatar: {
    width: 180,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto"
  }
};
const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
