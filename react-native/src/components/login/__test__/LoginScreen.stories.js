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
const React = __importStar(require("react"));
const react_native_1 = require("@storybook/react-native");
const LoginScreen_1 = __importDefault(require("../LoginScreen"));
const ResetPasswordScreen_1 = __importDefault(require("../ResetPasswordScreen"));
const decorators_1 = require("../../../utils/decorators");
react_native_1.storiesOf("Login", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    .add("LoginScreen", () => (React.createElement(LoginScreen_1.default, null)))
    .add("ResetPasswordScreen", () => (React.createElement(ResetPasswordScreen_1.default, null)));
