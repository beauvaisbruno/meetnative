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
const enzyme_1 = require("enzyme");
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
const loginReducer_1 = require("../loginReducer");
const React = __importStar(require("react"));
const GoogleLoginButton_1 = __importStar(require("../GoogleLoginButton"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
it("Container", () => {
    // @ts-ignore
    const wrapper = enzyme_1.shallow(React.createElement(GoogleLoginButton_1.default, null));
    expect(wrapper).toBeDefined();
    expect(GoogleLoginButton_1.mapStateToProps({ login: { loginGoogle: { expected: "expected" } } }))
        .toEqual({ expected: "expected" });
    const dispatchMock = jest.fn();
    const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
    jest.spyOn(reducerHelper, "fetchingAction")
        .mockImplementation(fetchingAction);
    const map = GoogleLoginButton_1.mapDispatchToProps(dispatchMock);
    map.googleLogin();
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(loginReducer_1.LoginActions.loginGoogle);
});
it("Component", () => {
    const googleLogin = jest.fn();
    const tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(GoogleLoginButton_1.GoogleLoginButton, { googleLogin: googleLogin, error: false, fetching: false }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const button = tree.findWhere(node => node.prop("testID") === "googleLoginBtn");
    button.props().onPress();
    expect(googleLogin).toBeCalled();
    tree.setProps({ error: true, fetching: false });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({ fetching: false, error: true });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
});
