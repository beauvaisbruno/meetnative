"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// @ts-ignore
var react_native_google_places_autocomplete_1 = require("react-native-google-places-autocomplete");
var intl_1 = require("../../config/intl");
var lang_1 = require("./lang");
var custom_1 = require("../../config/native-base-theme/variables/custom");
var persistCity = "";
exports.GooglePlacesInput = function (_a) {
    var city = _a.city, onChange = _a.onChange;
    if (city && city !== "")
        persistCity = city;
    return (<react_native_google_places_autocomplete_1.GooglePlacesAutocomplete testID={"GooglePlacesAutocomplete"} placeholder={lang_1.default("Search")} minLength={2} autoFocus={false} returnKeyType={"search"} // https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
     listViewDisplayed="false" // auto/true/false/undefined
     fetchDetails enablePoweredByContainer={false} onPress={function (data, details) {
        // 'details' is provided when fetchDetails = true
        onChange(details.name, details.geometry.location.lat, details.geometry.location.lng);
    }} getDefaultValue={function () { return persistCity; }} currentLocation currentLocationLabel={lang_1.default("Current location")} query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyACed1wrMg8bwNMQTww_oPn8WQdkzkRM7I",
        language: intl_1.locale(),
        types: "(cities)"
    }} nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
     GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "locality"
    }} debounce={200} styles={{
        textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0
        },
        textInput: {
            marginTop: 4,
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 7,
            paddingRight: 0,
            height: 38,
            color: custom_1.default.inputColor,
            fontSize: 16
        },
        predefinedPlacesDescription: {
            color: custom_1.default.brandPrimary
        }
    }}/>);
};
