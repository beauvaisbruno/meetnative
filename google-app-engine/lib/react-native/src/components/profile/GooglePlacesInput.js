"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
// @ts-ignore
const react_native_google_places_autocomplete_1 = require("react-native-google-places-autocomplete");
const intl_1 = require("../../config/intl");
const lang_1 = __importDefault(require("./lang"));
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
let persistCity = "";
exports.GooglePlacesInput = ({ city, onChange }) => {
  if (city && city !== "") persistCity = city;
  return React.createElement(
    react_native_google_places_autocomplete_1.GooglePlacesAutocomplete,
    {
      testID: "GooglePlacesAutocomplete",
      placeholder: lang_1.default("Search"),
      minLength: 2,
      autoFocus: false,
      returnKeyType: "search",
      listViewDisplayed: "false", // auto/true/false/undefined
      fetchDetails: true,
      enablePoweredByContainer: false,
      onPress: (data, details) => {
        // 'details' is provided when fetchDetails = true
        onChange(
          details.name,
          details.geometry.location.lat,
          details.geometry.location.lng
        );
      },
      getDefaultValue: () => persistCity,
      currentLocation: true,
      currentLocationLabel: lang_1.default("Current location"),
      query: {
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyACed1wrMg8bwNMQTww_oPn8WQdkzkRM7I",
        language: intl_1.locale(),
        types: "(cities)"
      },
      nearbyPlacesAPI: "GooglePlacesSearch", // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery: {
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "locality"
      },
      debounce: 200,
      styles: {
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
      }
    }
  );
};
//# sourceMappingURL=GooglePlacesInput.js.map
