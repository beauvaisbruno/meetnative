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
const Yup = __importStar(require("yup"));
const formik_1 = require("formik");
const react_redux_1 = require("react-redux");
const loginReducer_1 = require("./loginReducer");
const reducerHelper_1 = require("../../utils/reducerHelper");
const lang_1 = __importDefault(require("./lang"));
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
const utilsUi_1 = require("../../utils/utilsUi");
exports.mapStateToProps = state =>
  Object.assign({}, state.login.loginResetEmail);
exports.mapDispatchToProps = dispatch => ({
  resetEmail: (values, actions) =>
    dispatch(
      reducerHelper_1.fetchingAction(
        loginReducer_1.LoginActions.loginResetEmail,
        values,
        actions
      )
    )
});
function getValidationSchema() {
  return Yup.object().shape({
    email: Yup.string()
      .email(lang_1.default("E-mail is not valid!"))
      .required(lang_1.default("E-mail is required!"))
  });
}
exports.getValidationSchema = getValidationSchema;
class ResetPasswordScreen extends react_1.Component {
  render() {
    return react_1.default.createElement(
      native_base_1.View,
      null,
      react_1.default.createElement(react_native_auto_height_image_1.default, {
        source: require("./img/header.png"),
        width: react_native_responsive_screen_1.widthPercentageToDP("100%")
      }),
      react_1.default.createElement(
        formik_1.Formik,
        {
          initialValues: { email: "beauvaisbruno@gmail.com", connection: null },
          validationSchema: getValidationSchema(),
          onSubmit: (values, actions) => {
            this.props.resetEmail(values, actions);
          }
        },
        injectedProps =>
          react_1.default.createElement(
            exports.FormUi,
            Object.assign({}, injectedProps, this.props)
          )
      )
    );
  }
}
ResetPasswordScreen.navigationOptions = {
  headerTitle: lang_1.default("Reset password")
};
exports.ResetPasswordScreen = ResetPasswordScreen;
exports.FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  fetching,
  error
}) =>
  react_1.default.createElement(
    native_base_1.View,
    null,
    react_1.default.createElement(
      native_base_1.View,
      { padder: true },
      react_1.default.createElement(
        native_base_1.Item,
        {
          stackedLabel: true,
          error: touched.email && errors.email !== undefined,
          success: touched.email && errors.email === undefined
        },
        react_1.default.createElement(
          native_base_1.Label,
          null,
          lang_1.default("Email")
        ),
        react_1.default.createElement(native_base_1.Input, {
          onChangeText: handleChange("email"),
          onBlur: () => setFieldTouched("email"),
          value: values.email
        })
      ),
      utilsUi_1.msgOnError(touched.email, errors.email)
    ),
    react_1.default.createElement(
      native_base_1.View,
      { padder: true },
      react_1.default.createElement(
        native_base_1.Button,
        {
          block: true,
          rounded: true,
          success: true,
          onPress: () => handleSubmit(),
          disabled: isSubmitting,
          testID: "resetBtn"
        },
        fetching
          ? react_1.default.createElement(native_base_1.Icon, {
              name: "spinner",
              color: "white",
              type: "EvilIcons",
              fontSize: 30
            })
          : react_1.default.createElement(native_base_1.Icon, {
              name: "lock-reset",
              type: "MaterialCommunityIcons",
              color: "white",
              fontSize: 30
            }),
        react_1.default.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Reset the password")
        )
      )
    )
  );
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(ResetPasswordScreen);
//# sourceMappingURL=ResetPasswordScreen.js.map
