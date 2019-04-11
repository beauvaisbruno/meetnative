"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../../../../jest/testUtils");
testUtils_1.mockMath();
const React = __importStar(require("react"));
const ProfileScreen_1 = __importStar(require("../ProfileScreen"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const enzyme_1 = require("enzyme");
const profileReducer_1 = require("../profileReducer");
const yup_1 = require("yup");
const TeachLevel_1 = require("../../../TeachLevel");
const LearnLevel_1 = require("../../../LearnLevel");
const lang_1 = __importDefault(require("../lang"));
const loadProfile = jest.fn();
const updateProfile = jest.fn();
const NavigationAndFormikMock = jest.fn();
it("ValidationSchema langs", () => {
    let fields = {
        pseudo: "pseudo",
        profession: "profession",
        city: "city",
        age: 21,
        avatar: "avatar",
        lat: 1,
        lon: 1,
        langsToLearn: { key1: "any" },
        langsToTeach: { key2: "any" }
    };
    expect(ProfileScreen_1.getValidationSchema().validateSync(fields)).toBe(fields);
    // @ts-ignore
    fields = Object.assign({}, fields, { langsToTeach: { key1: "any" } });
    expect(() => ProfileScreen_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError(lang_1.default("You couldn't teach and learn {lang}", { lang: "key1" }), fields, "langsToLearn"));
    fields = Object.assign({}, fields, { 
        // @ts-ignore
        langsToTeach: { key1: TeachLevel_1.TeachLevel.fluent }, langsToLearn: { key1: LearnLevel_1.LearnLevel.fluent } });
    expect(ProfileScreen_1.getValidationSchema().validateSync(fields)).toBe(fields);
});
it("ValidationSchema", () => {
    const fieldsSuccess = {
        pseudo: "123",
        profession: "123",
        city: "city",
        age: 21,
        avatar: "avatar",
        lat: 1,
        lon: 1,
        langsToLearn: { key1: "any" },
        langsToTeach: { key2: "any" }
    };
    expect(ProfileScreen_1.getValidationSchema().validateSync(fieldsSuccess)).toBe(fieldsSuccess);
    let fields = Object.assign({}, fieldsSuccess, { pseudo: "12" });
    expect(() => ProfileScreen_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("Pseudo has to be longer than 3 characters!", fields, "pseudo"));
    fields = Object.assign({}, fieldsSuccess, { profession: "12" });
    expect(() => ProfileScreen_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("Profession has to be longer than 3 characters!", fields, "profession"));
    fields = Object.assign({}, fieldsSuccess, { city: lang_1.default("Current location") });
    expect(() => ProfileScreen_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("Please select a city", fields, "city"));
});
it("FormUi", () => {
    const handleSubmit = jest.fn();
    const setFieldTouched = jest.fn();
    const handleChangeImpl = jest.fn(() => null);
    const tree = enzyme_1.shallow(React.createElement(ProfileScreen_1.FormUi, Object.assign({}, new NavigationAndFormikMock(), profileReducer_1.initialState, { loadProfile: loadProfile, updateProfile: updateProfile, values: Object.assign({}, profileReducer_1.defaultProfileData), errors: {}, touched: {}, handleChange: jest.fn(() => handleChangeImpl), setFieldTouched: setFieldTouched, handleSubmit: handleSubmit })));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const submitBtn = tree.findWhere(node => node.prop("testID") === "updateBtn");
    submitBtn.props().onPress();
    expect(handleSubmit.mock.calls.length).toBe(1);
    tree.setProps({ profileLoad: { fetching: true, error: false } });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({ profileLoad: { fetching: false, error: true } });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({ profileUpdate: { fetching: true, error: false } });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({ profileUpdate: { fetching: false, error: true } });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { pseudo: true },
        errors: { pseudo: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { profession: true },
        errors: { profession: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { city: true },
        errors: { city: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { langsToLearn: true },
        errors: { langsToLearn: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const inputs = tree.find("Styled(Input)");
    inputs.forEach((node) => {
        node.props().onBlur();
        node.props().onChangeText();
    });
    expect(setFieldTouched.mock.calls.length).toBe(2);
    expect(handleChangeImpl.mock.calls.length).toBe(2);
    testUtils_1.unMockMath();
});
it("Formik wrapper", () => {
    const addListener = jest.fn();
    const tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(ProfileScreen_1.default, Object.assign({}, { navigation: { addListener } }, profileReducer_1.initialState, { loadProfile: loadProfile, updateProfile: updateProfile })));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    addListener.mock.calls[0][1]();
    expect(loadProfile.mock.calls.length).toBe(1);
    const formikProps = tree.find("Formik").props();
    // @ts-ignore
    formikProps.onSubmit(undefined);
    expect(updateProfile).not.toBeCalled();
    // @ts-ignore
    formikProps.onSubmit(profileReducer_1.defaultProfileData);
    expect(updateProfile.mock.calls[0][0]).toBe(profileReducer_1.defaultProfileData);
});
