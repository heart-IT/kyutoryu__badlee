/**
 * Forever-is composed of Nows  - Emily Dickinson
 * 
 * @name- tabs.js
 * @description- tab components for reusability
 * @author- heartit pirates
 * var tabsObject = {
      initialPage: this.state.initial_tab,
      tabs: [
        {
          icon: "home",
          viewbox: "0 0 60 60",
          component: Badlee
        },
        {
          icon: "messages",
          viewbox: "0 0 60 60",
          component: Chat
        },
        {
          icon: "notifications",
          viewbox: "0 0 60 60",
          component: Chat
        },
        {
          icon: "user",
          viewbox: "0 0 60 60",
          component: UserProfile
        }
      ]
    };
 */

"use strict";
import React, { Component } from "react";
import { Container, Header, Content, Tab, Tabs, TabHeading } from "native-base";
import Icon from "./Icon";

export default class TabComponent extends Component {
  render() {
    let tabsObject = this.props.config;
    var tabsHTML = tabsObject.tabs.map(tab => {
      return (
        <Tab
          key={tab.icon}
          heading={
            <TabHeading>
              <Icon
                name={tab.icon}
                viewBox={tab.viewbox}
                width="22"
                height="22"
              />
            </TabHeading>
          }
        >
          {tab.component}
        </Tab>
      );
    });
    return (
      <Container>
        <Tabs initialPage={tabsObject.initialPage}>
          {tabsHTML}
        </Tabs>
      </Container>
    );
  }
}
