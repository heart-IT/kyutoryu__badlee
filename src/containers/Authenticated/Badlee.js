/**
 * @name- Badlee.js
 * 
 * @chill- 
 * 
 * 
 * @description- This displays badlees section with tabs
 * 
 * @author- heartit pirates were here
 */
"use strict";

import React, { Component } from "react";
import { Image } from "react-native";
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
      current__tab: 0,
      page: 1,
      limit: 10,
      globeCategory: null,
      searchString: null,
      currentData: new Set()
    };
  }
  componentDidMount() {
    var { user } = this.props;
    this.getBadlees();
    // if user following >= 1, show following tab, else show location tab
    // this.setState({ current__tab: +!user.following });
    // this.setState({ current__tab: +!user.following }, () => {
    //   this.getBadlees();
    // });
  }
  componentWillReceiveProps(nextProps) {
    let { allBadlees, badleesIDLocation, badleesIDGlobe } = nextProps;
    if (this.state.current__tab === 0) {
    } else if (this.state.current__tab === 1) {
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
  getBadlees() {
    switch (this.state.current__tab) {
      case 0:
        this.getBadleeByFollowing();
        break;
      case 1:
        console.log("this badlee by location");
        this.getBadleeByLocation();
        break;
      case 2:
        this.getBadleeByGlobe();
        break;
      default:
        this.getBadleeByGlobe();
    }
  }
  getBadleeByFollowing() {
    this.props.getBadlees({
      tabName: "following",
      userID: this.props.user.get("user_id"),
      page: this.state.page,
      limit: this.state.limit
    });
  }
  getBadleeByLocation() {
    this.props.getBadlees({
      tabName: "location",
      current__location: "Jaipur, Rajasthan, India",
      page: this.state.page,
      limit: this.state.limit
    });
  }
  getBadleeByGlobe() {
    this.props.getBadlees({
      tabName: "globe",
      page: this.state.page,
      limit: this.state.limit,
      globeCategory: this.state.globeCategory,
      searchString: this.state.searchString,
      category: null
    });
  }
  onTabChange(i, ref) {
    this.setState({ current__tab: i.i, page: 1, limit: 10 }, () => {
      this.getBadlees();
    });
  }
  onFabSelect(type) {
    requestAnimationFrame(() => {
      this.props.navigate({
        navigator: this.props.navigator,
        component: NewBadlee,
        params: { type }
      });
    });
  }

  onClickUser(id) {
    requestAnimationFrame(() => {
      this.props.showUserPage(id, {
        navigator: this.props.navigator,
        component: User
      });
    });
  }
  onLocationPress() {}
  onRadioSelect(type) {}
  render() {
    var data = this.state.currentData;
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={styles.content} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab
              isActive={false}
              onSelection={this.onFabSelect.bind(this)}
            />
            <View style={styles.content}>
              <Tabs
                tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
                onChangeTab={this.onTabChange.bind(this)}
                initialPage={this.state.current__tab}
              >
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.firstTab }}
                    >
                      <Icon
                        fill={
                          this.state.current__tab === 0 ? "#611265" : "#4D4D4D"
                        }
                        name="community"
                        height="30"
                        width="30"
                      />
                    </TabHeading>
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text>No item present yet</Text>
                  </View>
                </Tab>
                <Tab
                  heading={
                    <TabHeading style={styles.tabHead}>
                      <Icon
                        fill={
                          this.state.current__tab === 1 ? "#611265" : "#4D4D4D"
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
                    onClickUser={this.onClickUser.bind(this)}
                  />
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={{ ...styles.tabHead, ...styles.lastTab }}
                    >
                      <Icon
                        fill={
                          this.state.current__tab === 2 ? "#611265" : "#4D4D4D"
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
                            this.setState({ searchString: searchString })}
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
                            this.state.globeCategory === "exchange" ? (
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
                            this.state.globeCategory === "showOff" ? (
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
                    <BadleesList data={this.state.currentData} />
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
    badleesIDLocation: state.getIn(["badleesByCategory", "location", "ids"]),
    badleesIDGlobe: state.getIn(["badleesByCategory", "globe", "ids"])
  }),
  actionCreators
)(Store);

export default _Wrapped;
