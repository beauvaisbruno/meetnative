"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const AuthLoadingScreen_1 = __importDefault(require("./login/AuthLoadingScreen"));
const LoginNavigation_1 = __importDefault(require("./login/LoginNavigation"));
const React = __importStar(require("react"));
const MainNavigation_1 = __importDefault(require("./MainNavigation"));
const routeConfigMap = {
    AuthLoadingScreen: AuthLoadingScreen_1.default,
    MainNavigation: MainNavigation_1.default(),
    LoginNavigation: LoginNavigation_1.default
};
const switchConfig = {
    initialRouteName: "AuthLoadingScreen"
};
const NavigationContainer = react_navigation_1.createAppContainer(react_navigation_1.createSwitchNavigator(routeConfigMap, switchConfig));
let rootRef = undefined;
const ref = (refComponent) => {
    rootRef = refComponent;
};
let currentState = undefined;
const onNavigationStateChange = (prev, next, action) => {
    currentState = next;
};
function getParams(navigationState) {
    if (!navigationState)
        return undefined;
    const route = navigationState.routes[navigationState.index];
    if (route.routes)
        return getParams(route);
    return route.params;
}
function getActiveRouteName(navigationState) {
    if (!navigationState)
        return undefined;
    const route = navigationState.routes[navigationState.index];
    if (route.routes)
        return getActiveRouteName(route);
    return route.routeName;
}
exports.navigate = (params) => {
    if (rootRef)
        rootRef.dispatch(react_navigation_1.NavigationActions.navigate(params));
    else
        console.log("navigator is not def, params", params);
};
exports.getCurrentScreen = () => {
    return getActiveRouteName(currentState);
};
exports.getCurrentScreenParam = () => {
    return getParams(currentState);
};
exports.default = () => (React.createElement(NavigationContainer, Object.assign({}, { ref, onNavigationStateChange })));
