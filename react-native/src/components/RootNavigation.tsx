import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationActions,
  NavigationState,
  NavigationAction,
  NavigationRoute,
  NavigationParams
} from "react-navigation";
import AuthLoadingScreen from "./login/AuthLoadingScreen";
import LoginNavigation from "./login/LoginNavigation";
import * as React from "react";
import MainNavigation from "./MainNavigation";

const routeConfigMap = {
  AuthLoadingScreen,
  MainNavigation: MainNavigation(),
  LoginNavigation
};

const switchConfig = {
  initialRouteName: "AuthLoadingScreen"
};

const NavigationContainer = createAppContainer(
  createSwitchNavigator(routeConfigMap, switchConfig)
);

let rootRef: NavigationContainerComponent | undefined = undefined;
const ref = (refComponent: NavigationContainerComponent) => {
  rootRef = refComponent;
};

let currentState: NavigationRoute | NavigationState | undefined = undefined;
const onNavigationStateChange = (
  prev: NavigationState,
  next: NavigationState,
  action: NavigationAction
) => {
  currentState = next;
};

function getParams(
  navigationState: NavigationRoute | NavigationState
): NavigationParams | undefined {
  if (!navigationState) return undefined;
  const route = navigationState.routes[navigationState.index];
  if (route.routes) return getParams(route);
  return route.params;
}

function getActiveRouteName(
  navigationState: NavigationRoute | NavigationState
): string | undefined {
  if (!navigationState) return undefined;
  const route = navigationState.routes[navigationState.index];
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
}

export const navigate = (params: NavigationNavigateActionPayload) => {
  if (rootRef) rootRef.dispatch(NavigationActions.navigate(params));
  else console.log("navigator is not def, params", params);
};

export const getCurrentScreen = () => {
  return getActiveRouteName(currentState!);
};

export const getCurrentScreenParam = () => {
  return getParams(currentState!);
};

export default () => (
  <NavigationContainer {...{ ref, onNavigationStateChange }} />
);
