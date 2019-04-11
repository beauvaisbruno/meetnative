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
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const lang_1 = __importDefault(require("./lang"));
const react_native_1 = require("react-native");
class HeaderApp extends React.Component {
  render() {
    return React.createElement(
      native_base_1.Header,
      null,
      React.createElement(
        native_base_1.Left,
        null,
        React.createElement(
          native_base_1.Button,
          {
            transparent: true,
            testID: "menuButton",
            onPress: () => this.openMenu()
          },
          React.createElement(native_base_1.Icon, { name: "menu" })
        )
      ),
      React.createElement(
        native_base_1.Body,
        null,
        React.createElement(native_base_1.Title, null, this.props.headerTitle)
      ),
      React.createElement(native_base_1.Right, null)
    );
  }
  openMenu() {
    if (this.props.userProfile === null) {
      react_native_1.Alert.alert(
        lang_1.default("Save your profile info before to start")
      );
    } else this.props.navigation.openDrawer();
  }
}
exports.HeaderApp = HeaderApp;
exports.mapStateToProps = state => ({
  userProfile: state.profile.profileLoad.data
});
exports.default = react_redux_1.connect(exports.mapStateToProps)(
  react_navigation_1.withNavigation(HeaderApp)
);
