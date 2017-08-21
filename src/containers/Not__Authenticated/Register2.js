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
  Picker
} from "native-base";
var ImagePicker = require("react-native-image-picker");

import getTheme from "../../theme/components";
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
      avatarSource: null
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
    console.log(date);
  }
  crazyBtnClicked() {
    this.datePicker.onPressDate();
  }

  render() {
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
                style={{ paddingLeft: "27%", paddingTop: 45, paddingRight: 15 }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Radio selected={true} />
                  <Text
                    style={{ marginRight: 30, marginLeft: 3, color: "#4f0554" }}
                  >
                    He
                  </Text>
                  <Radio selected={false} />
                  <Text
                    style={{ marginRight: 30, marginLeft: 3, color: "#4f0554" }}
                  >
                    She
                  </Text>
                  <Radio selected={false} />
                  <Text style={{ marginLeft: 3, color: "#4f0554" }}>Ze</Text>
                </View>
                <View>
                  <Button onPress={this.crazyBtnClicked.bind(this)}>
                    <Text>Buton</Text>
                  </Button>
                  <DatePicker
                    date={this.state.date}
                    style={{ width: 0 }}
                    ref={d => {
                      this.datePicker = d;
                    }}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={this.onDateChange.bind(this)}
                  />
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
    borderRadius: 75,
    width: 150,
    height: 150
  }
};

const _Wrapped = connect(
  (state: State) => ({
    loading: state.get("loading")
  }),
  actionCreators
)(Register2);

export default _Wrapped;
