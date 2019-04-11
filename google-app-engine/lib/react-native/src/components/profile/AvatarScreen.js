"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const Avatars_1 = require("./img/Avatars");
const react_native_1 = require("react-native");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
exports.AvatarScreen = ({ navigation }) => {
  const rows = [];
  let even = true;
  let cols = [];
  Object.keys(Avatars_1.avatars).forEach(index => {
    cols.push(
      React.createElement(
        react_native_1.TouchableHighlight,
        {
          onPress: () => {
            navigation.navigate("ProfileContainer", { avatar: index });
          },
          key: index,
          testID: index
        },
        React.createElement(react_native_auto_height_image_1.default, {
          source: Avatars_1.avatars[index],
          width: react_native_responsive_screen_1.widthPercentageToDP("50%")
        })
      )
    );
    if (!even) {
      rows.push(
        React.createElement(
          native_base_1.View,
          { key: index, style: { flexDirection: "row" } },
          cols
        )
      );
      cols = [];
    }
    even = !even;
  });
  return React.createElement(native_base_1.Content, null, rows);
};
exports.default = react_navigation_1.withNavigation(exports.AvatarScreen);
//# sourceMappingURL=AvatarScreen.js.map
