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
const TeachLevel_1 = require("../../../TeachLevel");
const LangsToTeachSelector_1 = __importDefault(require("../LangsToTeachSelector"));
it("LangsToTeachSelector", () => {
    const onChange = jest.fn();
    const tree = enzyme_1.shallow(React.createElement(LangsToTeachSelector_1.default, { languagesToTeach: { spanish: TeachLevel_1.TeachLevel.fluent }, onChange: onChange }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const addBtn = tree.findWhere(node => node.prop("testID") === "addBtn");
    addBtn.props().onPress();
    expect(onChange).toBeCalledWith({
        spanish: TeachLevel_1.TeachLevel.fluent,
        english: TeachLevel_1.TeachLevel.fluent
    });
    const tree2 = enzyme_1.shallow(React.createElement(LangsToTeachSelector_1.default, { languagesToTeach: {
            english: TeachLevel_1.TeachLevel.fluent,
            spanish: TeachLevel_1.TeachLevel.fluent,
            italian: TeachLevel_1.TeachLevel.fluent
        }, onChange: onChange }));
    expect(enzyme_to_json_1.default(tree2)).toMatchSnapshot();
    const langPicker = tree2.findWhere(node => node.prop("testID") === "lang-english");
    langPicker.props().onValueChange("spanish");
    expect(onChange).toBeCalledWith({
        spanish: TeachLevel_1.TeachLevel.fluent,
        italian: TeachLevel_1.TeachLevel.fluent
    });
    const levelPicker = tree2.findWhere(node => node.prop("testID") === "level-english");
    levelPicker.props().onValueChange(TeachLevel_1.TeachLevel.native);
    expect(onChange).toBeCalledWith({
        english: TeachLevel_1.TeachLevel.native,
        spanish: TeachLevel_1.TeachLevel.fluent,
        italian: TeachLevel_1.TeachLevel.fluent
    });
    const deleteBtn = tree2.findWhere(node => node.prop("testID") === "delete-english");
    deleteBtn.props().onPress();
    expect(onChange).toBeCalledWith({
        spanish: TeachLevel_1.TeachLevel.fluent,
        italian: TeachLevel_1.TeachLevel.fluent
    });
});
