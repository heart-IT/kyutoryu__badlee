/**
 * @name- search.js
 * 
 * @chill- Wherever there is a craving, there is pain: Quiet your craving and you are blessed. -Buddha
 * 
 * 
 * @description- Search Page
 * 
 * @author- heartit pirates were here
 */
"use strict";

import React, { Component } from "react";
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Body,
  Right,
  Text,
  Form,
  Item,
  Input,
  Content,
  Tab,
  Tabs,
  TabHeading,
  View
} from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import getTheme from "../../theme/components";
import Picker from "../../components/Picker";
import GlobeFilters from "../../components/GlobeFilters";
import BadleeList from "../../components/BadleeList";
import SingleBadlee from "./singleBadlee";
import { TouchableOpacity } from "react-native";
import User from "./user";
import UserList from "../../components/userList";
class Search extends Component {
  state = {
    showPicker: false,
    currentData: [],
    paging: { page: 0, limit: 32 },
    filter: {
      search: "",
      purpose: "",
      location: "",
      category: ""
    },
    type: "",
    search: "",
    toShowPurpose: true,
    activeTabIndex: 0,
    usersData: [],
    pickerSelectedValue: ""
  };
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
    this.openLocationPicker = this.openLocationPicker.bind(this);
    this.openCategoryPicker = this.openCategoryPicker.bind(this);
    this.onPurposeSelect = this.onPurposeSelect.bind(this);
    this.onRadioUnselect = this.onRadioUnselect.bind(this);
    this.onClickBadlee = this.onClickBadlee.bind(this);
    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.onListEnd = this.onListEnd.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onPickerSubmit = this.onPickerSubmit.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onFollow = this.onFollow.bind(this);
    this.onUnfollow = this.onUnfollow.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.activeTabIndex === 0) {
      this.formatAndUpdatePropData(nextProps);
    } else {
      let { users, searchingFor } = nextProps;
      let usersData = searchingFor.map(userID => users.get(userID).toJS());
      this.setState({ usersData: usersData });
    }
  }
  // format and update state with propData
  formatAndUpdatePropData(propData) {
    let { allBadlees, badleeIDs } = propData;
    let currentData = badleeIDs.map(id => allBadlees.get(String(id))).toJS();
    this.setState({ currentData: currentData });
  }
  componentDidMount() {
    this.getBadleeByGlobe();
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
  onTabChange(i, ref) {
    if (i.i === 0) {
      this.setState(
        {
          paging: { page: 0, limit: 32 },
          activeTabIndex: i.i,
          filter: {
            search: "",
            purpose: "",
            location: "",
            category: ""
          },
          search: "",
          pickerSelectedValue: "",
          toShowPurpose: true,
          currentData: []
        },
        () => {
          this.getBadleeByGlobe();
        }
      );
    } else {
      this.setState({
        activeTabIndex: i.i,
        currentData: [],
        search: ""
      });
    }
  }
  goBack() {
    this.props.goBack();
  }
  onFlatListRefresh() {
    let { page, limit } = this.state.paging;
    this.setState({ paging: { page: 0, limit: limit } }, () => {
      this.getBadleeByGlobe();
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
        this.getBadleeByGlobe();
      }
    );
  }
  onClickUser(userId) {
    requestAnimationFrame(() => {
      this.props.showUserPage(userId, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  onFollow(userId) {
    this.props.onFollowUser(userId);
  }
  onUnfollow(userId) {
    this.props.unFollowUser(userId);
  }
  searchingFor(searchString) {
    this.setState({ search: searchString });
    if (this.state.activeTabIndex === 0) {
      let filteredState;
      if (searchString && searchString.length >= 3) {
        filteredState = Object.assign({}, this.state.filter, {
          search: searchString
        });
      } else {
        filteredState = Object.assign({}, this.state.filter, {
          search: ""
        });
      }
      this.setState(
        {
          filter: filteredState,
          paging: { page: 0, limit: 32 }
        },
        () => {
          this.getBadleeByGlobe();
        }
      );
    } else {
      if (searchString && searchString.length >= 3) {
        this.props.searchForUser(searchString.replace(" ", "+"));
      }
    }
  }
  openLocationPicker() {
    this.setState({
      showPicker: true,
      type: "location",
      pickerSelectedValue: this.state.filter.location
        ? this.state.filter.location
        : {}
    });
  }
  openCategoryPicker() {
    this.setState({
      showPicker: true,
      type: "category",
      pickerSelectedValue: this.state.filter.category
        ? this.state.filter.category
        : []
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
    }
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
  onClickBadlee(id) {
    requestAnimationFrame(() => {
      this.props.showBadleePage(id, {
        navigator: this.props.navigator,
        component: SingleBadlee
      });
    });
  }
  render() {
    let userFollowing = this.props.userFollowing
      ? this.props.userFollowing
          .map(user => {
            return user.get("user_id_following");
          })
          .toJS()
      : [];
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={{ backgroundColor: "#fff" }}>
            <Left
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TouchableOpacity onPress={this.goBack}>
                <Icon name="menuBackIcon" width="18" height="18" />
              </TouchableOpacity>
              <Icon
                name="search"
                width="18"
                height="18"
                fill="#8a8a8a"
                style={{ marginLeft: 12, marginRight: 3 }}
              />
              <Form style={{ flex: 1, height: 36 }}>
                <Item style={{ marginLeft: 0, height: 36 }}>
                  <Input
                    placeholder="Search here..."
                    placeholderTextColor="#8a8a8a"
                    style={{ fontSize: 15 }}
                    value={this.state.search}
                    onChangeText={this.searchingFor}
                  />
                </Item>
              </Form>
            </Left>
          </Header>
          <Tabs initialPage={0} onChangeTab={this.onTabChange}>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Text>THINGIES</Text>
                </TabHeading>
              }
            >
              {!this.state.showPicker && (
                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: 12,
                    paddingBottom: 6,
                    paddingTop: 6,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1
                  }}
                >
                  <GlobeFilters
                    openLocationPicker={this.openLocationPicker}
                    openCategoryPicker={this.openCategoryPicker}
                    onPurposeSelect={this.onPurposeSelect}
                    onRadioUnselect={this.onRadioUnselect}
                    isLocationActive={!!this.state.filter.location}
                    isCategoryActive={!!this.state.filter.category}
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
                loggedUserID={this.props.loggedUserID}
              />
              {this.state.showPicker && (
                <Picker
                  type={this.state.type}
                  multiselect={false}
                  badleeId={this.state.badleeId}
                  onPickerClose={this.closePicker}
                  onPickerSubmit={this.onPickerSubmit}
                  selectedValue={this.state.pickerSelectedValue}
                  needSearch={true}
                />
              )}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#fff" }}>
                  <Text>FOLKS</Text>
                </TabHeading>
              }
            >
              {this.state.search.length < 3 &&
                !this.state.usersData.length && (
                  <View
                    style={{
                      ...styles.NoDataView,
                      ...{ backgroundColor: "#fff" }
                    }}
                  >
                    <Icon
                      name="noLocationIllustration"
                      width="60"
                      height="60"
                    />
                    <Text style={styles.mainText}>Search for a username.</Text>
                    <Text style={styles.subText}>Minimum 3 characters.</Text>
                  </View>
                )}
              {this.state.search.length >= 3 &&
                !this.state.usersData.length && (
                  <View
                    style={{
                      ...styles.NoDataView,
                      ...{ backgroundColor: "#fff" }
                    }}
                  >
                    <Icon
                      name="noLocationIllustration"
                      width="60"
                      height="60"
                    />
                    <Text style={styles.mainText}>No user found.</Text>
                    <Text style={styles.subText}>Try changing search..</Text>
                  </View>
                )}

              <UserList
                data={this.state.usersData}
                following={userFollowing}
                loggedUserID={this.props.loggedUserID}
                onClickUser={this.onClickUser}
                onFollow={this.onFollow}
                onUnfollow={this.onUnfollow}
              />
            </Tab>
          </Tabs>
        </Container>
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
    justifyContent: "center",
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
    loggedUserID: state.getIn(["user", "loggedUserID"]),
    users: state.getIn(["user", "data"]),
    searchingFor: state.getIn(["user", "searching"]),
    userFollowing: state.getIn([
      "user",
      "data",
      state.getIn(["user", "loggedUserID"]),
      "following"
    ]),
    allBadlees: state.getIn(["badlees", "data"]),
    badleeIDs: state.getIn(["badlees", "purposeTabs", "globe"])
  }),
  actionCreators
)(Search);

export default _Wrapped;
