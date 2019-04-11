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
const formik_1 = require("formik");
const native_base_1 = require("native-base");
const React = __importStar(require("react"));
const Yup = __importStar(require("yup"));
const LogoutButton_1 = __importDefault(require("./LogoutButton"));
const profileReducer_1 = require("./profileReducer");
const lang_1 = __importDefault(require("./lang"));
const GooglePlacesInput_1 = require("./GooglePlacesInput");
const AgeSelector_1 = require("./AgeSelector");
const AvatarSelector_1 = __importDefault(require("./AvatarSelector"));
const LangsToLearnSelector_1 = __importDefault(
  require("./LangsToLearnSelector")
);
const LangsToTeachSelector_1 = __importDefault(
  require("./LangsToTeachSelector")
);
const TeachLevel_1 = require("../../TeachLevel");
const LearnLevel_1 = require("../../LearnLevel");
const utils_1 = require("../../utils/utils");
const Language_1 = __importDefault(require("../../Language"));
const GenderSelector_1 = require("./GenderSelector");
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const utilsUi_1 = require("../../utils/utilsUi");
const Loading_1 = __importDefault(require("../../utils/Loading"));
class ProfileScreen extends React.Component {
  componentWillUnmount() {
    this.navListener.remove();
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.props.loadProfile();
      }
    );
  }
  render() {
    return React.createElement(
      native_base_1.View,
      null,
      React.createElement(
        native_base_1.View,
        null,
        React.createElement(
          formik_1.Formik,
          {
            enableReinitialize: true,
            initialValues:
              this.props.profileLoad.data ||
              profileReducer_1.defaultProfileData,
            validationSchema: getValidationSchema(),
            onSubmit: (values, actions) => {
              if (values) this.props.updateProfile(values, actions);
            }
          },
          injectedProps =>
            React.createElement(
              exports.FormUi,
              Object.assign({}, injectedProps, this.props)
            )
        )
      ),
      React.createElement(LogoutButton_1.default, null)
    );
  }
}
exports.FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  profileLoad,
  profileUpdate,
  setFieldValue
}) => {
  return React.createElement(
    native_base_1.View,
    null,
    React.createElement(
      native_base_1.View,
      { padder: true },
      profileLoad.fetching && React.createElement(Loading_1.default, null),
      profileLoad.error &&
        React.createElement(
          native_base_1.Text,
          {
            style: {
              color: custom_1.default.brandDanger,
              alignSelf: "center"
            }
          },
          lang_1.default("Impossible to load the profile")
        ),
      React.createElement(
        native_base_1.Item,
        {
          stackedLabel: true,
          error: touched.pseudo && errors.pseudo !== undefined
        },
        React.createElement(
          native_base_1.Label,
          null,
          lang_1.default("Pseudo")
        ),
        React.createElement(native_base_1.Input, {
          onChangeText: handleChange("pseudo"),
          onBlur: () => setFieldTouched("pseudo"),
          value: values.pseudo
        })
      ),
      utilsUi_1.msgOnError(touched.pseudo, errors.pseudo),
      React.createElement(
        native_base_1.Item,
        {
          stackedLabel: true,
          error: touched.profession && errors.profession !== undefined
        },
        React.createElement(
          native_base_1.Label,
          null,
          lang_1.default("Profession")
        ),
        React.createElement(native_base_1.Input, {
          onChangeText: handleChange("profession"),
          onBlur: () => setFieldTouched("profession"),
          value: values.profession
        })
      ),
      utilsUi_1.msgOnError(touched.profession, errors.profession),
      React.createElement(
        native_base_1.View,
        {
          style: {
            marginTop: 5,
            borderBottomColor: custom_1.default.inputBorderColor,
            borderBottomWidth: 2
          }
        },
        React.createElement(
          native_base_1.Text,
          {
            style: {
              color: custom_1.default.inputColorPlaceholder,
              fontSize: 15,
              marginLeft: 4
            }
          },
          lang_1.default("City")
        ),
        React.createElement(GooglePlacesInput_1.GooglePlacesInput, {
          city: values.city || "",
          onChange: (city, lat, lon) => {
            setFieldValue("city", city);
            setFieldTouched("city");
            setFieldValue("lat", lat);
            setFieldValue("lon", lon);
          }
        }),
        utilsUi_1.msgOnError(touched.city, errors.city)
      ),
      React.createElement(AgeSelector_1.AgeSelector, {
        value: values.age || 18,
        onChange: age => {
          setFieldValue("age", age);
        }
      }),
      React.createElement(AvatarSelector_1.default, {
        value: values.avatar,
        onChange: avatar => {
          setFieldValue("avatar", avatar);
        }
      }),
      React.createElement(GenderSelector_1.GenderSelector, {
        value: values.isMale,
        onChange: isMale => {
          setFieldValue("isMale", isMale);
        }
      }),
      React.createElement(LangsToLearnSelector_1.default, {
        languagesToLearn: values.langsToLearn || {
          english: LearnLevel_1.LearnLevel.beginner
        },
        onChange: langsToLearn => {
          setFieldValue("langsToLearn", langsToLearn);
          setFieldTouched("langsToLearn");
        }
      }),
      React.createElement(LangsToTeachSelector_1.default, {
        languagesToTeach: values.langsToTeach || {
          english: TeachLevel_1.TeachLevel.native
        },
        onChange: langsToTeach => {
          setFieldValue("langsToTeach", langsToTeach);
          setFieldTouched("langsToLearn");
        }
      }),
      React.createElement(
        native_base_1.View,
        { style: { justifyContent: "center", alignItems: "center" } },
        utilsUi_1.msgOnError(touched.langsToLearn, errors.langsToLearn),
        utilsUi_1.msgOnError(touched.pseudo, errors.pseudo),
        utilsUi_1.msgOnError(touched.profession, errors.profession),
        utilsUi_1.msgOnError(touched.city, errors.city)
      )
    ),
    React.createElement(
      native_base_1.View,
      { padder: true },
      React.createElement(
        native_base_1.Button,
        {
          block: true,
          rounded: true,
          success: true,
          onPress: () => handleSubmit(),
          disabled: isSubmitting || profileUpdate.fetching,
          testID: "updateBtn"
        },
        profileUpdate.fetching ||
          React.createElement(native_base_1.Icon, {
            name: "cloud-sync",
            color: "white",
            type: "MaterialCommunityIcons",
            fontSize: 30
          }),
        profileUpdate.fetching &&
          React.createElement(native_base_1.Icon, {
            name: "spinner",
            color: "white",
            type: "EvilIcons",
            fontSize: 30
          }),
        React.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Update Profile")
        )
      ),
      profileUpdate.error &&
        React.createElement(
          native_base_1.Text,
          {
            style: {
              color: custom_1.default.brandDanger,
              alignSelf: "center"
            }
          },
          lang_1.default("Update impossible")
        )
    )
  );
};
function getValidationSchema() {
  return Yup.object().shape({
    pseudo: Yup.string()
      .min(3, lang_1.default("Pseudo has to be longer than 3 characters!"))
      .required(lang_1.default("Pseudo is required!")),
    profession: Yup.string()
      .min(3, lang_1.default("Profession has to be longer than 3 characters!"))
      .required(lang_1.default("Profession is required!")),
    city: Yup.string()
      .required(lang_1.default("Please select a city"))
      .notOneOf(
        [lang_1.default("Current location")],
        lang_1.default("Please select a city")
      ),
    lat: Yup.number().required(lang_1.default("Please select a city")),
    lon: Yup.number().required(lang_1.default("Please select a city")),
    langsToLearn: Yup.lazy(value => {
      return Yup.object().test({
        test(langsToLearn) {
          // eslint-disable-next-line no-invalid-this
          const langsToTeach = this.parent.langsToTeach;
          let intersection = utils_1.intersectObjKey(
            langsToLearn,
            langsToTeach
          );
          intersection = intersection.filter(
            language =>
              !(
                langsToLearn[language] === LearnLevel_1.LearnLevel.fluent &&
                langsToTeach[language] === TeachLevel_1.TeachLevel.fluent
              )
          );
          // eslint-disable-next-line no-invalid-this
          return (
            intersection.length === 0 ||
            this.createError({
              path: "langsToLearn",
              message: lang_1.default("You couldn't teach and learn {lang}", {
                lang: Language_1.default.lang(intersection[0])
              })
            })
          );
        }
      });
    })
  });
}
exports.getValidationSchema = getValidationSchema;
exports.default = ProfileScreen;
//# sourceMappingURL=ProfileScreen.js.map
