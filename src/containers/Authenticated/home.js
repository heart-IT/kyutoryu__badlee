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

import User from "./user";
import Comments from "./Comments";

class Home extends Component {
  state = {
    tabNames: ["following", "location", "globe"],
    activeTabIndex: 0,
    paging: { page: 0, limit: 5 },
    currentData: [],
    filter: {
      searching: "",
      purpose: "",
      location: "",
      category: ""
    }
  };

  constructor(props) {
    super(props);
    this.onTabChange = this.onTabChange.bind(this);
    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.onListEnd = this.onListEnd.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickWish = this.onClickWish.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

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
    let limit = i.i === 2 ? 20 : 5;
    this.setState(
      { activeTabIndex: i.i, paging: { page: 0, limit: limit } },
      () => {
        this.getBadlees();
      }
    );
  }

  onFlatListRefresh() {
    let { page, limit } = this.state.paging;
    this.setState({ paging: { page: 0, limit: limit } }, () => {
      this.getBadlees();
    });
  }

  onListEnd() {
    let { page, limit } = this.state.paging;
    this.setState(
      {
        paging: {
          page: page + 1,
          limit: limit
        }
      },
      () => {
        let { tabNames, activeTabIndex } = this.state;
        if (!this.checkForPagination(tabNames[activeTabIndex])) {
          alert("list end");
          this.formatAndUpdatePropData(this.props);
        } else {
          this.getBadlees();
        }
      }
    );
  }

  onClickUser(id) {
    requestAnimationFrame(() => {
      this.props.showUserPage(id, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }

  onClickLike(id, didLike) {
    console.log(id);
    didLike ? this.props.onClickLike(id) : this.props.onClickUnlike(id);
  }
  onClickWish(id, didWish) {
    didWish ? this.props.onClickWish(id) : this.props.onClickUnwish(id);
  }
  onClickComment(id) {
    requestAnimationFrame(() => {
      this.props.showCommentPage(id, {
        navigator: this.props.navigator,
        component: Comments
      });
    });
  }
  onClickDelete(id) {
    console.log(id);
  }

  render() {
    let _this = this;
    function returnIcon(name, position, width = 21, height = 21) {
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
          onChangeTab={this.onTabChange}
          initialPage={this.state.activeTabIndex}
        >
          <Tab
            heading={
              <TabHeading style={{ ...styles.tab, ...styles.firstTab }}>
                {returnIcon("community", 0, 27, 27)}
              </TabHeading>
            }
          >
            <BadleeList
              data={this.state.currentData}
              type="card"
              onClickUser={_this.onClickUser}
              onClickLike={_this.onClickLike}
              onClickWish={_this.onClickWish}
              onClickComment={_this.onClickComment}
              onClickDelete={_this.onClickDelete}
              onFlatListRefresh={_this.onFlatListRefresh}
              onListEnd={_this.onListEnd}
              loggedUserID={_this.props.user.get("user_id")}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tab}>
                {returnIcon("location", 1)}
              </TabHeading>
            }
          >
            <BadleeList
              data={this.state.currentData}
              type="grid"
              toShowPurpose={true}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ ...styles.tab, ...styles.lastTab }}>
                {returnIcon("globe", 2)}
              </TabHeading>
            }
          />
        </Tabs>
      </StyleProvider>
    );
  }
}

var styles = {
  tab: { backgroundColor: "#fff" },
  firstTab: { paddingLeft: "12.5%" },
  lastTab: { paddingRight: "12.5%" }
};

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
