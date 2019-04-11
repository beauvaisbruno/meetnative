"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@storybook/react-native");
var decorators_1 = require("../../../utils/decorators");
// @ts-ignore
var React = require("react");
var profileReducer_1 = require("../profileReducer");
var ProfileContainer_1 = require("../ProfileContainer");
var ProfileScreen_1 = require("../ProfileScreen");
var props = __assign({}, profileReducer_1.initialState, { loadProfile: function () {
        console.log("loadProfile...");
    }, updateProfile: function () {
        console.log("updateProfile...");
    }, navigation: { addListener: function () { } } });
react_native_1.storiesOf("ProfileScreens", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    .add("container", function () { return (
// @ts-ignore
<ProfileContainer_1.default />); })
    .add("default", function () { return (
// @ts-ignore
<ProfileScreen_1.default {...props}/>); })
    .add("load fetching", function () { return (
// @ts-ignore
<ProfileScreen_1.default {...props} profileLoad={__assign({}, profileReducer_1.initialState.profileLoad, { fetching: true })}/>); })
    .add("load error", function () { return (
// @ts-ignore
<ProfileScreen_1.default {...props} profileLoad={__assign({}, profileReducer_1.initialState.profileLoad, { error: true })}/>); })
    .add("load success", function () { return (<ProfileScreen_1.default {...props} 
// @ts-ignore
profileLoad={{
    data: __assign({}, profileReducer_1.initialState.profileLoad.data, { pseudo: "Bruno", profession: "Ice-cream vendors" })
}}/>); })
    .add("update fetching", function () { return (<ProfileScreen_1.default {...props} 
// @ts-ignore
profileUpdate={__assign({}, profileReducer_1.initialState.profileLoad, { fetching: true })}/>); })
    .add("update error", function () { return (<ProfileScreen_1.default {...props} 
// @ts-ignore
profileUpdate={__assign({}, profileReducer_1.initialState.profileLoad, { error: true })}/>); });
