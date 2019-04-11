"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@storybook/react-native");
const decorators_1 = require("../../../utils/decorators");
// @ts-ignore
const React = __importStar(require("react"));
const profileReducer_1 = require("../profileReducer");
const ProfileContainer_1 = __importDefault(require("../ProfileContainer"));
const ProfileScreen_1 = __importDefault(require("../ProfileScreen"));
const props = Object.assign({}, profileReducer_1.initialState, { loadProfile: () => {
        console.log("loadProfile...");
    }, updateProfile: () => {
        console.log("updateProfile...");
    }, navigation: { addListener: () => { } } });
react_native_1.storiesOf("ProfileScreen", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    .add("container", () => (
// @ts-ignore
React.createElement(ProfileContainer_1.default, null)))
    .add("default", () => (
// @ts-ignore
React.createElement(ProfileScreen_1.default, Object.assign({}, props))))
    .add("load fetching", () => (
// @ts-ignore
React.createElement(ProfileScreen_1.default, Object.assign({}, props, { profileLoad: Object.assign({}, profileReducer_1.initialState.profileLoad, { fetching: true }) }))))
    .add("load error", () => (
// @ts-ignore
React.createElement(ProfileScreen_1.default, Object.assign({}, props, { profileLoad: Object.assign({}, profileReducer_1.initialState.profileLoad, { error: true }) }))))
    .add("load success", () => (React.createElement(ProfileScreen_1.default, Object.assign({}, props, { profileLoad: {
        // @ts-ignore
        data: Object.assign({}, profileReducer_1.initialState.profileLoad.data, { pseudo: "Bruno", profession: "Ice-cream vendors", avatar: "mesange" })
    } }))))
    .add("update fetching", () => (React.createElement(ProfileScreen_1.default, Object.assign({}, props, { 
    // @ts-ignore
    profileUpdate: Object.assign({}, profileReducer_1.initialState.profileLoad, { fetching: true }) }))))
    .add("update error", () => (React.createElement(ProfileScreen_1.default, Object.assign({}, props, { 
    // @ts-ignore
    profileUpdate: Object.assign({}, profileReducer_1.initialState.profileLoad, { error: true }) }))));
