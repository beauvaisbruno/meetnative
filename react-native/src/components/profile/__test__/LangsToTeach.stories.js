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
const react_native_1 = require("@storybook/react-native");
const React = __importStar(require("react"));
const TeachLevel_1 = require("../../../TeachLevel");
const decorators_1 = require("../../../utils/decorators");
const LangsToTeachSelector_1 = __importDefault(require("../LangsToTeachSelector"));
react_native_1.storiesOf("LangsToTeachSelector", module)
    .addDecorator(decorators_1.baseDecorator)
    .add("default", () => (React.createElement(LangsToTeachSelector_1.default, { languagesToTeach: {
        english: TeachLevel_1.TeachLevel.native,
        spanish: TeachLevel_1.TeachLevel.fluent
    }, onChange: (languagesToTeach) => console.log("onChange, languagesToTeach: ", languagesToTeach) })));
