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
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const FbLoginButton_1 = __importDefault(require("./FbLoginButton"));
const EmailLoginUi_1 = __importDefault(require("./EmailLoginUi"));
const GoogleLoginButton_1 = __importDefault(require("./GoogleLoginButton"));
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
class LoginScreen extends react_1.Component {
  render() {
    return react_1.default.createElement(
      native_base_1.Container,
      null,
      react_1.default.createElement(
        native_base_1.Content,
        null,
        react_1.default.createElement(
          react_native_auto_height_image_1.default,
          {
            source: require("./img/header.png"),
            width: react_native_responsive_screen_1.widthPercentageToDP("100%")
          }
        ),
        react_1.default.createElement(
          native_base_1.View,
          { padder: true },
          react_1.default.createElement(GoogleLoginButton_1.default, null),
          react_1.default.createElement(FbLoginButton_1.default, null),
          react_1.default.createElement(EmailLoginUi_1.default, null)
        )
      )
    );
  }
}
exports.default = LoginScreen;
//# sourceMappingURL=LoginScreen.js.map
