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
const profileReducer_1 = require("./profileReducer");
const reducerHelper_1 = require("../../utils/reducerHelper");
const lang_1 = __importDefault(require("./lang"));
class LogoutButton extends react_1.Component {
  render() {
    return react_1.default.createElement(
      native_base_1.View,
      { padder: true },
      react_1.default.createElement(
        native_base_1.Button,
        {
          testID: "logoutButton",
          block: true,
          rounded: true,
          primary: true,
          onPress: () => this.props.doLogout()
        },
        react_1.default.createElement(native_base_1.Icon, {
          name: "logout",
          type: "AntDesign",
          color: "white",
          fontSize: 30
        }),
        react_1.default.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Logout")
        )
      )
    );
  }
}
exports.LogoutButton = LogoutButton;
exports.mapStateToProps = state => {
  return Object.assign({}, state.profile.profileLogout);
};
exports.mapDispatchToProps = dispatch => {
  return {
    doLogout: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          profileReducer_1.ProfileActions.profileLogout
        )
      )
  };
};
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(LogoutButton);
