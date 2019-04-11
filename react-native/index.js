require("./src/config/debugHook");

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import StorybookUI from "./src/config/storybook";
import App from "./src/App";

//AppRegistry.registerComponent(appName, () => StorybookUI);
AppRegistry.registerComponent(appName, () => App);
