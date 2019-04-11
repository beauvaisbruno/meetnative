"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
let navigator;
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}
function navigate(params) {
  if (navigator)
    navigator.dispatch(react_navigation_1.NavigationActions.navigate(params));
  else console.log("navigator is not def, params", params);
}
exports.default = {
  navigate,
  setTopLevelNavigator
};
