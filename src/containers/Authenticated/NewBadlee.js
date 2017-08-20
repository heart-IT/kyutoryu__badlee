/**
 * @name- NewBadlee
 */

"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleProvider,
  Container,
  Content,
  View,
  Header,
  Left,
  Right,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Input
} from "native-base";
import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";

import ImagePicker from "react-native-image-picker";

import Main from "./Container";

class NewBadlee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badleePhoto: null,
      description: null,
      ip: "11.12.13.14",
      location: null,
      purpose: this.props.params.type ? this.props.params.type : null,
      category: null
    };
  }
  componentDidMount() {}
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
      if (response.didCancel) {
        console.log("user cancelled photo picker");
      } else if (response.error) {
        console.log("Imagepicker error : ", response.error);
      } else if (response.customButton) {
        console.log("user tapped custom button : ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          badleePhoto: source
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
        <Container style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Header>
            <Left>
              <Button transparent onPress={this.backPress.bind(this)}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={this.saveBadlee.bind(this)}>
                <Text>POST</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Button
              onPress={this.selectPhotoTapped.bind(this)}
              style={styles.imagePicker}
            >
              <View>
                {this.state.badleePhoto === null
                  ? <Text>Select a photo</Text>
                  : <Image source={this.state.badleePhoto} />}
              </View>
            </Button>
            <Form>
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
  imagePicker: {
    height: 60,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomWidth: 4,
    marginTop: 15,
    marginBottom: 15
  }
};

const _Wrapped = connect(
  state => ({ loading: state.get("isLoading") }),
  actionCreators
)(NewBadlee);

export default _Wrapped;
