"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
jest.mock("react-navigation", () => {
    return {
        withNavigation: (param) => param
    };
});
const enzyme_1 = require("enzyme");
const React = __importStar(require("react"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const AvatarSelector_1 = require("../AvatarSelector");
it("Avatar Selector", () => __awaiter(this, void 0, void 0, function* () {
    const navigate = jest.fn();
    const addListener = jest.fn((eventName, callback) => {
        callback("mockPayload");
    });
    const onChange = jest.fn();
    const tree = enzyme_1.shallow(React.createElement(AvatarSelector_1.AvatarSelector, { onChange: onChange, navigation: {
            navigate,
            // @ts-ignore
            addListener,
            // @ts-ignore
            state: { params: { avatar: "avatar" } }
        } }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    expect(addListener.mock.calls[0][0]).toBe("willFocus");
    expect(onChange).toBeCalledWith("avatar");
    const TouchableHighlight = tree.findWhere(node => node.prop("testID") === "TouchableHighlight");
    TouchableHighlight.props().onPress();
    expect(navigate).toBeCalledWith("AvatarScreen");
}));
