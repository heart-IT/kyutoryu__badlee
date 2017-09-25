/**
 * @name- Badlee.js
 * 
 * @chill- Great is the person who does not lose their childlike heart.- Mencius
 * 
 * 
 * @description- This displays badlees section with tabs
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { Container, Content, Input, Item, Radio, StyleProvider, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import BadleesGrid from '../../components/BadleesGrid';
import BadleesList from '../../components/BadleesList';
import BadleeFab from '../../components/Fab';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';
import { styles } from '../../theme/mystyle/badlee';
import Comments from './Comments';
import NewBadlee from './NewBadlee';
import SingleBadlee from './SingleBadlee';
import User from './User';

("use strict");

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFabValue: false,
      activeTabIndex: 0,
      currentPagination: {
        offset: 0,
        limit: 30
      },
      searchString: null,
      globecategory: null,
      currentData: []
    };
    this.onFabSelect = this.onFabSelect.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickUnlike = this.onClickUnlike.bind(this);
    this.onClickWish = this.onClickWish.bind(this);
    this.onClickUnwish = this.onClickUnwish.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickBadlee = this.onClickBadlee.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
  }

  // update state currentData according to the activeTab and store values
  componentWillReceiveProps(nextProps) {
    let {
      allBadlees,
      badleesIDLocation,
      badleesIDGlobe,
      badleesIDFollowing
    } = nextProps;
    let badleesJS = allBadlees.toJS();
    let badleesToShowIDS = "";
    switch (this.state.activeTabIndex) {
      case 0:
        badleesToShowIDS = badleesIDFollowing;
        break;
      case 1:
        badleesToShowIDS = badleesIDLocation;
        break;
      default:
        badleesToShowIDS = badleesIDGlobe;
    }
    let badleesToShow = badleesToShowIDS.map(id => {
      return badleesJS[id];
    });
    this.setState({ currentData: badleesToShow.toJS() });
  }

  // load badlee on load of component
  componentDidMount() {
    this.getBadlees();
  }

  // switch case to fetch item based on activeTab
  getBadlees() {
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

  // call prop getBadlee fn with tabName "following"
  getBadleeByFollowing() {
    this.props.getBadlees({
      tabName: "following",
      offset: this.state.currentPagination.offset,
      limit: this.state.currentPagination.limit
    });
  }

  // call prop getBadlee fn with tabName "location" and currentLocation "Jaipur"
  getBadleeByLocation() {
    this.props.getBadlees({
      tabName: "location",
      currentLocation: "Jaipur, Rajasthan, India",
      offset: this.state.currentPagination.offset,
      limit: this.state.currentPagination.limit
    });
  }

  // call prop getBadlee fn with tabName "globe", search string and category value
  getBadleeByGlobe() {
    this.props.getBadlees({
      tabName: "globe",
      search: this.state.searchString,
      category: this.state.globecategory,
      offset: this.state.currentPagination.offset,
      limit: this.state.currentPagination.limit
    });
  }

  // call prop showUserPage fn to open clicked user page, pass user_id of clicked user
  onClickUser(id) {
    requestAnimationFrame(() => {
      this.props.showUserPage(id, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }

  //
  onClickLike(id) {
    this.props.onClickLike(id);
  }
  onClickUnlike(id) {
    this.props.onClickUnlike(id);
  }

  //
  onClickWish(id) {
    this.props.onClickWish(id);
  }
  onClickUnwish(id) {
    this.props.onClickUnwish(id);
  }

  onClickComment(id) {
    requestAnimationFrame(() => {
      this.props.showCommentPage(id, {
        navigator: this.props.navigator,
        component: Comments
      });
    });
  }

  onClickBadlee(id) {
    requestAnimationFrame(() => {
      this.props.showBadleePage(id, {
        navigator: this.props.navigator,
        component: SingleBadlee
      });
    });
  }

  onRadioSelect(type) {
    this.setState(
      { globecategory: type === this.state.globecategory ? null : type },
      () => {
        this.triggerSearch();
      }
    );
  }

  triggerSearch() {
    this.getBadleeByGlobe();
  }

  // on tab change, update tabIndex and pagination values. After updating, get list of badlees.
  onTabChange(i, ref) {
    this.setState(
      { activeTabIndex: i.i, currentPagination: { offset: 0, limit: 30 } },
      () => {
        this.getBadlees();
      }
    );
  }

  // open new badlee form screen with the type passed in parameter.
  onFabSelect(type) {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee,
        params: { type }
      });
    });
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
    function returnBadleeList() {
      return (
        <BadleesList
          data={_this.state.currentData}
          onClickUser={_this.onClickUser}
          onClickLike={_this.onClickLike}
          onClickUnlike={_this.onClickUnlike}
          onClickWish={_this.onClickWish}
          onClickUnwish={_this.onClickUnwish}
          onClickComment={_this.onClickComment}
          onClickBadlee={_this.onClickBadlee}
          userId={_this.props.user.get("user_id")}
        />
      );
    }
    function returnBadleeGrid() {
      return (
        <BadleesGrid
          data={_this.state.currentData}
          onClickBadlee={_this.onClickBadlee}
        />
      );
    }
    function returnFilterRadio(name, width = 21, height = 21) {
      return (
        <View style={{ ...styles.alignCenterRow, ...styles.filterRadioView }}>
          <Icon name={name} width={width} height={height} />
          <Radio
            selected={_this.state.globecategory === name}
            onPress={text => _this.onRadioSelect(name)}
          />
        </View>
      );
    }
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab
              isActive={this.state.initialFabValue}
              onSelection={this.onFabSelect}
            />
            <View style={styles.content}>
              <Tabs
                onChangeTab={this.onTabChange}
                initialPage={this.state.activeTabIndex}
              >
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.firstTab }}
                    >
                      {returnIcon("community", 0, 27, 27)}
                    </TabHeading>
                  }
                >
                  {returnBadleeList()}
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.tabHead}>
                      {returnIcon("location", 1)}
                    </TabHeading>
                  }
                >
                  {returnBadleeList()}
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.lastTab }}
                    >
                      {returnIcon("globe", 2)}
                    </TabHeading>
                  }
                >
                  <View style={styles.globeFilterView}>
                    <View>
                      <Item rounded style={styles.inputItem}>
                        {returnIcon("search", -1, 18, 18)}
                        <Input
                          placeholder="Search for folks or thingies.."
                          style={styles.searchInput}
                          onChangeText={searchString =>
                            this.setState({ searchString })}
                          onEndEditing={this.triggerSearch}
                        />
                      </Item>
                    </View>
                    <View style={styles.filterView}>
                      <View style={styles.alignCenterRow}>
                        {returnFilterRadio("exchange")}
                        {returnFilterRadio("showoff", 24, 24)}
                      </View>
                      <View style={styles.alignCenterRow}>
                        <Text style={styles.filterText}>Location</Text>
                        {returnIcon("drop_arrow", -1, 16, 10)}
                      </View>
                      <View style={styles.alignCenterRow}>
                        <Text style={styles.filterText}>Category</Text>
                        {returnIcon("drop_arrow", -1, 16, 10)}
                      </View>
                    </View>
                  </View>
                  <View>{returnBadleeGrid()}</View>
                </Tab>
              </Tabs>
            </View>
          </Content>
        </Container>
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
    badleesIDFollowing: state.getIn(["badlees", "tabs", "following"]),
    badleesIDLocation: state.getIn(["badlees", "tabs", "location"]),
    badleesIDGlobe: state.getIn(["badlees", "tabs", "globe"])
  }),
  actionCreators
)(Store);

export default _Wrapped;
