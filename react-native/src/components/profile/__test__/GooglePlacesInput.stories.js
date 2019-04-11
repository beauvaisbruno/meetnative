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
const React = __importStar(require("react"));
const GooglePlacesInput_1 = require("../GooglePlacesInput");
react_native_1.storiesOf("GooglePlacesInput", module).add("default", () => (React.createElement(GooglePlacesInput_1.GooglePlacesInput, { city: "Paris", onChange: (city) => console.log("onChange, city: ", city) })));
