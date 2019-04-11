import { storiesOf } from "@storybook/react-native";
import { storeBaseAndNavigatorDecorator } from "../../../utils/decorators";
// @ts-ignore
import * as React from "react";
import { initialState } from "../profileReducer";
import ProfileContainer from "../ProfileContainer";
import ProfileScreen from "../ProfileScreen";

const props = {
  ...initialState,
  loadProfile: () => {
    console.log("loadProfile...");
  },
  updateProfile: () => {
    console.log("updateProfile...");
  },
  navigation: { addListener: () => {} }
};

storiesOf("ProfileScreen", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  .add("container", () => (
    // @ts-ignore
    <ProfileContainer />
  ))
  .add("default", () => (
    // @ts-ignore
    <ProfileScreen {...props} />
  ))
  .add("load fetching", () => (
    // @ts-ignore
    <ProfileScreen
      {...props}
      profileLoad={{ ...initialState.profileLoad, fetching: true }}
    />
  ))
  .add("load error", () => (
    // @ts-ignore
    <ProfileScreen
      {...props}
      profileLoad={{ ...initialState.profileLoad, error: true }}
    />
  ))
  .add("load success", () => (
    <ProfileScreen
      {...props}
      profileLoad={{
        // @ts-ignore
        data: {
          ...initialState.profileLoad.data,
          pseudo: "Bruno",
          profession: "Ice-cream vendors",
          avatar: "mesange"
        }
      }}
    />
  ))
  .add("update fetching", () => (
    <ProfileScreen
      {...props}
      // @ts-ignore
      profileUpdate={{ ...initialState.profileLoad, fetching: true }}
    />
  ))
  .add("update error", () => (
    <ProfileScreen
      {...props}
      // @ts-ignore
      profileUpdate={{ ...initialState.profileLoad, error: true }}
    />
  ));
