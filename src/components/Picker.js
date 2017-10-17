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
import { Map } from 'immutable';
import { Body, Button, Card, CardItem, CheckBox, Input, Item, Right, StyleProvider, Text, View } from 'native-base';
import React from 'react';
import { Component, PureComponent } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Categories, Locations } from '../constants';
import getTheme from '../theme/components';
import Icon from './Icon';

("use strict");

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props);
  };

  render() {
    var title = this.props.title;
    var selected = this.props.selected;
    console.log("my list item selected? ", selected);
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 24,
          marginTop: 6,
          marginBottom: 3,
          paddingLeft: 6,
          paddingRight: 6,
          borderBottomWidth: 1,
          borderColor: "#fafafa"
        }}
      >
        <Text style={{ fontSize: 15, flex: 1 }}>{title}</Text>
        <View style={{ paddingRight: 18 }}>
          <CheckBox
            style={{
              borderColor: "#611265",
              width: 15,
              height: 15
            }}
            checked={selected}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default class Picker extends PureComponent {
  _keyExtractor = (item, index) => item.id;
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      data: this.props.type === "location" ? Locations : Categories,
      multiselect: this.props.type === "location",
      selected: new Map()
    };
    this.closeIconClicked = this.closeIconClicked.bind(this);
  }

  _onPressItem = item => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const oldSelected = new Map(state.selected);
      const selected = oldSelected.set(item.id, !oldSelected.get(item.id)); // toggle
      console.log(selected);
      return { selected };
    });
  };

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

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.city + ", " + item.state}
    />
  );

  render() {
    let items = this.state.data;

    return (
      <StyleProvider style={getTheme()}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.16)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            width: "100%",
            height: "100%"
          }}
        >
          <Card
            style={{
              marginTop: "6%",
              marginLeft: "5%",
              width: "90%",
              zIndex: 99999,
              height: "90%",
              backgroundColor: "#fff"
            }}
          >
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
                  <FlatList
                    data={items}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    style={{
                      width: "100%",
                      paddingTop: 6
                    }}
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
        </View>
      </StyleProvider>
    );
  }
}
