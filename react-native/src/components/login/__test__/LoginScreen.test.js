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
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const LoginScreen_1 = __importDefault(require("../LoginScreen"));
it("Logout Button", () => {
    const tree = enzyme_1.shallow(React.createElement(LoginScreen_1.default, null));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
});
