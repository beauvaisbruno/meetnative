import * as React from "react";
// @ts-ignore
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { locale } from "../../config/intl";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";

let persistCity = "";

export const GooglePlacesInput = ({
  city,
  onChange
}: {
  city: string;
  onChange: (city: string, lat: number, lon: number) => void;
}) => {
  if (city && city !== "") persistCity = city;
  return (
    <GooglePlacesAutocomplete
      testID={"GooglePlacesAutocomplete"}
      placeholder={lang("Search")}
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"} // https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="false" // auto/true/false/undefined
      fetchDetails
      enablePoweredByContainer={false}
      onPress={(data: any, details: any) => {
        // 'details' is provided when fetchDetails = true
        onChange(
          details.name,
          details.geometry.location.lat,
          details.geometry.location.lng
        );
      }}
      getDefaultValue={() => persistCity}
      currentLocation
      currentLocationLabel={lang("Current location")}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "hidden",
        language: locale(),
        types: "(cities)"
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "locality"
      }}
      debounce={200}
      styles={{
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
          color: custom.inputColor,
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: custom.brandPrimary
        }
      }}
    />
  );
};
