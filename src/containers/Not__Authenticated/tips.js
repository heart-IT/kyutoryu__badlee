import React, { Component } from "react";
import { WebView, Linking } from "react-native";

export default class WebViewThatOpensLinksInNavigator extends Component {
  render() {
    const uri = "http://badlee.com/tips";
    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        source={{ uri }}
        onNavigationStateChange={event => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}
