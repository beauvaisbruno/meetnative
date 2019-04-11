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
const enzyme_1 = require("enzyme");
const AgeSelector_1 = require("../AgeSelector");
const React = __importStar(require("react"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
it("Age Selector", () => __awaiter(this, void 0, void 0, function* () {
    const onChange = jest.fn();
    const tree = enzyme_1.shallow(React.createElement(AgeSelector_1.AgeSelector, { value: 1, onChange: onChange }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const picker = tree.findWhere(node => node.prop("testID") === "picker");
    picker.props().onValueChange(10);
    expect(onChange).toBeCalledWith(10);
}));
