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
const AvatarSelector_1 = require("../AvatarSelector");
react_native_1.storiesOf("AvatarSelector", module)
    .addDecorator(decorators_1.baseDecorator)
    .add("default", () => (React.createElement(AvatarSelector_1.AvatarSelector, { value: "cute", onChange: (avatar) => console.log("onChange, avatar: ", avatar), navigation: {
        // @ts-ignore
        navigate: (screen) => console.log("navigate, screen: ", screen),
        // @ts-ignore
        addListener: (_, __) => { }
        // state: { params: { avatar: "avatar" } }
    } })));
