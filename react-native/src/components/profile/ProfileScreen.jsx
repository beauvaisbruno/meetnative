"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var formik_1 = require("formik");
var native_base_1 = require("native-base");
var React = require("react");
var Yup = require("yup");
var LogoutButton_1 = require("./LogoutButton");
var profileReducer_1 = require("./profileReducer");
var lang_1 = require("./lang");
var GooglePlacesInput_1 = require("./GooglePlacesInput");
var AgeSelector_1 = require("./AgeSelector");
var AvatarSelector_1 = require("./AvatarSelector");
var LangsToLearnSelector_1 = require("./LangsToLearnSelector");
var LangsToTeachSelector_1 = require("./LangsToTeachSelector");
var TeachLevel_1 = require("../../TeachLevel");
var LearnLevel_1 = require("../../LearnLevel");
var utils_1 = require("../../utils/utils");
var Language_1 = require("../../Language");
var GenderSelector_1 = require("./GenderSelector");
var custom_1 = require("../../config/native-base-theme/variables/custom");
var utilsUi_1 = require("../../utils/utilsUi");
var Loading_1 = require("../../utils/Loading");
var ProfileScreen = /** @class */ (function (_super) {
    __extends(ProfileScreen, _super);
    function ProfileScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfileScreen.prototype.componentWillUnmount = function () {
        if (this.navListener)
            this.navListener.remove();
    };
    ProfileScreen.prototype.componentDidMount = function () {
        var _this = this;
        console.log("this.props: ", this.props);
        this.navListener = this.props.navigation.addListener("willFocus", function (payload) {
            _this.props.loadProfile();
        });
    };
    ProfileScreen.prototype.render = function () {
        var _this = this;
        return (<native_base_1.View>
        <native_base_1.View>
          <formik_1.Formik enableReinitialize initialValues={this.props.profileLoad.data || profileReducer_1.defaultProfileData} validationSchema={getValidationSchema()} onSubmit={function (values, actions) {
            if (values)
                _this.props.updateProfile(values, actions);
        }}>
            {function (injectedProps) { return (<exports.FormUi {...injectedProps} {..._this.props}/>); }}
          </formik_1.Formik>
        </native_base_1.View>
        <LogoutButton_1.default />
      </native_base_1.View>);
    };
    return ProfileScreen;
}(React.Component));
exports.FormUi = function (_a) {
    var handleChange = _a.handleChange, setFieldTouched = _a.setFieldTouched, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, values = _a.values, errors = _a.errors, touched = _a.touched, dirty = _a.dirty, profileLoad = _a.profileLoad, profileUpdate = _a.profileUpdate, setFieldValue = _a.setFieldValue;
    return (<native_base_1.View>
      <native_base_1.View padder>
        {profileLoad.fetching && <Loading_1.default />}
        {profileLoad.error && (<native_base_1.Text style={{
        color: custom_1.default.brandDanger,
        alignSelf: "center"
    }}>
            {lang_1.default("Impossible to load the profile")}
          </native_base_1.Text>)}
        <native_base_1.Item stackedLabel error={touched.pseudo && errors.pseudo !== undefined}>
          <native_base_1.Label>{lang_1.default("Pseudo")}</native_base_1.Label>
          <native_base_1.Input onChangeText={handleChange("pseudo")} onBlur={function () { return setFieldTouched("pseudo"); }} value={values.pseudo}/>
        </native_base_1.Item>
        {utilsUi_1.msgOnError(touched.pseudo, errors.pseudo)}
        <native_base_1.Item stackedLabel error={touched.profession && errors.profession !== undefined}>
          <native_base_1.Label>{lang_1.default("Profession")}</native_base_1.Label>
          <native_base_1.Input onChangeText={handleChange("profession")} onBlur={function () { return setFieldTouched("profession"); }} value={values.profession}/>
        </native_base_1.Item>
        {utilsUi_1.msgOnError(touched.profession, errors.profession)}
        <native_base_1.View style={{
        marginTop: 5,
        borderBottomColor: custom_1.default.inputBorderColor,
        borderBottomWidth: 2
    }}>
          <native_base_1.Text style={{
        color: custom_1.default.inputColorPlaceholder,
        fontSize: 15,
        marginLeft: 4
    }}>
            {lang_1.default("City")}
          </native_base_1.Text>
          <GooglePlacesInput_1.GooglePlacesInput city={values.city || ""} onChange={function (city, lat, lon) {
        setFieldValue("city", city);
        setFieldTouched("city");
        setFieldValue("lat", lat);
        setFieldValue("lon", lon);
    }}/>
          {utilsUi_1.msgOnError(touched.city, errors.city)}
        </native_base_1.View>
        <AgeSelector_1.AgeSelector value={values.age || 18} onChange={function (age) {
        setFieldValue("age", age);
    }}/>
        <AvatarSelector_1.default value={values.avatar} onChange={function (avatar) {
        setFieldValue("avatar", avatar);
    }}/>
        <GenderSelector_1.GenderSelector value={values.isMale} onChange={function (isMale) {
        setFieldValue("isMale", isMale);
    }}/>
        <LangsToLearnSelector_1.default languagesToLearn={values.langsToLearn || { english: LearnLevel_1.LearnLevel.beginner }} onChange={function (langsToLearn) {
        setFieldValue("langsToLearn", langsToLearn);
        setFieldTouched("langsToLearn");
    }}/>
        <LangsToTeachSelector_1.default languagesToTeach={values.langsToTeach || { english: TeachLevel_1.TeachLevel.native }} onChange={function (langsToTeach) {
        setFieldValue("langsToTeach", langsToTeach);
        setFieldTouched("langsToLearn");
    }}/>
        <native_base_1.View style={{ justifyContent: "center", alignItems: "center" }}>
          {utilsUi_1.msgOnError(touched.langsToLearn, errors.langsToLearn)}
          {utilsUi_1.msgOnError(touched.pseudo, errors.pseudo)}
          {utilsUi_1.msgOnError(touched.profession, errors.profession)}
          {utilsUi_1.msgOnError(touched.city, errors.city)}
        </native_base_1.View>
      </native_base_1.View>

      <native_base_1.View padder>
        <native_base_1.Button block rounded success onPress={function () { return handleSubmit(); }} disabled={isSubmitting || profileUpdate.fetching} testID={"updateBtn"}>
          {profileUpdate.fetching || (<native_base_1.Icon name="cloud-sync" color="white" type="MaterialCommunityIcons" fontSize={30}/>)}
          {profileUpdate.fetching && (<native_base_1.Icon name="spinner" color="white" type="EvilIcons" fontSize={30}/>)}
          <native_base_1.Text>{lang_1.default("Update Profile")}</native_base_1.Text>
        </native_base_1.Button>

        {profileUpdate.error && (<native_base_1.Text style={{
        color: custom_1.default.brandDanger,
        alignSelf: "center"
    }}>
            {lang_1.default("Update impossible")}
          </native_base_1.Text>)}
      </native_base_1.View>
    </native_base_1.View>);
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
            .notOneOf([lang_1.default("Current location")], lang_1.default("Please select a city")),
        lat: Yup.number().required(lang_1.default("Please select a city")),
        lon: Yup.number().required(lang_1.default("Please select a city")),
        langsToLearn: Yup.lazy(function (value) {
            return Yup.object().test({
                test: function (langsToLearn) {
                    // eslint-disable-next-line no-invalid-this
                    var langsToTeach = this.parent.langsToTeach;
                    var intersection = utils_1.intersectObjKey(langsToLearn, langsToTeach);
                    intersection = intersection.filter(function (language) {
                        return !(langsToLearn[language] === LearnLevel_1.LearnLevel.fluent &&
                            langsToTeach[language] === TeachLevel_1.TeachLevel.fluent);
                    });
                    // eslint-disable-next-line no-invalid-this
                    return (intersection.length === 0 ||
                        this.createError({
                            path: "langsToLearn",
                            message: lang_1.default("You couldn't teach and learn {lang}", {
                                lang: Language_1.default.lang(intersection[0])
                            })
                        }));
                }
            });
        })
    });
}
exports.getValidationSchema = getValidationSchema;
exports.default = ProfileScreen;
