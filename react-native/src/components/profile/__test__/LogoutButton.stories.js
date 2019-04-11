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
const React = __importStar(require("react"));
const LogoutButton_1 = __importDefault(require("../LogoutButton"));
react_native_1.storiesOf("LogoutButton", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    .add("container", () => (
// @ts-ignore
React.createElement(LogoutButton_1.default, null)));
