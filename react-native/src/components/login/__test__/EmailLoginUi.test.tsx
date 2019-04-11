import { shallow } from "enzyme";

// import { mapDispatchToProps, mapStateToProps } from "../../profile/ProfileContainer";
import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import {
  defaultProfileData,
  initialState,
  ProfileActions
} from "../../profile/profileReducer";
import { Formik, FormikActions, InjectedFormikProps } from "formik";
import * as React from "react";
import EmailLoginUiContainer, {
  FormUi,
  EmailLoginUi,
  getValidationSchema,
  IUser,
  mapDispatchToProps,
  mapStateToProps
} from "../EmailLoginUi";
import { LoginActions } from "../loginReducer";
import toJson from "enzyme-to-json";
import { ValidationError } from "yup";

it("ValidationSchema", async () => {
  let fields = {
    email: "email@provider.com",
    password: "123456"
  };
  expect(getValidationSchema().validateSync(fields)).toBe(fields);
  fields = {
    email: "email@provider",
    password: "123456"
  };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError("E-mail is not valid!", fields, "email")
  );
  fields = {
    email: "email@provider.com",
    password: "12345"
  };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError(
      "Password has to be longer than 6 characters!",
      fields,
      "password"
    )
  );
});
it("Formik wrapper", () => {
  const loginWithEmail = jest.fn();
  const getParam = jest.fn().mockReturnValue("getParamValue");
  const tree = shallow(
    // @ts-ignore
    <EmailLoginUi
      loginWithEmail={loginWithEmail}
      // @ts-ignore
      navigation={{ getParam }}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  // @ts-ignore
  expect(tree.find("Formik").length).toBe(0);
  tree
    .findWhere(node => node.prop("testID") === "formVisibleBtn")
    .props()
    .onPress();
  tree.update();
  expect(toJson(tree)).toMatchSnapshot();
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
  const wrapper = shallow(<EmailLoginUiContainer />);
  expect(wrapper).toBeDefined();
  expect(
    mapStateToProps(({
      login: { loginWithEmail: { expected: "expected" } }
    } as unknown) as IApplicationState)
  ).toEqual({ expected: "expected" });

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest
    .spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.loginWithEmail(
    ("values" as unknown) as IUser,
    ("actions" as unknown) as FormikActions<IUser>
  );
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(
    LoginActions.loginWithEmail,
    "values",
    "actions"
  );
});
it("FormUi", () => {
  const navigate = jest.fn();
  const handleSubmit = jest.fn();
  const setFieldTouched = jest.fn();
  const handleChangeImpl = jest.fn(() => null);
  const tree = shallow(
    // @ts-ignore
    <FormUi
      values={{
        email: "",
        password: ""
      }}
      errors={{}}
      error={false}
      fetching={false}
      touched={{}}
      handleChange={jest.fn(() => handleChangeImpl)}
      setFieldTouched={setFieldTouched}
      handleSubmit={handleSubmit}
      // @ts-ignore
      navigation={{ navigate }}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const submitBtn = tree.findWhere(node => node.prop("testID") === "signinBtn");
  submitBtn.props().onPress();
  expect(handleSubmit.mock.calls.length).toBe(1);
  tree.setProps({ fetching: true });
  expect(toJson(tree)).toMatchSnapshot();

  tree.setProps({
    touched: { email: true },
    errors: { email: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({
    touched: { password: true },
    errors: { password: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();

  const inputs = tree.find("Styled(Input)");
  inputs.forEach((node: any) => {
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
