"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@storybook/react-native");
const decorators_1 = require("../../../utils/decorators");
const React = __importStar(require("react"));
const AgeSelector_1 = require("../AgeSelector");
react_native_1.storiesOf("AgeSelector", module)
    .addDecorator(decorators_1.baseDecorator)
    .add("container", () => (React.createElement(AgeSelector_1.AgeSelector, { value: 20, onChange: value => console.log("onChange: ", value) })));
