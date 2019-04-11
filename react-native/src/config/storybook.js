"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@storybook/react-native");
// @ts-ignore
const storyLoader_1 = require("./storyLoader");
react_native_1.configure(() => {
  storyLoader_1.loadStories();
}, module);
const StorybookUI = react_native_1.getStorybookUI({});
exports.default = StorybookUI;
