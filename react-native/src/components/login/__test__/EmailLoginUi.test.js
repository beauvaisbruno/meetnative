"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const enzyme_1 = require("enzyme");
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
const React = __importStar(require("react"));
const EmailLoginUi_1 = __importStar(require("../EmailLoginUi"));
const loginReducer_1 = require("../loginReducer");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const yup_1 = require("yup");
it("ValidationSchema", () => __awaiter(this, void 0, void 0, function* () {
    let fields = {
        email: "email@provider.com",
        password: "123456"
    };
    expect(EmailLoginUi_1.getValidationSchema().validateSync(fields)).toBe(fields);
    fields = {
        email: "email@provider",
        password: "123456"
    };
    expect(() => EmailLoginUi_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("E-mail is not valid!", fields, "email"));
    fields = {
        email: "email@provider.com",
        password: "12345"
    };
    expect(() => EmailLoginUi_1.getValidationSchema().validateSync(fields)).toThrowError(new yup_1.ValidationError("Password has to be longer than 6 characters!", fields, "password"));
}));
it("Formik wrapper", () => {
    const loginWithEmail = jest.fn();
    const getParam = jest.fn().mockReturnValue("getParamValue");
    const tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(EmailLoginUi_1.EmailLoginUi, { loginWithEmail: loginWithEmail, 
        // @ts-ignore
        navigation: { getParam } }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    // @ts-ignore
    expect(tree.find("Formik").length).toBe(0);
    tree
        .findWhere(node => node.prop("testID") === "formVisibleBtn")
        .props()
        .onPress();
    tree.update();
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    expect(getParam).toBeCalledWith("resetEmail", "");
    expect(tree.find("Formik").length).toBe(1);
    // @ts-ignore
    tree
        .find("Formik")
        .props()
        .onSubmit();
    expect(loginWithEmail).toBeCalled();
});
it("Container", () => {
    // @ts-ignore
    const wrapper = enzyme_1.shallow(React.createElement(EmailLoginUi_1.default, null));
    expect(wrapper).toBeDefined();
    expect(EmailLoginUi_1.mapStateToProps({
        login: { loginWithEmail: { expected: "expected" } }
    })).toEqual({ expected: "expected" });
    const dispatchMock = jest.fn();
    const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
    jest
        .spyOn(reducerHelper, "fetchingAction")
        .mockImplementation(fetchingAction);
    const map = EmailLoginUi_1.mapDispatchToProps(dispatchMock);
    map.loginWithEmail("values", "actions");
    expect(dispatchMock).lastCalledWith("fetchingAction");
    expect(fetchingAction).lastCalledWith(loginReducer_1.LoginActions.loginWithEmail, "values", "actions");
});
it("FormUi", () => {
    const navigate = jest.fn();
    const handleSubmit = jest.fn();
    const setFieldTouched = jest.fn();
    const handleChangeImpl = jest.fn(() => null);
    const tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(EmailLoginUi_1.FormUi, { values: {
            email: "",
            password: ""
        }, errors: {}, error: false, fetching: false, touched: {}, handleChange: jest.fn(() => handleChangeImpl), setFieldTouched: setFieldTouched, handleSubmit: handleSubmit, 
        // @ts-ignore
        navigation: { navigate } }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const submitBtn = tree.findWhere(node => node.prop("testID") === "signinBtn");
    submitBtn.props().onPress();
    expect(handleSubmit.mock.calls.length).toBe(1);
    tree.setProps({ fetching: true });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { email: true },
        errors: { email: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree.setProps({
        touched: { password: true },
        errors: { password: "error message" }
    });
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const inputs = tree.find("Styled(Input)");
    inputs.forEach((node) => {
        node.props().onBlur();
        node.props().onChangeText();
    });
    expect(setFieldTouched.mock.calls.length).toBe(2);
    expect(handleChangeImpl.mock.calls.length).toBe(2);
    tree
        .findWhere(node => node.prop("testID") === "forgottenBtn")
        .props()
        .onPress();
    expect(navigate).toBeCalledWith("ResetPasswordScreen");
});
