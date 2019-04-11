"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createAppContainer = jest.fn();
const createStackNavigator = jest.fn();
jest.mock("react-navigation", () => {
    return {
        createAppContainer,
        createStackNavigator
    };
});
createStackNavigator.mockReturnValue("LoginNavigation");
jest.mock("../LoginScreen", () => { });
jest.mock("../ResetPasswordScreen", () => { });
const LoginNavigation_1 = __importDefault(require("../LoginNavigation"));
const LoginScreen_1 = __importDefault(require("../LoginScreen"));
const ResetPasswordScreen_1 = __importDefault(require("../ResetPasswordScreen"));
it("login Navigation", () => {
    const test = LoginNavigation_1.default;
    expect(createAppContainer).toBeCalledWith("LoginNavigation");
    expect(createStackNavigator).toBeCalledWith({
        LoginScreen: LoginScreen_1.default,
        ResetPasswordScreen: ResetPasswordScreen_1.default
    }, {
        headerMode: "none",
        initialRouteName: "LoginScreen"
    });
});
