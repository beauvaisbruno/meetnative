import {
  NavigationActions,
  NavigationContainer,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationScreenProp
} from "react-navigation";

let navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef;
}

function navigate(params: NavigationNavigateActionPayload) {
  if (navigator) navigator.dispatch(NavigationActions.navigate(params));
  else console.log("navigator is not def, params", params);
}

export default {
  navigate,
  setTopLevelNavigator
};
