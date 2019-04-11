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
const react_redux_1 = require("react-redux");
const reducerHelper_1 = require("../../utils/reducerHelper");
const loginReducer_1 = require("./loginReducer");
const lang_1 = __importDefault(require("./lang"));
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
exports.mapStateToProps = state => {
  return Object.assign({}, state.login.loginFacebook);
};
exports.mapDispatchToProps = dispatch => {
  return {
    facebookLogin: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          loginReducer_1.LoginActions.loginFacebook
        )
      )
  };
};
class FbLoginButton extends react_1.Component {
  render() {
    return react_1.default.createElement(
      native_base_1.View,
      { padder: true },
      react_1.default.createElement(
        native_base_1.Button,
        {
          block: true,
          rounded: true,
          style: { backgroundColor: custom_1.default.brandPrimary },
          onPress: () => this.props.facebookLogin(),
          testID: "facebookLoginButton"
        },
        this.props.fetching ||
          react_1.default.createElement(native_base_1.Icon, {
            name: "facebook-square",
            color: "white",
            type: "AntDesign",
            fontSize: 30
          }),
        this.props.fetching &&
          react_1.default.createElement(native_base_1.Icon, {
            name: "spinner",
            color: "white",
            type: "EvilIcons",
            fontSize: 30
          }),
        react_1.default.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Login with Facebook")
        )
      ),
      this.props.error &&
        react_1.default.createElement(
          native_base_1.Text,
          {
            style: {
              color: custom_1.default.brandDanger,
              alignSelf: "center"
            }
          },
          lang_1.default("Sign in impossible")
        )
    );
  }
}
exports.FbLoginButton = FbLoginButton;
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(FbLoginButton);
