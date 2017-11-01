/**
 * @name- Picker.js
 * 
 * @chill- Men concern themselves most about that which passes away- They are like a blind man set to look after a burning lamp.- Buddha
 * 
 * 
 * @description- Component for creating a autocomplete search like dropdown.
 * 
 * @author- heartit pirates were here
 * 
 */

"use strict";

import {
  Body,
  Button,
  Card,
  CardItem,
  CheckBox,
  Input,
  Item,
  Right,
  StyleProvider,
  Text,
  View,
  Radio
} from "native-base";
import React, { PureComponent } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Fuse from "fuse.js";
import { Map } from "immutable";

import { Categories, Locations, Report, UserMenu } from "../constants";
import getTheme from "../theme/components";
import Icon from "./Icon";

export default class Picker extends PureComponent {
  _keyExtractor = (item, index) => item.id;
  constructor(props) {
    super(props);
    let allData = [];
    if (this.props.type === "location") {
      allData = Locations;
    } else if (this.props.type === "category") {
      allData = Categories;
    } else if (this.props.type === "userMenu") {
      allData = UserMenu;
    } else {
      allData = Report;
    }
    this.state = {
      searchInputValue: "",
      allData: allData,
      currentData: allData,
      fuseSearchKey:
        this.props.type === "location" ? ["city", "state"] : ["name"],
      multiselect: this.props.multiselect,
      needSearch: this.props.needSearch,
      needSubmitButton: this.props.type === "userMenu" ? false : true,
      onePunchGo: this.props.type === "userMenu" ? true : false
    };
    this.closeIconClicked = this.closeIconClicked.bind(this);
    this.onSearchType = this.onSearchType.bind(this);
    this._onPressSubmit = this._onPressSubmit.bind(this);

    let selected = new Map();
    let selectedValue = this.props.selectedValue;
    if (selectedValue) {
      if (this.props.multiselect) {
        selectedValue.map(value => {
          selected = selected.set(value.id, true);
        });
      } else {
        if (selectedValue.id) {
          selected = selected.set(selectedValue.id, true);
        }
      }
    }
    this.state.selected = selected;
  }

  componentDidMount() {}

  _onPressItem = item => {
    // updater functions are preferred for transactional updates
    if (
      !this.props.maximumValues ||
      (this.props.maximumValues &&
        this.state.selected.size < this.props.maximumValues)
    ) {
      this.setState(
        state => {
          // copy the map rather than modifying state.
          let oldSelected = new Map(state.selected);
          let itemOldValue = !!oldSelected.get(item.id);
          if (!state.multiselect) {
            oldSelected = oldSelected.clear().set(item.id, itemOldValue);
          }
          const selected = oldSelected.set(item.id, !oldSelected.get(item.id)); // toggle
          return { selected };
        },
        () => {
          this.state.onePunchGo && this._onPressSubmit();
        }
      );
    }
  };

  onSearchType(text) {
    let searchedData;
    if (text) {
      searchedData = fuseSearchActivate(
        text,
        this.state.allData,
        this.state.fuseSearchKey
      );
    } else {
      searchedData = this.state.allData;
    }
    this.setState({ currentData: searchedData, searchInputValue: text });

    function fuseSearchActivate(searchString, values, fuseKeys) {
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: fuseKeys
      };
      var fuse = new Fuse(values, options); // "list" is the item array
      return fuse.search(searchString);
    }
  }

  closeIconClicked() {
    this.props.onPickerClose();
  }

  _onPressSubmit() {
    let stateJS =
      this.state.selected && this.state.selected.size
        ? this.state.selected.toJS()
        : {};
    let selectedIDs = [];
    for (var key in stateJS) {
      if (stateJS.hasOwnProperty(key)) {
        if (stateJS[key]) {
          selectedIDs.push(key);
        }
      }
    }
    let selectedValues = selectedIDs.map(id => {
      return this.state.allData.filter(data => {
        return data.id === parseInt(id, 10);
      })[0];
    });
    if (this.props.badleeId) {
      selectedValues[0].badleeId = this.props.badleeId;
    }
    this.props.onPickerSubmit(selectedValues);
  }

  _renderItem = ({ item }) => (
    <PickerItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      multiselect={this.state.multiselect}
      title={
        this.props.type === "location"
          ? item.city + ", " + item.state
          : item.name
      }
      toShowSelection={!this.state.onePunchGo}
    />
  );

  render() {
    let items = this.state.currentData;
    let headText = "Select Location";
    if (this.props.type === "category") {
      headText = "Select Interest";
    }
    if (this.props.type === "report") {
      headText = "Choose a reason";
    }
    if (this.props.type === "userMenu") {
      headText = "Select a option";
    }
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.pickerWrapper}>
          <Card style={styles.pickerCard}>
            <CardItem header>
              <View style={styles.cardHead}>
                <Text style={styles.headText}>{headText}</Text>
                <TouchableOpacity
                  onPress={this.closeIconClicked}
                  style={styles.pickerClose}
                >
                  <Icon
                    name="menuCloseIcon"
                    width="16"
                    height="16"
                    stroke="rgba(0, 0 ,0 ,0.87)"
                    fill="rgba(0, 0 ,0 ,0.87)"
                    strokeWidth="2"
                  />
                </TouchableOpacity>
              </View>
            </CardItem>
            <CardItem style={styles.cardBodyItem}>
              <Body style={styles.cardBody}>
                {this.state.needSearch && (
                  <Item
                    style={{
                      height: 36,
                      borderWidth: 1,
                      borderColor: "#e0e0e0",
                      borderRadius: 18,
                      paddingLeft: 12,
                      backgroundColor: "#eeeeee"
                    }}
                    regular
                  >
                    <Icon name="search" width="15" height="15" />
                    <Input
                      placeholder="search.."
                      value={this.state.searchInputValue}
                      onChangeText={text => this.onSearchType(text)}
                      style={{
                        paddingLeft: 6
                      }}
                    />
                  </Item>
                )}
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
            {this.state.needSubmitButton && (
              <CardItem footer style={{ height: 40 }}>
                <Right>
                  <Button style={{ height: 30 }} onPress={this._onPressSubmit}>
                    <Text>Select</Text>
                  </Button>
                </Right>
              </CardItem>
            )}
          </Card>
        </View>
      </StyleProvider>
    );
  }
}

class PickerItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props);
  };

  render() {
    var selected = this.props.selected;
    var multiselect = this.props.multiselect;
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.ListItem}>
        <Text style={{ fontSize: 15, flex: 1 }}>{this.props.title}</Text>
        <View style={{ paddingRight: 18 }}>
          {this.props.toShowSelection &&
            (!multiselect ? (
              <Radio
                selected={selected}
                style={{
                  borderColor: "#611265",
                  width: 24,
                  height: 24
                }}
                onPress={this._onPress}
              />
            ) : (
              <CheckBox
                style={{
                  borderColor: "#611265",
                  width: 15,
                  height: 15
                }}
                checked={selected}
                onPress={this._onPress}
              />
            ))}
        </View>
      </TouchableOpacity>
    );
  }
}

let styles = {
  pickerWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999999,
    width: "100%",
    height: "100%"
  },
  pickerCard: {
    marginTop: "4%",
    marginLeft: "5%",
    marginBottom: "4%",
    width: "90%",
    zIndex: 999999,
    backgroundColor: "#fff"
  },
  cardHead: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#611265",
    paddingTop: 3,
    position: "relative"
  },
  headText: { color: "#611265", fontSize: 16, fontWeight: "bold" },
  pickerClose: {
    width: 16,
    position: "absolute",
    top: 0,
    right: 0
  },
  cardBodyItem: { flex: 1, paddingTop: 6 },
  cardBody: { flex: 1 },
  ListItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 24,
    marginTop: 6,
    marginBottom: 3,
    paddingLeft: 6,
    paddingRight: 6
  }
};
