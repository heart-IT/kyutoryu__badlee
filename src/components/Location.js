import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleProvider, Content } from "native-base";
import * as actionCreators from "../badlee__redux/action_creators";
import getTheme from "../theme/components";

class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          paddingTop: 56,
          backgroundColor: "#fff"
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setState({ selectedPlace: data.description });
          }}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCdtqQtZKEecWHLVMeXegFx5NiJ75U8cNM",
            language: "en", // language of the results
            types: "(cities)" // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: "bold"
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            }
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    );
  }
}
export default GooglePlacesInput;
