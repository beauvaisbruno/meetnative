import { ValidationError } from "yup";
import ResetPasswordScreenContainer, {
  ResetPasswordScreen,
  FormUi,
  getValidationSchema,
  IUser,
  mapStateToProps,
  mapDispatchToProps
} from "../ResetPasswordScreen";
import { shallow } from "enzyme";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import { FormikActions, InjectedFormikProps } from "formik";
import toJson from "enzyme-to-json";
import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import { LoginActions } from "../loginReducer";

it("ValidationSchema", () => {
  let fields = { email: "email@provider.com" };
  expect(getValidationSchema().validateSync(fields)).toBe(fields);
  fields = { email: "email@provider" };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError("E-mail is not valid!", fields, "email")
  );
});

it("FormUi", () => {
  const handleSubmit = jest.fn();
  const setFieldTouched = jest.fn(() => null);
  const handleChangeImpl = jest.fn(() => null);
  const tree = shallow(
    // @ts-ignore
    <FormUi
      fetching={false}
      error={false}
      values={{ email: "" }}
      errors={{}}
      touched={{}}
      handleChange={jest.fn(() => handleChangeImpl)}
      setFieldTouched={setFieldTouched}
      handleSubmit={handleSubmit}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const submitBtn = tree.findWhere(node => node.prop("testID") === "resetBtn");
  submitBtn.props().onPress();
  expect(handleSubmit.mock.calls.length).toBe(1);

  tree.setProps({ fetching: true });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({
    touched: { pseudo: true },
    errors: { pseudo: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();

  const inputs: any = tree.find("Styled(Input)");
  inputs.props().onBlur();
  inputs.props().onChangeText();
  expect(setFieldTouched.mock.calls.length).toBe(1);
  expect(handleChangeImpl.mock.calls.length).toBe(1);
});

it("Formik wrapper", () => {
  const resetEmail = jest.fn();
  const tree = shallow(
    //@ts-ignore
    <ResetPasswordScreen
      errors={{}}
      error={false}
      fetching={false}
      resetEmail={resetEmail}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  // @ts-ignore
  tree
    .find("Formik")
    .props()
    .onSubmit();
  expect(resetEmail).toBeCalled();
});

it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<ResetPasswordScreen />);
  expect(wrapper).toBeDefined();
  expect(
    mapStateToProps(({
      login: { loginResetEmail: { expected: "expected" } }
    } as unknown) as IApplicationState)
  ).toEqual({ expected: "expected" });

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest
    .spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.resetEmail(
    ("values" as unknown) as IUser,
    ("actions" as unknown) as FormikActions<IUser>
  );
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(
    LoginActions.loginResetEmail,
    "values",
    "actions"
  );
});
