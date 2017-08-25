/**
 * @chill- Even as the dense and solid rock Cannot be stirred by either wind or storm: Even so the wise cannot be moved By voices of blame or voices of praise - Buddha
 * @name- NewBadlee
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
  Icon as IconX,
  Item
} from "native-base";
import ImagePicker from "react-native-image-picker";

import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import * as actionCreators from "../../badlee__redux/action_creators";

import Main from "./Container";
import LoadingView from "../../components/LoadingView";

class NewBadlee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badleePhotoSource: null,
      badleePhotoName: null,
      badleePhotoType: null,
      description: null,
      ip: "11.12.13.14",
      location: null,
      purpose: this.props.params.type ? this.props.params.type : null,
      category: null
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
      quality: "1.0",
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      console.log(response.didCancel);
      console.log(response.error);
      console.log(response.customButton);
      if (response.didCancel) {
        console.log("user cancelled photo picker");
      } else if (response.error) {
        console.log("Imagepicker error : ", response.error);
      } else if (response.customButton) {
        console.log("user tapped custom button : ", response.customButton);
      } else {
        console.log(response);
        let source = { uri: response.uri };
        this.setState({
          badleePhotoSource: source,
          badleePhotoName: response.fileName,
          badleePhotoType: response.type
        });
      }
    });
  }
  saveBadlee() {
    requestAnimationFrame(() => {
      this.props.saveBadlee(
        this.state.badleePhoto,
        this.state.description,
        this.state.ip,
        this.state.location,
        this.state.purpose,
        this.state.category,
        {
          navigator: this.props.navigator,
          component: Main,
          reset: true
        }
      );
    });
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          {this.props.loading && <LoadingView />}
          <Header style={{ backgroundColor: "#611265" }}>
            <Left>
              <Button transparent onPress={this.backPress.bind(this)}>
                <IconX name="arrow-back" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={this.saveBadlee.bind(this)}>
                <Text style={{ color: "#fff", fontSize: 15 }}>POST</Text>
              </Button>
            </Right>
          </Header>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Form style={{ flex: 1, display: "flex" }}>
              <View style={styles.badleePhotoWrapper}>
                {this.state.badleePhotoSource &&
                  <Image
                    style={styles.avatar}
                    source={this.state.badleePhotoSource}
                  />}
                {!this.state.badleePhotoSource &&
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
                  </Button>}
                <Text>Hello</Text>
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
                />
              </Item>
              <Item>
                <Input
                  placeholder="Purpose"
                  disabled
                  value={this.state.purpose}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Where does it fits?"
                  value={this.state.category}
                  onChangeText={category => this.setState({ category })}
                />
              </Item>
            </Form>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

var styles = {
  badleePhotoWrapper: {
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1
  },
  avatar: {
    width: 160,
    height: 160,
    marginLeft: "auto",
    marginRight: "auto"
  }
};

const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
