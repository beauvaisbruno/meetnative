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
const FbLoginButton_1 = require("../FbLoginButton");
const props = {
    fetching: false,
    error: false,
    data: undefined,
    errorData: undefined,
    facebookLogin: () => {
        console.log("facebookLogin: ");
    },
};
react_native_1.storiesOf("FbLoginButton", module)
    .add("default", () => (React.createElement(FbLoginButton_1.FbLoginButton, Object.assign({}, props))))
    .add("fetching", () => (React.createElement(FbLoginButton_1.FbLoginButton, Object.assign({}, props, { fetching: true }))))
    .add("error", () => (React.createElement(FbLoginButton_1.FbLoginButton, Object.assign({}, props, { error: true }))));
