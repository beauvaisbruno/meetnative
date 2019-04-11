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
const React = __importStar(require("react"));
const PageTemplate_1 = __importDefault(require("../PageTemplate"));
const react_native_1 = require("react-native");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
it("pageTemplate", () => {
    class Comp extends React.Component {
        render() {
            return React.createElement(react_native_1.View, null);
        }
    }
    const openDrawer = jest.fn();
    const Node = PageTemplate_1.default(Comp, "Home");
    // @ts-ignore
    const tree = enzyme_1.shallow(React.createElement(Node, { navigation: { openDrawer } }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
});
