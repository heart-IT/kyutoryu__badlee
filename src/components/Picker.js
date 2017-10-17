/**
 * @name- Picker.js
 * 
 * @chill- Men concern themselves most about that which passes away- They are like a blind man set to look after a burning lamp.- Buddha
 * 
 * 
 * @description- Component for creating a autocomplete search like dropdown.
 * 
 * @author- heartit pirates were here
 */
import Fuse from 'fuse.js';
import {
    Body,
    Button,
    Card,
    CardItem,
    CheckBox,
    Container,
    Content,
    Input,
    Item,
    List,
    ListItem,
    Right,
    StyleProvider,
    Text,
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import getTheme from '../theme/components';
import Icon from './Icon';

("use strict");

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      data: this.props.type === "location" ? Locations : Categories,
      multiselect: this.props.type === "location",
      selectedValues: []
    };
    this.closeIconClicked = this.closeIconClicked.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }
  onSearchType(text) {
    if (text) {
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["city", "state"]
      };
      var fuse = new Fuse(Locations, options); // "list" is the item array
      var result = fuse.search(text);
      this.setState({ searchInputValue: text, data: result });
    } else {
      this.setState({ data: Locations, searchInputValue: text });
    }
  }
  closeIconClicked() {
    this.props.goBack();
  }

  itemClicked(item) {
    const value = `${item.city}, ${item.state}`;
    const values = Object.assign([], this.state.selectedValues);
    if (values.indexOf(value) === -1) {
      values.push(value);
    } else {
      values.pop(value);
    }
    console.log(values);
    this.setState({
      selectedValues: values
    });
    // this.props.itemClicked();
  }

  render() {
    var items = this.state.data;
    console.log("is render", this.state.selectedValues);
    let selectedValues = this.state.selectedValues;

    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={{
              flex: 1,
              padding: 9,
              backgroundColor: "#eeeeee"
            }}
          >
            <Card>
              <CardItem
                header
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#611265",
                    paddingTop: 3,
                    position: "relative"
                  }}
                >
                  <Text style={{ color: "#611265", fontSize: 17 }}>
                    Select a location
                  </Text>
                  <TouchableOpacity
                    onPress={this.closeIconClicked}
                    style={{
                      width: 24,
                      paddingLeft: 7,
                      position: "absolute",
                      top: 0,
                      right: 0
                    }}
                  >
                    <Icon
                      name="menuCloseIcon"
                      width="12"
                      height="12"
                      stroke="rgba(0, 0 ,0 ,0.87)"
                      fill="rgba(0, 0 ,0 ,0.87)"
                      strokeWidth="2"
                    />
                  </TouchableOpacity>
                </View>
              </CardItem>
              <CardItem style={{ flex: 1 }}>
                <Body style={{ paddingTop: 6, flex: 1 }}>
                  <Item
                    style={{
                      height: 36,
                      borderColor: "#bdbdbd"
                    }}
                    regular
                  >
                    <Input
                      placeholder="search.."
                      value={this.state.searchInputValue}
                      onChangeText={text => this.onSearchType(text)}
                      style={{
                        height: 36,
                        fontSize: 16,
                        lineHeight: 9,
                        color: "rgba(0, 0, 0, 0.87)",
                        paddingLeft: 9
                      }}
                    />
                  </Item>
                  {items.length > 0 && (
                    <List
                      style={{ flex: 1, width: "100%", paddingTop: 6 }}
                      dataArray={items}
                      button={true}
                      renderRow={item => (
                        <ListItem
                          style={{
                            paddingTop: 6,
                            paddingBottom: 9,
                            width: "100%"
                          }}
                          onPress={() => this.itemClicked(item)}
                        >
                          <Body
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingRight: 18
                            }}
                          >
                            <Text style={{ fontSize: 15 }}>
                              {item.city}, {item.state}
                            </Text>
                            {console.log(
                              selectedValues.indexOf(
                                `${item.city}, ${item.state}`
                              ) === -1
                            )}
                            <CheckBox
                              style={{
                                borderColor: "#611265",
                                width: 15,
                                height: 15,
                                backgroundColor: "green"
                              }}
                              checked={
                                selectedValues.indexOf(
                                  `${item.city}, ${item.state}`
                                ) === -1
                                  ? false
                                  : true
                              }
                            />
                          </Body>
                        </ListItem>
                      )}
                    />
                  )}
                  {items.length === 0 && (
                    <View style={{ marginTop: 18, width: "100%" }}>
                      <Text style={{ textAlign: "center" }}>No Results!</Text>
                    </View>
                  )}
                </Body>
              </CardItem>
              <CardItem footer style={{ height: 40 }}>
                <Right>
                  <Button style={{ height: 30 }}>
                    <Text>Select</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
