import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { GooglePlacesInput } from "../GooglePlacesInput";

storiesOf("GooglePlacesInput", module).add("default", () => (
  <GooglePlacesInput
    city={"Paris"}
    onChange={(city: string) => console.log("onChange, city: ", city)}
  />
));
