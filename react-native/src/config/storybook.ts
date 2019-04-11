import { getStorybookUI, configure } from "@storybook/react-native";
// @ts-ignore
import { loadStories } from "./storyLoader";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

configure(() => {
  loadStories();
}, module);

const StorybookUI = getStorybookUI({});

export default StorybookUI;
