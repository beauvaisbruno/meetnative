import * as React from "react";
import {
  createAppContainer,
  createStackNavigator,
  NavigationContainer
} from "react-navigation";
import LoginScreen from "./LoginScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const LoginNavigation: NavigationContainer = createStackNavigator(
  {
    LoginScreen,
    ResetPasswordScreen
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
);

export default createAppContainer(LoginNavigation);
