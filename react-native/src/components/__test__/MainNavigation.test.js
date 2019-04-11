"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        withNavigation: (param) => param,
        createAppContainer: createAppContainerMock,
        createDrawerNavigator
    };
});
createDrawerNavigator.mockReturnValue("Component");
createAppContainerMock.mockReturnValue("createAppContainer");
const MainNavigation_1 = __importDefault(require("../MainNavigation"));
it("MainNavigation", () => {
    // @ts-ignore
    const res = MainNavigation_1.default("routes", "config");
    expect(createDrawerNavigator).toBeCalledWith("routes", "config");
    expect(createAppContainerMock).toBeCalledWith("Component");
    expect(res).toEqual("createAppContainer");
});
