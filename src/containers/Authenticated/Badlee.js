"use strict";

import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";

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
import getTheme from "../../theme/components";

import * as actionCreators from "../../badlee__redux/action_creators";
import Icon from "../../components/Icon";
import BadleeFab from "../../components/Fab";
import BadleesList from "../../components/BadleesList";
import NewBadlee from "./NewBadlee";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current__tab: 0,
      page: 1,
      limit: 10,
      globeCategory: null,
      searchString: null
    };
  }
  componentDidMount() {
    if (this.state.current__tab === 0) {
      // this.makeBadleesFetchRequest(follower_url);
    } else if (this.state.current__tab === 1) {
      this.getBadleeByLocation();
    }
  }
  onTabChange(i, ref) {
    this.setState({ current__tab: i.i });
    if (i.i === 1) {
      this.getBadleeByLocation();
    } else if (i.i === 0) {
    } else {
      this.getBadleeByGlobe();
    }
  }
  getBadleeByLocation() {
    this.props.getBadlees({
      category: "location",
      page: this.state.page,
      limit: this.state.limit
    });
  }
  getBadleeByGlobe() {
    this.props.getBadlees({
      category: "globe",
      page: this.state.page,
      limit: this.state.limit,
      globeCategory: this.state.globeCategory,
      searchString: this.state.searchString
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

  onUserClick() {}
  onLocationPress() {}
  onRadioSelect(type) {}
  letsSearchSuper() {
    var xString = this.state.searchString
      ? "sp=" + this.state.searchString
      : "";
    var yString = this.state.globeCategory
      ? "spp=" + this.state.globeCategory
      : "";
    var zString = "";
    if (xString && yString) {
      zString = xString + "&" + yString;
    } else if (xString) {
      zString = xString;
    } else if (yString) {
      zString = yString;
    }
    this.makeBadleesFetchRequest(search_url + zString);
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Content style={styles.content} contentContainerStyle={{ flex: 1 }}>
            <BadleeFab
              isActive={false}
              onSelection={this.onFabSelect.bind(this)}
            />
            <View style={styles.content}>
              <Tabs
                tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
                onChangeTab={this.onTabChange.bind(this)}
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
                  <BadleesList data={this.props.allBadlees} />
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
                          onEndEditing={this.letsSearchSuper.bind(this)}
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
                        <Image
                          source={require("../../images/show off 2.png")}
                          style={{ width: 24, height: 24, marginRight: 6 }}
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
                    <BadleesList data={this.props.allBadlees} />
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
    allBadlees: state.get("allBadlees").toJS(),
    badleesIDLocation: state.getIn(["badleesByCategory", "location"]).toJS()
  }),
  actionCreators
)(Store);

export default _Wrapped;
