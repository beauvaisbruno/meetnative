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
const React = __importStar(require("react"));
const ResetPasswordScreen_1 = require("../ResetPasswordScreen");
const lang_1 = __importDefault(require("../lang"));
const compErr = (message) => (() => (
// @ts-ignore
React.createElement(ResetPasswordScreen_1.ResetPasswordScreen, { error: true, touched: { email: true }, errors: { email: message } })));
react_native_1.storiesOf("ResetPasswordScreen", module)
    .add("default", () => (
// @ts-ignore
React.createElement(ResetPasswordScreen_1.ResetPasswordScreen, null)))
    .add("fetching", () => (
// @ts-ignore
React.createElement(ResetPasswordScreen_1.ResetPasswordScreen, { fetching: true })))
    .add("error", compErr(lang_1.default("Connection impossible.")))
    .add("no internet", compErr(lang_1.default("Connection impossible : internet is not available.")))
    .add("wrong-account", compErr(lang_1.default("This email account doesn't exist.")));
