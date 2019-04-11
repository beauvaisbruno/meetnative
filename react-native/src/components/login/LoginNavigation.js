"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const LoginScreen_1 = __importDefault(require("./LoginScreen"));
const ResetPasswordScreen_1 = __importDefault(require("./ResetPasswordScreen"));
const LoginNavigation = react_navigation_1.createStackNavigator(
  {
    LoginScreen: LoginScreen_1.default,
    ResetPasswordScreen: ResetPasswordScreen_1.default
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
);
exports.default = react_navigation_1.createAppContainer(LoginNavigation);
