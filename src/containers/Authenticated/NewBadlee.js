/**
 * @chill- Even as the dense and solid rock Cannot be stirred by either wind or storm: Even so the wise cannot be moved By voices of blame or voices of praise - Buddha
 * @name- NewBadlee
 */
"use strict";
import {
    Container,
    Content,
    Form,
    Header,
    Icon as IconX,
    Input,
    Item,
    Left,
    Right,
    StyleProvider,
    Text,
    View,
} from 'native-base';
import { Component } from 'react';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import LoadingView from '../../components/LoadingView';
import Locator from '../../components/Location';
import getTheme from '../../theme/components';
import Main from './GoingMerry';

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
      purpose: this.props.params.type ? this.props.params.type : null,
      category: null,
      ip: "11.12.13.14"
    };
    this.saveBadlee = this.saveBadlee.bind(this);
    this.closeLocation = this.closeLocation.bind(this);
    this.backPress = this.backPress.bind(this);
    this.locationSelection = this.locationSelection.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
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
    // console.log(data);
    this.props.saveBadlee(data, {
      navigator: this.props.navigator,
      component: Main,
      reset: true
    });
  }

  render() {
    let locationHeader = (
      <Header style={{ backgroundColor: "#611265" }}>
        <Left style={styles.headerLeft}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Select a Location</Text>
        </Left>
        <Right>
          <TouchableOpacity transparent onPress={this.closeLocation}>
            <Icon name="menuCloseIcon" width="15" height="15" />
          </TouchableOpacity>
        </Right>
      </Header>
    );
    let newBadleeHeader = (
      <Header style={{ backgroundColor: "#611265" }}>
        <Left style={styles.headerLeft}>
          <TouchableOpacity transparent onPress={this.backPress}>
            <IconX name="arrow-back" fill="#fff" />
          </TouchableOpacity>
        </Left>
        <Right>
          <TouchableOpacity transparent onPress={this.saveBadlee}>
            <Text style={{ color: "#fff", fontSize: 15 }}>POST</Text>
          </TouchableOpacity>
        </Right>
      </Header>
    );
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          {this.state.showLocator && locationHeader}
          {!this.state.showLocator && newBadleeHeader}
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {this.state.showLocator && (
              <Locator
                defaultValue={this.state.location}
                onSelection={this.locationSelection}
              />
            )}
            {!this.state.showLocator && (
              <Form style={styles.newBadleeForm}>
                <View style={styles.badleePhotoWrapper}>
                  <Image
                    style={styles.avatar}
                    source={this.state.badleePhotoUrl}
                  />
                  {!this.state.badleePhotoUrl && (
                    <TouchableOpacity
                      transparent
                      onPress={this.selectPhotoTapped}
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
                    onChangeText={location => this.setState({ location })}
                    onFocus={this.locationInputFocussed.bind(this)}
                  />
                </Item>
                <Item style={styles.inputItem}>
                  <Input
                    placeholder="Where does it fits?"
                    value={this.state.category}
                    onChangeText={category => this.setState({ category })}
                  />
                </Item>
              </Form>
            )}
          </Content>
          {this.props.loading && <LoadingView />}
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
