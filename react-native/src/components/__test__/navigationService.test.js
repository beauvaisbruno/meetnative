"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigate = jest.fn();
jest.mock("react-navigation", () => ({ NavigationActions: { navigate } }));
const navigationService_1 = __importDefault(require("../navigationService"));
it("NavigationService", () => {
    const dispatch = jest.fn(() => { });
    navigate.mockReturnValue("NavigationActions");
    // @ts-ignore
    navigationService_1.default.setTopLevelNavigator({ dispatch });
    // @ts-ignore
    navigationService_1.default.navigate("params");
    expect(dispatch).toBeCalledWith("NavigationActions");
    expect(navigate).toBeCalledWith("params");
});
