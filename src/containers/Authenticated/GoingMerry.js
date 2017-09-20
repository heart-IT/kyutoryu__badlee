/**
 * @name- GoingMerry.js
 * 
 * @chill -There is no shelter from aging and death. Knowing this inevitability, Seek joy instead in the goodness of your actions - Buddha
 * 
 * 
 * @description- This file is the parent container of Badlee App after logging in. Everything is loaded inside
 * 
 * @author- heartit pirates
 */
import { Container, Content, StyleProvider, Tab, TabHeading, Tabs, Text } from 'native-base';
import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../badlee__redux/action_creators';
import Icon from '../../components/Icon';
import Loading from '../../components/LoadingView';
import getTheme from '../../theme/components';
import Badlee from './Badlee';
import Chat from './Chat';
import UserProfile from './User';

("use strict");

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      tabLocked: true
    };
  }
  render() {
    let _this = this;
    function returnIcon(name, position, width = 22, height = 22) {
      return (
        <Icon
          name={name}
          width={width}
          height={height}
          fill={_this.state.activeTabIndex === position ? "#FFF" : "#A071A3"}
          stroke={_this.state.activeTabIndex === position ? "#FFF" : "#A071A3"}
        />
      );
    }
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Tabs
              locked={this.state.tabLocked}
              onChangeTab={(i, ref) => this.setState({ activeTabIndex: i.i })}
            >
              <Tab heading={<TabHeading>{returnIcon("home", 0)}</TabHeading>}>
                <Badlee />
              </Tab>
              <Tab
                heading={<TabHeading>{returnIcon("messages", 1)}</TabHeading>}
              >
                <Chat />
              </Tab>
              <Tab
                heading={
                  <TabHeading>{returnIcon("notifications", 2)}</TabHeading>
                }
              >
                <Text>One Piece is hidden somewhere in the app</Text>
              </Tab>
              <Tab heading={<TabHeading>{returnIcon("user", 3)}</TabHeading>}>
                <UserProfile />
              </Tab>
            </Tabs>
          </Content>
          {this.props.loading && <Loading message=" " />}
        </Container>
      </StyleProvider>
    );
  }
}

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(AuthContainer);

export default _Wrapped;
