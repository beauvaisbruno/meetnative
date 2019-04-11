import * as React from "react";
import SideBar from "./sideBar/SideBar";
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import PartnersScreen from "./partners/PartnersScreen";
import ProfileContainer from "./profile/ProfileContainer";
import AvatarScreen from "./profile/AvatarScreen";
import SearchScreen from "./search/SearchScreen";
import RoomScreen from "./room/RoomScreen";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const withDrawer = {
  SearchScreen: { screen: SearchScreen, menuLabel: "Find a partner" },
  PartnersScreen: { screen: PartnersScreen, menuLabel: "Last messages" },
  ProfileContainer: { screen: ProfileContainer, menuLabel: "Your Profile" }
};
const noDrawer = {
  AvatarScreen: { screen: AvatarScreen },
  RoomScreen: { screen: RoomScreen }
};

export default (
  pRoutes: any = { ...withDrawer, ...noDrawer },
  drawerConfig = {
    initialRouteName: "ProfileContainer",
    contentComponent: (props: any) => (
      <SideBar routes={withDrawer} {...props} />
    ),
    drawerWidth: wp("80%")
  }
) => createAppContainer(createDrawerNavigator(pRoutes, drawerConfig));
