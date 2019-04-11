const createAppContainer = jest.fn();
const createSwitchNavigator = jest.fn();
jest.mock("react-navigation", () => {
  return {
    createAppContainer,
    createSwitchNavigator
  };
});
createSwitchNavigator.mockReturnValue("Component");
jest.mock("../login/AuthLoadingScreen", () => jest.fn());
jest.mock("../login/LoginNavigation", () => jest.fn());
jest.mock("../MainNavigation", () => jest.fn());

import MainNavigation from "../MainNavigation";
import * as React from "react";
import RootNavigation from "../RootNavigation";
import AuthLoadingScreen from "../login/AuthLoadingScreen";
import LoginNavigation from "../login/LoginNavigation";
const routeConfigMap = {
  AuthLoadingScreen,
  MainNavigation: MainNavigation(),
  LoginNavigation
};

const switchConfig = {
  initialRouteName: "AuthLoadingScreen"
};

it("MainNavigation", () => {
  const test = RootNavigation;
  expect(createAppContainer).toBeCalledWith("Component");
  expect(createSwitchNavigator).toBeCalledWith(routeConfigMap, switchConfig);
});
