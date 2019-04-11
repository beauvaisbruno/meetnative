"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@storybook/react-native");
const React = __importStar(require("react"));
const GoogleLoginButton_1 = require("../GoogleLoginButton");
const props = {
    fetching: false,
    error: false,
    data: undefined,
    errorData: undefined,
    googleLogin: () => {
        console.log("googleLogin: ");
    },
};
react_native_1.storiesOf("GoogleLoginButton", module)
    .add("default", () => (React.createElement(GoogleLoginButton_1.GoogleLoginButton, Object.assign({}, props))))
    .add("fetching", () => (React.createElement(GoogleLoginButton_1.GoogleLoginButton, Object.assign({}, props, { fetching: true }))))
    .add("error", () => (React.createElement(GoogleLoginButton_1.GoogleLoginButton, Object.assign({}, props, { error: true }))));
