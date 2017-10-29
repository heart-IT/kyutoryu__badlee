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

import { StyleProvider, Tab, TabHeading, Tabs, View, Text } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import * as actionCreators from "../../badlee__redux/action_creators";

import Icon from "../../components/Icon";
import BadleeList from "../../components/BadleeList";
import GlobeFilters from "../../components/GlobeFilters";
import getTheme from "../../theme/components";
import Picker from "../../components/Picker";
import BadleeFab from "../../components/Fab";
import SingleBadlee from "./singleBadlee";
import NewBadlee from "./newBadlee";
import User from "./user";
import Comments from "./comments";
import Reactions from "./reactions";
import Search from "./search";

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
    },
    toShowPurpose: true,
    isActive: false,
    pickerSelectedValue: ""
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
    this.onClickBadlee = this.onClickBadlee.bind(this);
    this.onClickReaction = this.onClickReaction.bind(this);
    this.onClickReport = this.onClickReport.bind(this);

    this.openLocationPicker = this.openLocationPicker.bind(this);
    this.openCategoryPicker = this.openCategoryPicker.bind(this);
    this.onSearchPressed = this.onSearchPressed.bind(this);
    this.globeSearchingFor = this.globeSearchingFor.bind(this);
    this.onPurposeSelect = this.onPurposeSelect.bind(this);
    this.onRadioUnselect = this.onRadioUnselect.bind(this);
    this.onFabSelect = this.onFabSelect.bind(this);
    this.onFabToggle = this.onFabToggle.bind(this);
    this.closeFab = this.closeFab.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.onPickerSubmit = this.onPickerSubmit.bind(this);
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
    if ((pagingEndsIn !== -1 && page < pagingEndsIn) || pagingEndsIn === -1) {
      return true;
    }
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
    if (
      this.props.user.get("following") &&
      this.props.user.get("following").size
    ) {
      this.props.getBadlees({
        tabName: "following",
        offset: page * limit,
        limit: limit
      });
    } else {
      this.setState({ currentData: [] });
    }
  }

  getBadleeByLocation() {
    let { page, limit } = this.state.paging;
    this.props.getBadlees({
      tabName: "location",
      currentLocation: this.props.user.get("location").split(",")[0],
      offset: page * limit,
      limit: limit
    });
  }

  getBadleeByGlobe() {
    let { page, limit } = this.state.paging;
    this.props.getBadlees({
      tabName: "globe",
      search: this.state.filter.search,
      purpose: this.state.filter.purpose,
      location: this.state.filter.location.city,
      category: this.state.filter.category.name,
      offset: page * limit,
      limit: limit
    });
  }

  /**
   * Component Events section
   */

  onFabSelect(purpose) {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee,
        params: { purpose }
      });
    });
  }
  onFabToggle(fabValue) {
    this.setState({ isActive: !fabValue });
  }
  closeFab() {}

  // on tab change, update tabIndex and pagination values. After updating, get list of badlees.
  onTabChange(i, ref) {
    let limit = i.i === 2 ? 32 : 5;
    this.setState(
      {
        activeTabIndex: i.i,
        paging: { page: 0, limit: limit },
        currentData: []
      },
      () => {
        let { tabNames, activeTabIndex } = this.state;
        this.getBadlees();
        // if (!this.checkForPagination(tabNames[activeTabIndex])) {
        //   this.formatAndUpdatePropData(this.props);
        // } else {
        // }
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
        this.getBadlees();
        // if (!this.checkForPagination(tabNames[activeTabIndex])) {
        //   this.formatAndUpdatePropData(this.props);
        // } else {
        // }
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
  onClickReaction(id) {
    requestAnimationFrame(() => {
      this.props.showReactionPage(id, {
        navigator: this.props.navigator,
        component: Reactions
      });
    });
  }
  onClickDelete(id) {}
  onClickReport(id) {
    this.setState({ showPicker: true, type: "report", badleeId: id });
  }

  onClickBadlee(id) {
    requestAnimationFrame(() => {
      this.props.showBadleePage(id, {
        navigator: this.props.navigator,
        component: SingleBadlee
      });
    });
  }

  onSearchPressed() {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: Search
      });
    });
  }

  globeSearchingFor(searchString) {
    var filteredState = Object.assign({}, this.state.filter, {
      search: searchString
    });
    this.setState(
      { filter: filteredState, paging: { page: 0, limit: 32 } },
      () => {
        this.getBadleeByGlobe();
      }
    );
  }

  onPurposeSelect(purpose) {
    var filteredState = Object.assign({}, this.state.filter, {
      purpose: purpose
    });
    this.setState(
      {
        filter: filteredState,
        toShowPurpose: false,
        paging: { page: 0, limit: 32 }
      },
      () => {
        this.getBadleeByGlobe();
      }
    );
  }
  onRadioUnselect() {
    var filteredState = Object.assign({}, this.state.filter, {
      purpose: ""
    });
    this.setState(
      {
        filter: filteredState,
        toShowPurpose: true,
        paging: { page: 0, limit: 32 }
      },
      () => {
        this.getBadleeByGlobe();
      }
    );
  }

  openLocationPicker() {
    this.setState({
      showPicker: true,
      type: "location",
      pickerSelectedValue: this.state.filter.location
        ? String(this.state.filter.location.id)
        : ""
    });
  }
  openCategoryPicker() {
    this.setState({
      showPicker: true,
      type: "category",
      pickerSelectedValue: this.state.filter.category
        ? String(this.state.filter.category.id)
        : ""
    });
  }
  closePicker() {
    this.setState({ showPicker: false });
  }

  onPickerSubmit(submittedVal) {
    if (this.state.type === "location") {
      let location = "";
      if (submittedVal && submittedVal.length) {
        location = submittedVal[0];
      }
      let filteredState = Object.assign({}, this.state.filter, {
        location: location
      });
      this.setState(
        {
          filter: filteredState,
          showPicker: false,
          paging: { page: 0, limit: 32 }
        },
        () => {
          this.getBadleeByGlobe();
        }
      );
    } else if (this.state.type === "category") {
      let category = "";
      if (submittedVal && submittedVal.length) {
        category = submittedVal[0];
      }
      let filteredState = Object.assign({}, this.state.filter, {
        category: category
      });
      this.setState(
        {
          filter: filteredState,
          showPicker: false,
          paging: { page: 0, limit: 32 }
        },
        () => {
          this.getBadleeByGlobe();
        }
      );
    } else {
      this.setState({ showPicker: false }, () => {
        let reason =
          submittedVal && submittedVal.length ? submittedVal[0].name : null;
        let badleeId =
          submittedVal && submittedVal.length ? submittedVal[0].badleeId : null;
        if (reason) {
          this.props.reportPost(badleeId, reason);
        }
      });
    }
  }

  render() {
    let reports = this.props.reports ? this.props.reports.toJS() : [];
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
    console.log(this.state.pickerSelectedValue);

    return (
      <StyleProvider style={getTheme()}>
        <View style={{ flex: 1 }}>
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
              {!this.state.currentData.length && (
                <View style={styles.NoDataView}>
                  <Icon name="noFollowIllustration" width="60" height="60" />
                  <Text style={styles.mainText}>
                    You are not following anyone.
                  </Text>
                  <Text style={styles.subText}>Follow lot of people</Text>
                  <Text style={styles.subText}>
                    to see lots of badlee here :D
                  </Text>
                </View>
              )}
              <BadleeList
                data={this.state.currentData}
                type="card"
                toShowPurpose={true}
                reports={reports}
                onClickUser={this.onClickUser}
                onClickLike={this.onClickLike}
                onClickWish={this.onClickWish}
                onClickComment={this.onClickComment}
                onClickReaction={this.onClickReaction}
                onClickDelete={this.onClickDelete}
                onClickReport={this.onClickReport}
                onFlatListRefresh={this.onFlatListRefresh}
                onListEnd={this.onListEnd}
                loggedUserID={this.props.user.get("user_id")}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.tab}>
                  {returnIcon("location", 1)}
                </TabHeading>
              }
            >
              {!this.state.currentData.length && (
                <View style={styles.NoDataView}>
                  <Icon name="noLocationIllustration" width="60" height="60" />
                  <Text style={styles.mainText}>
                    Hmm, No badlees in your location.
                  </Text>
                  <Text style={styles.subText}>Why dont you be the first!</Text>
                  <Text style={styles.subText}>and start a trend :D</Text>
                </View>
              )}
              <BadleeList
                data={this.state.currentData}
                type="card"
                toShowPurpose={true}
                onClickUser={this.onClickUser}
                onClickLike={this.onClickLike}
                onClickWish={this.onClickWish}
                onClickComment={this.onClickComment}
                onClickDelete={this.onClickDelete}
                onClickReaction={this.onClickReaction}
                onClickReport={this.onClickReport}
                onFlatListRefresh={this.onFlatListRefresh}
                onListEnd={this.onListEnd}
                loggedUserID={this.props.user.get("user_id")}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ ...styles.tab, ...styles.lastTab }}>
                  {returnIcon("globe", 2)}
                </TabHeading>
              }
            >
              {!this.state.showPicker && (
                <View
                  style={{
                    padding: 12,
                    paddingBottom: 6,
                    backgroundColor: "#f5f5f5",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1
                  }}
                >
                  <TouchableOpacity
                    onPress={this.onSearchPressed}
                    style={{
                      height: 42,
                      borderWidth: 1,
                      borderColor: "#e0e0e0",
                      paddingLeft: 12,
                      backgroundColor: "#eeeeee",
                      borderRadius: 21,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12
                    }}
                  >
                    <Icon name="search" width="15" height="15" />
                    <Text
                      style={{
                        color: "rgba(0, 0, 0, 0.70)",
                        fontSize: 15,
                        marginLeft: 6
                      }}
                    >
                      Search for folks or thingies
                    </Text>
                  </TouchableOpacity>
                  <GlobeFilters
                    openLocationPicker={this.openLocationPicker}
                    openCategoryPicker={this.openCategoryPicker}
                    globeSearchingFor={this.globeSearchingFor}
                    onPurposeSelect={this.onPurposeSelect}
                    onRadioUnselect={this.onRadioUnselect}
                    isLocationActive={!!this.state.filter.location}
                    isCategoryActive={!!this.state.filter.category}
                    style={{ flex: 1 }}
                  />
                </View>
              )}
              {!this.state.currentData.length && (
                <View style={styles.NoDataView}>
                  <Icon name="noGlobeIllustration" width="60" height="60" />
                  <Text style={styles.mainText}>Hmm, No badlees found.</Text>
                  <Text style={styles.subText}>That's weird..</Text>
                  <Text style={styles.subText}>
                    Try changing the filters :D
                  </Text>
                </View>
              )}
              <BadleeList
                data={this.state.currentData}
                type="grid"
                toShowPurpose={this.state.toShowPurpose}
                onClickBadlee={this.onClickBadlee}
                onFlatListRefresh={this.onFlatListRefresh}
                onListEnd={this.onListEnd}
                loggedUserID={this.props.user.get("user_id")}
              />
            </Tab>
          </Tabs>
          {this.state.isActive && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(97,18,101,0.6)"
              }}
              onPress={this.closeFab}
            />
          )}
          {!this.state.showPicker && (
            <BadleeFab
              isActive={false}
              onSelection={this.onFabSelect}
              onFabToggle={this.onFabToggle}
            />
          )}
          {this.state.showPicker && (
            <Picker
              type={this.state.type}
              multiselect={false}
              badleeId={this.state.badleeId}
              selectedValue={this.state.pickerSelectedValue}
              onPickerClose={this.closePicker}
              onPickerSubmit={this.onPickerSubmit}
            />
          )}
        </View>
      </StyleProvider>
    );
  }
}

var styles = {
  tab: { backgroundColor: "#fff" },
  firstTab: { paddingLeft: "12.5%" },
  lastTab: { paddingRight: "12.5%" },
  NoDataView: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: "12%",
    paddingRight: "12%",
    backgroundColor: "#eeeeee"
  },
  mainText: {
    textAlign: "center",
    marginBottom: 9,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#611265",
    fontWeight: "bold",
    marginTop: 12
  },
  subText: {
    textAlign: "center",
    lineHeight: 18,
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.87)"
  }
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
    pagingEndsIn: state.getIn(["badlees", "pagingEndsIn", "tabs"]),
    reports: state.get("reports")
  }),
  actionCreators
)(Home);

export default _Wrapped;
