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
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const reducerHelper_1 = require("../../utils/reducerHelper");
const loginReducer_1 = require("./loginReducer");
const lang_1 = __importDefault(require("./lang"));
const utilsUi_1 = require("../../utils/utilsUi");
class EmailLoginUi extends react_1.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ formVisible: false }, props.storyState);
  }
  render() {
    return react_1.default.createElement(
      native_base_1.View,
      null,
      this.state.formVisible &&
        react_1.default.createElement(
          formik_1.Formik,
          {
            enableReinitialize: true,
            initialValues: {
              email: this.props.navigation.getParam("resetEmail", "a@a.com"),
              password: "azazazaz"
            },
            // initialValues={{
            //  email: this.props.navigation.getParam("resetEmail", ""),
            //   password: "",
            //   connection: undefined
            // }}
            validationSchema: getValidationSchema(),
            onSubmit: (values, actions) => {
              this.props.loginWithEmail(values, actions);
            }
          },
          injectedProps =>
            react_1.default.createElement(
              exports.FormUi,
              Object.assign({}, injectedProps, this.props)
            )
        ),
      this.state.formVisible ||
        react_1.default.createElement(
          native_base_1.View,
          { padder: true },
          react_1.default.createElement(
            native_base_1.Button,
            {
              block: true,
              rounded: true,
              success: true,
              onPress: () => this.handleSetFormVisible(),
              testID: "formVisibleBtn"
            },
            react_1.default.createElement(native_base_1.Icon, {
              name: "ios-mail",
              fontSize: 30
            }),
            react_1.default.createElement(
              native_base_1.Text,
              null,
              lang_1.default("Login with your email")
            )
          )
        )
    );
  }
  handleSetFormVisible() {
    this.setState({ formVisible: true });
  }
}
exports.EmailLoginUi = EmailLoginUi;
exports.mapStateToProps = state =>
  Object.assign({}, state.login.loginWithEmail);
exports.mapDispatchToProps = dispatch => ({
  loginWithEmail: (values, actions) =>
    dispatch(
      reducerHelper_1.fetchingAction(
        loginReducer_1.LoginActions.loginWithEmail,
        values,
        actions
      )
    )
});
exports.FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  navigation,
  fetching
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
        native_base_1.Item,
        {
          stackedLabel: true,
          error: touched.password && errors.password !== undefined,
          success: touched.email && errors.email === undefined
        },
        react_1.default.createElement(
          native_base_1.Label,
          null,
          lang_1.default("Password")
        ),
        react_1.default.createElement(native_base_1.Input, {
          secureTextEntry: true,
          onChangeText: handleChange("password"),
          onBlur: () => setFieldTouched("password"),
          value: values.password
        })
      ),
      utilsUi_1.msgOnError(touched.password, errors.password)
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
          testID: "signinBtn"
        },
        fetching ||
          react_1.default.createElement(native_base_1.Icon, {
            name: "ios-mail",
            color: "white",
            fontSize: 30
          }),
        fetching &&
          react_1.default.createElement(native_base_1.Icon, {
            name: "spinner",
            color: "white",
            type: "EvilIcons",
            fontSize: 30
          }),
        react_1.default.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Login")
        )
      )
    ),
    react_1.default.createElement(
      native_base_1.Button,
      {
        block: true,
        transparent: true,
        onPress: () => navigation.navigate("ResetPasswordScreen"),
        testID: "forgottenBtn"
      },
      react_1.default.createElement(
        native_base_1.Text,
        null,
        lang_1.default("Forgotten password")
      )
    )
  );
function getValidationSchema() {
  return Yup.object().shape({
    email: Yup.string()
      .email(lang_1.default("E-mail is not valid!"))
      .required(lang_1.default("E-mail is required!")),
    password: Yup.string()
      .min(6, lang_1.default("Password has to be longer than 6 characters!"))
      .required(lang_1.default("Password is required!"))
  });
}
exports.getValidationSchema = getValidationSchema;
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(react_navigation_1.withNavigation(EmailLoginUi));
//# sourceMappingURL=EmailLoginUi.js.map
