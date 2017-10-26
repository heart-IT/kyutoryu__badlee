/**
 * @name- GlobeFilters.js
 * 
 * @chill- Do not look back on happiness or dream of it in the future. You are only sure of today: do not let yourself be cheated out of it. -Henry Ward Beecher
 * 
 * 
 * @description- Filters used in Globe Tab
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import { StyleProvider, View, Item, Input, Radio, Text } from "native-base";
import getTheme from "../theme/components";
import Icon from "./Icon";

import { TouchableOpacity } from "react-native";
export default class GlobeFilters extends Component {
  state = {
    search: "",
    purpose: "",
    location: "",
    category: ""
  };
  searchInputChanged() {
    var search = this.state.search;
    this.props.globeSearchingFor(search);
  }
  onRadioExchangeSelect() {
    if (this.state.purpose === "exchange") {
      this.setState({ purpose: "" }, () => {
        this.props.onRadioUnselect();
      });
    } else {
      this.setState({ purpose: "exchange" }, () => {
        this.props.onPurposeSelect("exchange");
      });
    }
  }
  onRadioShowoffSelect() {
    if (this.state.purpose === "showoff") {
      this.setState({ purpose: "" }, () => {
        this.props.onRadioUnselect();
      });
    } else {
      this.setState({ purpose: "showoff" }, () => {
        this.props.onPurposeSelect("showoff");
      });
    }
  }
  onRadioShoutoutSelect() {
    if (this.state.purpose === "shoutout") {
      this.setState({ purpose: "" }, () => {
        this.props.onRadioUnselect();
      });
    } else {
      this.setState({ purpose: "shoutout" }, () => {
        this.props.onPurposeSelect("shoutout");
      });
    }
  }
  openLocationPicker() {
    this.props.openLocationPicker();
  }
  openCategoryPicker() {
    this.props.openCategoryPicker();
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View>
          <View style={styles.filterWrapper}>
            <View style={styles.inputWrapper}>
              <Item rounded style={styles.searchItem}>
                <Icon name="search" width="15" height="15" />
                <Input
                  placeholder="Search for folks or thingies.."
                  style={styles.searchInput}
                  value={this.state.search}
                  onChangeText={searchString =>
                    this.setState({ search: searchString })}
                  onEndEditing={this.searchInputChanged.bind(this)}
                />
              </Item>
            </View>
            <View style={styles.subFilterWrapper}>
              <View style={styles.centerRow}>
                <Icon name="exchange" width="21" height="21" />
                <Radio
                  style={styles.purposeRadio}
                  selected={this.state.purpose === "exchange" ? true : false}
                  onPress={this.onRadioExchangeSelect.bind(this)}
                />
                <Icon name="showoff" width="24" height="24" />
                <Radio
                  style={styles.purposeRadio}
                  selected={this.state.purpose === "showoff" ? true : false}
                  onPress={this.onRadioShowoffSelect.bind(this)}
                />
                <Icon name="shoutout" width="21" height="21" />
                <Radio
                  style={styles.purposeRadio}
                  selected={this.state.purpose === "shoutout" ? true : false}
                  onPress={this.onRadioShoutoutSelect.bind(this)}
                />
              </View>
              <TouchableOpacity
                style={styles.centerRow}
                onPress={this.openLocationPicker.bind(this)}
              >
                <Text style={styles.filterText}>Location</Text>
                <Icon name="drop_arrow" width="16" height="10" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.centerRow}
                onPress={this.openCategoryPicker.bind(this)}
              >
                <Text style={styles.filterText}>Category</Text>
                <Icon name="drop_arrow" width="16" height="10" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </StyleProvider>
    );
  }
}

var styles = {
  filterWrapper: {
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  inputWrapper: {
    padding: 12
  },
  searchItem: {
    height: 42,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingLeft: 12,
    backgroundColor: "#eeeeee"
  },
  searchInput: { height: 42, lineHeight: 42, fontSize: 15 },
  subFilterWrapper: {
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  purposeRadio: { marginLeft: 3, marginRight: 9 },
  filterText: { fontSize: 15 }
};
