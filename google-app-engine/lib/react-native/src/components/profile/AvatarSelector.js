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
const native_base_1 = require("native-base");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Avatars_1 = require("./img/Avatars");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
const react_navigation_1 = require("react-navigation");
class AvatarSelector extends React.Component {
  componentWillUnmount() {
    this.navListener.remove();
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (
          this.props.navigation.state.params &&
          this.props.navigation.state.params.avatar
        ) {
          this.props.onChange(this.props.navigation.state.params.avatar);
          this.props.navigation.state.params.avatar = undefined;
        }
      }
    );
  }
  render() {
    return React.createElement(
      native_base_1.View,
      {
        style: {
          textAlignVertical: "top",
          justifyContent: "center",
          alignItems: "center"
        }
      },
      React.createElement(
        native_base_1.View,
        { style: { textAlignVertical: "top", flex: 1, flexDirection: "row" } },
        React.createElement(
          native_base_1.Text,
          { style: { textAlignVertical: "top", marginRight: 10 } },
          "Avatar"
        ),
        React.createElement(
          react_native_1.TouchableHighlight,
          {
            testID: "TouchableHighlight",
            onPress: () => {
              this.props.navigation.navigate("AvatarScreen");
            }
          },
          React.createElement(react_native_auto_height_image_1.default, {
            source: Avatars_1.avatars[this.props.value],
            width: react_native_responsive_screen_1.widthPercentageToDP("45%")
          })
        )
      )
    );
  }
}
exports.AvatarSelector = AvatarSelector;
exports.default = react_navigation_1.withNavigation(AvatarSelector);
//# sourceMappingURL=AvatarSelector.js.map
