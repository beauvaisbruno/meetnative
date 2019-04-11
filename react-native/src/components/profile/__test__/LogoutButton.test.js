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
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const enzyme_1 = require("enzyme");
const LogoutButton_1 = __importStar(require("../LogoutButton"));
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
const profileReducer_1 = require("../profileReducer");
it("Component", () => {
    const doLogout = jest.fn();
    const tree = enzyme_1.shallow(React.createElement(LogoutButton_1.LogoutButton, Object.assign({ doLogout: doLogout }, new reducerHelper.ActionResult())));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const button = tree.findWhere(node => node.prop("testID") === "logoutButton");
    button.props().onPress();
    expect(doLogout.mock.calls.length).toBe(1);
});
it("Container", () => {
    // @ts-ignore
    const wrapper = enzyme_1.shallow(React.createElement(LogoutButton_1.default, null));
    expect(wrapper).toBeDefined();
    expect(LogoutButton_1.mapStateToProps({ profile: { profileLogout: { expected: "expected" } } }))
        .toEqual({ expected: "expected" });
    const dispatchMock = jest.fn();
    const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
    jest.spyOn(reducerHelper, "fetchingAction")
        .mockImplementation(fetchingAction);
    const map = LogoutButton_1.mapDispatchToProps(dispatchMock);
    map.doLogout();
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(profileReducer_1.ProfileActions.profileLogout);
});
