const createAppContainerMock = jest.fn(p => {
  return "createAppContainer";
});
const createDrawerNavigator = jest.fn();
jest.mock("react-native-firebase", () => {
  return {
    auth: () => ({ currentUser: { uid: "uid" } })
  };
});
jest.mock("react-navigation", () => {
  return {
    withNavigation: (param: any) => param,
    createAppContainer: createAppContainerMock,
    createDrawerNavigator
  };
});
createDrawerNavigator.mockReturnValue("Component");
createAppContainerMock.mockReturnValue("createAppContainer");

import MainNavigation from "../MainNavigation";
import * as React from "react";

it("MainNavigation", () => {
  // @ts-ignore
  const res = MainNavigation("routes", "config");
  expect(createDrawerNavigator).toBeCalledWith("routes", "config");
  expect(createAppContainerMock).toBeCalledWith("Component");
  expect(res).toEqual("createAppContainer");
});
