/**
 * @name- home.js
 * 
 * @chill- Great is the person who does not lose their childlike heart.- Mencius
 * 
 * 
 * @description- This file displays home tab of badlee application.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import { StyleProvider, Tab, TabHeading, Tabs } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../badlee__redux/action_creators";

import Icon from "../../components/Icon";
import BadleeList from "../../components/BadleeList";
import getTheme from "../../theme/components";

class Home extends Component {
  state = {
    tabNames: ["following", "location", "globe"],
    activeTabIndex: 0,
    paging: { page: 0, limit: 4 },
    currentData: [],
    filter: {
      searching: "",
      purpose: "",
      location: "",
      category: ""
    }
  };

  // in case of props are changed, format and update state with currentData
  componentWillReceiveProps(nextProps) {
    this.formatAndUpdatePropData(nextProps);
  }
  // format and update state with propData
  formatAndUpdatePropData(propData) {
    let { allBadlees, badleeIDs } = propData;
    let showingBadleeIDs = badleeIDs.get(
      this.state.tabNames[this.state.activeTabIndex]
    );
    let currentData = showingBadleeIDs
      .map(id => allBadlees.get(String(id)))
      .toJS();
    this.setState({ currentData: currentData });
  }

  // get badlees on component mounting.
  componentDidMount() {
    this.getBadlees();
  }

  /**
   * Get Badlees Section
   */
  getBadlees() {
    // if pagination exists, dont fetch badlees online
    if (
      !this.checkForPagination(this.state.tabNames[this.state.activeTabIndex])
    ) {
      this.formatAndUpdatePropData(this.props);
    } else {
      switch (this.state.activeTabIndex) {
        case 0:
          this.getBadleeByFollowing();
          break;
        case 1:
          this.getBadleeByLocation();
          break;
        default:
          this.getBadleeByGlobe();
      }
    }
  }

  checkForPagination(tabName) {
    let pagingEndsIn = this.props.pagingEndsIn.get(tabName);
    let badleeIDs = this.props.badleeIDs.get(tabName);
    let { page, limit } = this.state.paging;
    // if pagingEnds and we are trying higher value, then we wont request.  !(A && B) = !A || !B
    if (
      (page + 1) * limit > badleeIDs.size &&
      (pagingEndsIn === -1 || page < pagingEndsIn)
    ) {
      return true;
    }
  }

  getBadleeByFollowing() {
    let { page, limit } = this.state.paging;
    this.props.getBadlees({
      tabName: "following",
      offset: page * limit,
      limit: limit
    });
  }

  getBadleeByLocation() {
    let { page, limit } = this.state.paging;
    this.props.getBadlees({
      tabName: "location",
      currentLocation: "Jaipur, Rajasthan, India",
      offset: page * limit,
      limit: limit
    });
  }

  getBadleeByGlobe() {
    let { page, limit } = this.state.paging;
    this.props.getBadlees({
      tabName: "globe",
      search: this.state.filter.searching,
      purpose: this.state.filter.purpose,
      location: this.state.filter.location,
      category: this.state.filter.category,
      offset: page * limit,
      limit: limit
    });
  }

  /**
   * Component Events section
   */

  // on tab change, update tabIndex and pagination values. After updating, get list of badlees.
  onTabChange(i, ref) {
    let limit;
    if (i.i === 2) {
      limit = 20;
    } else {
      limit = 4;
    }
    this.setState(
      { activeTabIndex: i.i, paging: { page: 0, limit: limit } },
      () => {
        this.getBadlees();
      }
    );
  }

  render() {
    let _this = this;
    function returnIcon(name, position, width = 19, height = 19) {
      return (
        <Icon
          name={name}
          width={width}
          height={height}
          fill={_this.state.activeTabIndex === position ? "#611265" : "#4D4D4D"}
          stroke={
            _this.state.activeTabIndex === position ? "#611265" : "#4D4D4D"
          }
        />
      );
    }
    return (
      <StyleProvider style={getTheme()}>
        <Tabs
          onChangeTab={this.onTabChange.bind(this)}
          initialPage={this.state.activeTabIndex}
        >
          <Tab
            heading={
              <TabHeading>{returnIcon("community", 0, 22, 22)}</TabHeading>
            }
          >
            <BadleeList data={this.state.currentData} type="card" />
          </Tab>
          <Tab heading={<TabHeading>{returnIcon("location", 1)}</TabHeading>}>
            <BadleeList
              data={this.state.currentData}
              type="grid"
              toShowPurpose={true}
            />
          </Tab>
          <Tab heading={<TabHeading>{returnIcon("globe", 2)}</TabHeading>}>
            <BadleeList
              data={this.state.currentData}
              type="grid"
              toShowPurpose={true}
            />
          </Tab>
        </Tabs>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    user: state.getIn([
      "user",
      "usersInformation",
      state.getIn(["user", "loggedUserID"])
    ]),
    allBadlees: state.getIn(["badlees", "data"]),
    badleeIDs: state.getIn(["badlees", "tabs"]),
    pagingEndsIn: state.getIn(["badlees", "pagingEndsIn", "tabs"])
  }),
  actionCreators
)(Home);

export default _Wrapped;
