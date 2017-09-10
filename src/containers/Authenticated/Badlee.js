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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Set } from "immutable";

import {
  StyleProvider,
  Container,
  Content,
  View,
  Tabs,
  Tab,
  TabHeading,
  Text,
  Button,
  Item,
  Input,
  Radio
} from "native-base";

import * as actionCreators from "../../badlee__redux/action_creators";
import getTheme from "../../theme/components";
import Icon from "../../components/Icon";
import BadleeFab from "../../components/Fab";
import BadleesList from "../../components/BadleesList";

import NewBadlee from "./NewBadlee";
import User from "./User";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      currentPagination: {
        offset: 0,
        limit: 10
      },
      globeFilters: {
        search: null,
        category: null
      },
      currentData: new Set()
    };
    this.onFabSelect = this.onFabSelect.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let {
      allBadlees,
      badleesIDLocation,
      badleesIDGlobe,
      badleesIDFollowing
    } = nextProps;
    if (this.state.activeTabIndex === 0) {
      let badleesToShow = badleesIDFollowing.map(id => {
        return allBadlees.find(badlee => id === badlee.id);
      });
      this.setState({ currentData: badleesToShow });
    } else if (this.state.activeTabIndex === 1) {
      let badleesToShow = badleesIDLocation.map(id => {
        return allBadlees.find(badlee => id === badlee.id);
      });
      this.setState({ currentData: badleesToShow });
    } else {
      let badleesToShow = badleesIDGlobe.map(id => {
        return allBadlees.find(badlee => id === badlee.id);
      });
      this.setState({ currentData: badleesToShow });
    }
  }

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
      case 2:
        this.getBadleeByGlobe();
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
      search: this.state.globeFilters.search,
      category: this.state.globeFilters.category,
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

  onClickLike(id) {
    console.log(id);
  }
  onRadioSelect(type) {}

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
    var data = this.state.currentData;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={styles.content} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab isActive={false} onSelection={this.onFabSelect} />
            <View style={styles.content}>
              <Tabs
                tabBarUnderlineStyle={{ borderBottomWidth: 0 }}
                onChangeTab={this.onTabChange}
                initialPage={this.state.activeTabIndex}
              >
                <Tab
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
                        height="30"
                        width="30"
                      />
                    </TabHeading>
                  }
                >
                  <BadleesList
                    data={data}
                    onClickUser={this.onClickUser}
                    onClickLike={this.onClickLike}
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
                        height="24"
                        width="24"
                      />
                    </TabHeading>
                  }
                >
                  <BadleesList
                    data={data}
                    onClickUser={this.onClickUser}
                    onClickLike={this.onClickLike}
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
                        height="24"
                        width="24"
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
                      <Item rounded>
                        <Input
                          placeholder="Search for folks or thingies.."
                          style={{ height: 40, lineHeight: 40 }}
                          onChangeText={searchString =>
                            console.log(searchString)}
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
                          width="24"
                          height="24"
                          style={{ marginRight: 6 }}
                        />
                        <Radio
                          selected={
                            this.state.globeFilters.category === "exchange" ? (
                              true
                            ) : (
                              false
                            )
                          }
                          onPress={this.onRadioSelect("exchange")}
                          style={{ marginRight: 6 }}
                        />
                        <Icon
                          name="showOff"
                          width="24"
                          height="24"
                          style={{ marginRight: 6 }}
                        />
                        <Radio
                          selected={
                            this.state.globeFilters.category === "showOff" ? (
                              true
                            ) : (
                              false
                            )
                          }
                          onPress={this.onRadioSelect("showOff")}
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
                        <Text>Location</Text>
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
                        <Text>Category</Text>
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
