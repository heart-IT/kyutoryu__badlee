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
import { Container, Content, Header, Icon as IconX, Input, Item, Left, Right, StyleProvider, Text, View } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';
import SingleBadlee from './singleBadlee';

var ImagePicker = require("react-native-image-picker");

("use strict");

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
      ip: "95.99.52.29.37",
      showLocator: false
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
    if (purpose === "shoutOut" || this.state.badleePhotoUrl) {
      var data = {
        uri: this.state.badleePhotoUrl.uri,
        imageType: this.state.badleePhotoType,
        fileName: this.state.badleePhotoName,
        description: this.state.description,
        location: this.state.location,
        category: this.state.category,
        ip: this.state.ip,
        purpose: purpose
      };
      this.props.saveBadlee(data, {
        navigator: this.props.navigator,
        component: SingleBadlee
      });
    }
  }

  render() {
    let { purpose } = this.props.params;
    let { showLocator } = this.state;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left style={styles.headerLeft}>
              {showLocator ? (
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Select a Location
                </Text>
              ) : (
                <TouchableOpacity transparent onPress={this.backPress}>
                  <IconX name="arrow-back" fill="#fff" />
                </TouchableOpacity>
              )}
            </Left>
            <Right>
              {showLocator ? (
                <TouchableOpacity transparent onPress={this.closeLocator}>
                  <Icon name="menuCloseIcon" width="15" height="15" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity transparent onPress={this.saveBadlee}>
                  <Text style={{ color: "#fff", fontSize: 15 }}>POST</Text>
                </TouchableOpacity>
              )}
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View>
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
                    <Icon name="thingy" width="160" height="100" />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="Title.."
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                  />
                </Item>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="Write a Caption"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                  />
                </Item>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="Where is it?"
                    value={this.state.location}
                    onFocus={this.onLocationInputTap.bind(this)}
                  />
                </Item>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="Where does it fits?"
                    value={this.state.category}
                    onChangeText={category => this.setState({ category })}
                  />
                </Item>
              </View>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
var styles = {
  headerLeft: { flex: 1, paddingLeft: 6 },
  badleePhotoWrapper: {
    paddingTop: 12,
    paddingBottom: 12
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
    marginBottom: 9,
    marginRight: 12
  },
  input: {
    height: 36
  }
};
const _Wrapped = connect(
  state => ({ loading: state.getIn(["application", "isLoading"]) }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
