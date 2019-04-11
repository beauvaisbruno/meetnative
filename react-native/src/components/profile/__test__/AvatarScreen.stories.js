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
const AvatarScreen_1 = require("../AvatarScreen");
react_native_1.storiesOf("AvatarScreen", module)
    .addDecorator(decorators_1.baseDecorator)
    .add("container", () => (React.createElement(AvatarScreen_1.AvatarScreen, { navigation: {
        // @ts-ignore
        navigate: (screen) => console.log("navigate, screen: ", screen)
    } })));
