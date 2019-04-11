"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
let navigator;
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}
function navigate(params) {
  navigator.dispatch(react_navigation_1.NavigationActions.navigate(params));
}
exports.default = {
  navigate,
  setTopLevelNavigator
};
//# sourceMappingURL=navigationService.js.map
