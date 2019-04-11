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
const yup_1 = require("yup");
const ResetPasswordScreen_1 = require("../ResetPasswordScreen");
const enzyme_1 = require("enzyme");
const React = __importStar(require("react"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
const loginReducer_1 = require("../loginReducer");
it("ValidationSchema", () => {
    let fields = { email: "email@provider.com" };
    expect(ResetPasswordScreen_1.getValidationSchema().validateSync(fields)).toBe(fields);
    fields = { email: "email@provider" };
    expect(() => ResetPasswordScreen_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("E-mail is not valid!", fields, "email"));
});
it("FormUi", () => {
    const handleSubmit = jest.fn();
    const setFieldTouched = jest.fn(() => null);
    const handleChangeImpl = jest.fn(() => null);
    const tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(ResetPasswordScreen_1.FormUi, { fetching: false, error: false, values: { email: "" }, errors: {}, touched: {}, handleChange: jest.fn(() => handleChangeImpl), setFieldTouched: setFieldTouched, handleSubmit: handleSubmit }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const submitBtn = tree.findWhere(node => node.prop("testID") === "resetBtn");
    submitBtn.props().onPress();
    expect(handleSubmit.mock.calls.length).toBe(1);
    tree.setProps({ fetching: true });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { pseudo: true },
        errors: { pseudo: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const inputs = tree.find("Styled(Input)");
    inputs.props().onBlur();
    inputs.props().onChangeText();
    expect(setFieldTouched.mock.calls.length).toBe(1);
    expect(handleChangeImpl.mock.calls.length).toBe(1);
});
it("Formik wrapper", () => {
    const resetEmail = jest.fn();
    const tree = enzyme_1.shallow(
    //@ts-ignore
    React.createElement(ResetPasswordScreen_1.ResetPasswordScreen, { errors: {}, error: false, fetching: false, resetEmail: resetEmail }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    // @ts-ignore
    tree
        .find("Formik")
        .props()
        .onSubmit();
    expect(resetEmail).toBeCalled();
});
it("Container", () => {
    // @ts-ignore
    const wrapper = enzyme_1.shallow(React.createElement(ResetPasswordScreen_1.ResetPasswordScreen, null));
    expect(wrapper).toBeDefined();
    expect(ResetPasswordScreen_1.mapStateToProps({
        login: { loginResetEmail: { expected: "expected" } }
    })).toEqual({ expected: "expected" });
    const dispatchMock = jest.fn();
    const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
    jest
        .spyOn(reducerHelper, "fetchingAction")
        .mockImplementation(fetchingAction);
    const map = ResetPasswordScreen_1.mapDispatchToProps(dispatchMock);
    map.resetEmail("values", "actions");
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(loginReducer_1.LoginActions.loginResetEmail, "values", "actions");
});
