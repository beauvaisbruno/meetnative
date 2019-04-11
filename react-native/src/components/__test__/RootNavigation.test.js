"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const MainNavigation_1 = __importDefault(require("../MainNavigation"));
const RootNavigation_1 = __importDefault(require("../RootNavigation"));
const AuthLoadingScreen_1 = __importDefault(require("../login/AuthLoadingScreen"));
const LoginNavigation_1 = __importDefault(require("../login/LoginNavigation"));
const routeConfigMap = {
    AuthLoadingScreen: AuthLoadingScreen_1.default,
    MainNavigation: MainNavigation_1.default(),
    LoginNavigation: LoginNavigation_1.default
};
const switchConfig = {
    initialRouteName: "AuthLoadingScreen"
};
it("MainNavigation", () => {
    const test = RootNavigation_1.default;
    expect(createAppContainer).toBeCalledWith("Component");
    expect(createSwitchNavigator).toBeCalledWith(routeConfigMap, switchConfig);
});
