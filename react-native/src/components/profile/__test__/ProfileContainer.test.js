"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const React = __importStar(require("react"));
const profileReducer_1 = require("../profileReducer");
const ProfileContainer_1 = __importStar(require("../ProfileContainer"));
jest.mock("../../../utils/reducerHelper");
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
it("Container", () => {
    // @ts-ignore
    const wrapper = enzyme_1.shallow(React.createElement(ProfileContainer_1.default, null));
    expect(wrapper).toBeDefined();
    expect(ProfileContainer_1.mapStateToProps({
        profile: { expected: "expected" }
    })).toEqual({ expected: "expected" });
    const dispatchMock = jest.fn();
    const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
    jest
        .spyOn(reducerHelper, "fetchingAction")
        .mockImplementation(fetchingAction);
    const map = ProfileContainer_1.mapDispatchToProps(dispatchMock);
    map.loadProfile();
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(profileReducer_1.ProfileActions.profileLoad);
    map.updateProfile("values", "actions");
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(profileReducer_1.ProfileActions.profileUpdate, "values", "actions");
});
