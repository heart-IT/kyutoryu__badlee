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
import { fromJS } from 'immutable';
import { Container, Content, Input, Item, Radio, StyleProvider, Tab, TabHeading, Tabs, Text, View } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import BadleesList from '../../components/BadleesList';
import BadleeFab from '../../components/Fab';
import Icon from '../../components/Icon';
import getTheme from '../../theme/components';
import Comments from './Comments';
import NewBadlee from './NewBadlee';
import SingleBadlee from './SingleBadlee';
import User from './User';


class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      currentPagination: {
        offset: 0,
        limit: 10
      },
      searchString: null,
      globecategory: null,
      currentData: fromJS([])
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
    this.setState({ currentData: badleesToShow });
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
    this.setState({ globecategory: type });
    this.triggerSearch();
  }

  triggerSearch() {
    this.getBadleeByGlobe();
  }

  // on tab change, update tabIndex and pagination values. After updating, get list of badlees.
  onTabChange(i, ref) {
    this.setState(
      { activeTabIndex: i.i, currentPagination: { offset: 0, limit: 10 } },
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
    var data = this.state.currentData.toJS();
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={styles.content} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab isActive={false} onSelection={this.onFabSelect} />
            <View style={styles.content}>
              <Tabs
                onChangeTab={this.onTabChange}
                initialPage={this.state.activeTabIndex}
              >
                <Tab
                  tabHeaderStyle={{ height: 36 }}
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.firstTab }}
                    >
                      <Icon
                        fill={
                          this.state.activeTabIndex === 0 ? (
                            "#611265"
                          ) : (
                              "#4D4D4D"
                            )
                        }
                        name="community"
                        height="27"
                        width="27"
                      />
                    </TabHeading>
                  }
                >
                  <BadleesList
                    data={data}
                    onClickUser={this.onClickUser}
                    onClickLike={this.onClickLike}
                    onClickUnlike={this.onClickUnlike}
                    onClickWish={this.onClickWish}
                    onClickUnwish={this.onClickUnwish}
                    onClickComment={this.onClickComment}
                    onClickBadlee={this.onClickBadlee}
                    userId={this.props.user.get("user_id")}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.tabHead}>
                      <Icon
                        fill={
                          this.state.activeTabIndex === 1 ? (
                            "#611265"
                          ) : (
                              "#4D4D4D"
                            )
                        }
                        name="location"
                        height="21"
                        width="21"
                      />
                    </TabHeading>
                  }
                >
                  <BadleesList
                    data={data}
                    onClickUser={this.onClickUser}
                    onClickLike={this.onClickLike}
                    onClickUnlike={this.onClickUnlike}
                    onClickWish={this.onClickWish}
                    onClickUnwish={this.onClickUnwish}
                    onClickComment={this.onClickComment}
                    onClickBadlee={this.onClickBadlee}
                    userId={this.props.user.get("user_id")}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.lastTab }}
                    >
                      <Icon
                        fill={
                          this.state.activeTabIndex === 2 ? (
                            "#611265"
                          ) : (
                              "#4D4D4D"
                            )
                        }
                        name="globe"
                        height="21"
                        width="21"
                      />
                    </TabHeading>
                  }
                >
                  <View>
                    <View
                      style={{
                        paddingTop: 12,
                        marginLeft: 12,
                        marginRight: 12
                      }}
                    >
                      <Item rounded style={{ height: 36, paddingLeft: 12 }}>
                        <Icon name="search" width="21" height="21" />
                        <Input
                          placeholder="Search for folks or thingies.."
                          style={{ height: 36, lineHeight: 36, fontSize: 14 }}
                          onChangeText={searchString =>
                            this.setState({ searchString })}
                          onEndEditing={this.triggerSearch}
                        />
                      </Item>
                    </View>
                    <View
                      style={{
                        marginLeft: 12,
                        marginRight: 12,
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 12
                        }}
                      >
                        <Icon
                          name="exchange"
                          width="21"
                          height="21"
                          style={{ marginRight: 6 }}
                        />
                        <Radio
                          selected={
                            this.state.globecategory === "exchange" ? (
                              true
                            ) : (
                                false
                              )
                          }
                          onPress={text => this.onRadioSelect("exchange")}
                          style={{ marginRight: 12 }}
                        />
                        <Icon
                          name="showoff"
                          width="21"
                          height="21"
                          style={{ marginRight: 6 }}
                        />
                        <Radio
                          selected={
                            this.state.globecategory === "showOff" ? (
                              true
                            ) : (
                                false
                              )
                          }
                          onPress={text => this.onRadioSelect("showOff")}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 12,
                          marginLeft: 24
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>Location</Text>
                        <Icon
                          name="drop_arrow"
                          width="16"
                          height="10"
                          style={{
                            marginRight: 3
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 12,
                          marginLeft: 24
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>Category</Text>
                        <Icon
                          name="drop_arrow"
                          width="16"
                          height="10"
                          style={{
                            marginRight: 3
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View>
                    <BadleesList
                      data={data}
                      onClickUser={this.onClickUser}
                      onClickLike={this.onClickLike}
                      onClickUnlike={this.onClickUnlike}
                      onClickWish={this.onClickWish}
                      onClickUnwish={this.onClickUnwish}
                      onClickComment={this.onClickComment}
                      onClickBadlee={this.onClickBadlee}
                      userId={this.props.user.get("user_id")}
                    />
                  </View>
                </Tab>
              </Tabs>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  content: { flex: 1 },
  tabHead: { backgroundColor: "#fff" },
  firstTab: { paddingLeft: "12.5%" },
  lastTab: { paddingRight: "12.5%" }
};

const _Wrapped = connect(
  state => ({
    user: state.getIn(["user", "information"]),
    allBadlees: state.get("allBadlees"),
    badleesIDFollowing: state.getIn(["badleesByCategory", "following", "ids"]),
    badleesIDLocation: state.getIn(["badleesByCategory", "location", "ids"]),
    badleesIDGlobe: state.getIn(["badleesByCategory", "globe", "ids"])
  }),
  actionCreators
)(Store);

export default _Wrapped;
