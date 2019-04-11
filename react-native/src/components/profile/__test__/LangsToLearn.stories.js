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
const LearnLevel_1 = require("../../../LearnLevel");
const LangsToLearnSelector_1 = __importDefault(require("../LangsToLearnSelector"));
const decorators_1 = require("../../../utils/decorators");
react_native_1.storiesOf("LangsToLearnSelector", module)
    .addDecorator(decorators_1.baseDecorator)
    .add("default", () => (React.createElement(LangsToLearnSelector_1.default, { languagesToLearn: {
        english: LearnLevel_1.LearnLevel.fluent,
        spanish: LearnLevel_1.LearnLevel.beginner
    }, onChange: (languagesToLearn) => console.log("onChange, languagesToLearn: ", languagesToLearn) })));
