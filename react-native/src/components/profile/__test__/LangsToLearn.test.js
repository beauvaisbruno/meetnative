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
const React = __importStar(require("react"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const LangsToLearnSelector_1 = __importDefault(require("../LangsToLearnSelector"));
const LearnLevel_1 = require("../../../LearnLevel");
it("LangsToLearnSelector", () => __awaiter(this, void 0, void 0, function* () {
    const onChange = jest.fn();
    const tree = enzyme_1.shallow(React.createElement(LangsToLearnSelector_1.default, { languagesToLearn: { spanish: LearnLevel_1.LearnLevel.beginner }, onChange: onChange }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const addBtn = tree.findWhere(node => node.prop("testID") === "addBtn");
    addBtn.props().onPress();
    expect(onChange).toBeCalledWith({
        spanish: LearnLevel_1.LearnLevel.beginner,
        english: LearnLevel_1.LearnLevel.beginner
    });
    const tree2 = enzyme_1.shallow(React.createElement(LangsToLearnSelector_1.default, { languagesToLearn: {
            english: LearnLevel_1.LearnLevel.beginner,
            spanish: LearnLevel_1.LearnLevel.beginner,
            italian: LearnLevel_1.LearnLevel.beginner
        }, onChange: onChange }));
    expect(enzyme_to_json_1.default(tree2)).toMatchSnapshot();
    const langPicker = tree2.findWhere(node => node.prop("testID") === "lang-english");
    langPicker.props().onValueChange("spanish");
    expect(onChange).toBeCalledWith({
        spanish: LearnLevel_1.LearnLevel.beginner,
        italian: LearnLevel_1.LearnLevel.beginner
    });
    const levelPicker = tree2.findWhere(node => node.prop("testID") === "level-english");
    levelPicker.props().onValueChange(LearnLevel_1.LearnLevel.fluent);
    expect(onChange).toBeCalledWith({
        english: LearnLevel_1.LearnLevel.fluent,
        spanish: LearnLevel_1.LearnLevel.beginner,
        italian: LearnLevel_1.LearnLevel.beginner
    });
    const deleteBtn = tree2.findWhere(node => node.prop("testID") === "delete-english");
    deleteBtn.props().onPress();
    expect(onChange).toBeCalledWith({
        spanish: LearnLevel_1.LearnLevel.beginner,
        italian: LearnLevel_1.LearnLevel.beginner
    });
}));
