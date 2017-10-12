/**
 * @name- badlee.js
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
import NewBadlee from './newBadlee';
import SingleBadlee from './singleBadlee';
import User from './User';

("use strict");

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      paging: { page: 0, limit: 4 },
      searchFor: null,
      globecategory: null,
      currentData: []
    };

    this.onFabSelect = this.onFabSelect.bind(this);
    this.onTabChange = this.onTabChange.bind(this);

    this.onFlatListRefresh = this.onFlatListRefresh.bind(this);
    this.onListEnd = this.onListEnd.bind(this);

    this.triggerSearch = this.triggerSearch.bind(this);

    this.onClickUser = this.onClickUser.bind(this);
    this.onClickBadlee = this.onClickBadlee.bind(this);

    this.onClickLike = this.onClickLike.bind(this);
    this.onClickUnlike = this.onClickUnlike.bind(this);

    this.onClickWish = this.onClickWish.bind(this);
    this.onClickUnwish = this.onClickUnwish.bind(this);

    this.onClickComment = this.onClickComment.bind(this);
  }

  // 65 47 43 37
  // in case of props are changed, format and update state with currentData
  componentWillReceiveProps(nextProps) {
    this.formatAndUpdatePropData(nextProps);
  }

  // format and update state with propData
  formatAndUpdatePropData(propData) {
    let { allBadlees, badleeIDs } = propData;
    let showingBadleeIDs = [];
    let currentData = [];
    switch (this.state.activeTabIndex) {
      case 0:
        showingBadleeIDs = badleeIDs.get("following");
        break;
      case 1:
        showingBadleeIDs = badleeIDs.get("location");
        break;
      default:
        showingBadleeIDs = badleeIDs.get("globe");
    }

    currentData = showingBadleeIDs.map(id => allBadlees.get(String(id))).toJS();
    this.setState({ currentData: currentData });
  }

  // get badlees on component mounting.
  componentDidMount() {
    this.getBadlees();
  }

  /**
   * Get Badlees Section
   */
  // call fns to fetch badlees based on activeTab switch case
  getBadlees() {
    switch (this.state.activeTabIndex) {
      case 0:
        this.checkForPagination("following")
          ? this.getBadleeByFollowing()
          : this.formatAndUpdatePropData(this.props);
        break;
      case 1:
        this.checkForPagination("location")
          ? this.getBadleeByLocation()
          : this.formatAndUpdatePropData(this.props);
        break;
      default:
        this.checkForPagination("globe")
          ? this.getBadleeByGlobe()
          : this.formatAndUpdatePropData(this.props);
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
      search: this.state.searchFor,
      category: this.state.globecategory,
      offset: page * limit,
      limit: limit
    });
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

  /**
   * Component Events section
   */
  // open new badlee form screen with the purpose passed in parameter.
  onFabSelect(purpose) {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee,
        params: { purpose }
      });
    });
  }

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

  onFlatListRefresh() {
    console.log("hey");
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
        this.getBadlees();
      }
    );
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

  onClickDelete(id) {
    console.log(id);
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
          onClickDelete={_this.onClickDelete}
          onFlatListRefresh={_this.onFlatListRefresh}
          onListEnd={_this.onListEnd}
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
            <BadleeFab isActive={true} onSelection={this.onFabSelect} />
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
                          onChangeText={searchFor =>
                            this.setState({ searchFor })}
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
    badleeIDs: state.getIn(["badlees", "tabs"]),
    pagingEndsIn: state.getIn(["badlees", "pagingEndsIn", "tabs"])
  }),
  actionCreators
)(Store);

export default _Wrapped;
