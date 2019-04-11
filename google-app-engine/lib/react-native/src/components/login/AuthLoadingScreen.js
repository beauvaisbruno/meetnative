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
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const loginReducer_1 = require("./loginReducer");
const reducerHelper_1 = require("../../utils/reducerHelper");
const Loading_1 = __importDefault(require("../../utils/Loading"));
class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return React.createElement(
      react_native_1.View,
      null,
      React.createElement(Loading_1.default, null),
      React.createElement(react_native_1.StatusBar, { barStyle: "default" })
    );
  }
}
exports.AuthLoadingScreen = AuthLoadingScreen;
exports.mapStateToProps = state => {
  return Object.assign({}, state.loginLoadUser);
};
exports.mapDispatchToProps = dispatch => {
  return {
    loadUser: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          loginReducer_1.LoginActions.loginLoadUser
        )
      )
  };
};
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(AuthLoadingScreen);
//# sourceMappingURL=AuthLoadingScreen.js.map
