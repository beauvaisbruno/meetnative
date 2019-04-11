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
const EmailLoginUi_1 = require("../EmailLoginUi");
const lang_1 = __importDefault(require("../lang"));
const props = {
    navigation: {
        getParam: () => "beauvaisbruno@gmail.com",
        // @ts-ignore
        navigate: (param) => console.log("navigate: ", param)
    },
    fetching: false,
    error: false,
    data: undefined,
    errorData: undefined,
    loginWithEmail: (values, actions) => {
        console.log("loginWithEmail: ", values);
        actions.setSubmitting(false);
    },
};
const setErrors = (message) => (values, actions) => {
    actions.setErrors({ password: message });
    actions.setSubmitting(false);
};
const createErrorsComp = (message) => (() => (React.createElement(EmailLoginUi_1.EmailLoginUi, Object.assign({}, props, { error: true, loginWithEmail: setErrors(message), storyState: { formVisible: true } }))));
react_native_1.storiesOf("EmailLoginUi", module)
    .add("collapsed", () => (React.createElement(EmailLoginUi_1.EmailLoginUi, Object.assign({}, props))))
    .add("success", () => (React.createElement(EmailLoginUi_1.EmailLoginUi, Object.assign({}, props, { storyState: { formVisible: true } }))))
    .add("fetching", () => (React.createElement(EmailLoginUi_1.EmailLoginUi, Object.assign({}, props, { fetching: true, storyState: { formVisible: true } }))))
    .add("error", () => (
// @ts-ignore
React.createElement(EmailLoginUi_1.EmailLoginUi, Object.assign({}, props, { touched: { password: true }, errors: { password: lang_1.default("Connection impossible") }, storyState: { formVisible: true } }))))
    .add("no internet", createErrorsComp(lang_1.default("Connection impossible : internet is not available.")))
    .add("wrong-password", createErrorsComp(lang_1.default("This email account exist, but the password is wrong.")));
