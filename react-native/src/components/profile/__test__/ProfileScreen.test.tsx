import { mockMath, unMockMath } from "../../../../jest/testUtils";
mockMath();

import * as React from "react";
import ProfileScreen, { FormUi, getValidationSchema } from "../ProfileScreen";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { defaultProfileData, initialState } from "../profileReducer";
import { NavigationInjectedProps } from "react-navigation";
import { InjectedFormikProps } from "formik";
import { ValidationError } from "yup";
import { TeachLevel } from "../../../TeachLevel";
import { LearnLevel } from "../../../LearnLevel";
import lang from "../lang";
import { IProfile } from "../../../rootReducers";

const loadProfile = jest.fn();
const updateProfile = jest.fn();
const NavigationAndFormikMock = jest.fn<
  // @ts-ignore
  NavigationInjectedProps & InjectedFormikProps<IProfile, IProfile>
>();

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
  expect(getValidationSchema().validateSync(fields)).toBe(fields);
  // @ts-ignore
  fields = { ...fields, langsToTeach: { key1: "any" } };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError(
      lang("You couldn't teach and learn {lang}", { lang: "key1" }),
      fields,
      "langsToLearn"
    )
  );
  fields = {
    ...fields,
    // @ts-ignore
    langsToTeach: { key1: TeachLevel.fluent },
    langsToLearn: { key1: LearnLevel.fluent }
  };
  expect(getValidationSchema().validateSync(fields)).toBe(fields);
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
  expect(getValidationSchema().validateSync(fieldsSuccess)).toBe(fieldsSuccess);
  let fields = { ...fieldsSuccess, pseudo: "12" };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError(
      "Pseudo has to be longer than 3 characters!",
      fields,
      "pseudo"
    )
  );
  fields = { ...fieldsSuccess, profession: "12" };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError(
      "Profession has to be longer than 3 characters!",
      fields,
      "profession"
    )
  );
  fields = { ...fieldsSuccess, city: lang("Current location") };
  expect(() => getValidationSchema().validateSync(fields)).toThrowError(
    new ValidationError("Please select a city", fields, "city")
  );
});

it("FormUi", () => {
  const handleSubmit = jest.fn();
  const setFieldTouched = jest.fn();
  const handleChangeImpl = jest.fn(() => null);
  const tree = shallow(
    <FormUi
      {...new NavigationAndFormikMock()}
      {...initialState}
      loadProfile={loadProfile}
      updateProfile={updateProfile}
      values={{ ...defaultProfileData }}
      errors={{}}
      touched={{}}
      handleChange={jest.fn(() => handleChangeImpl)}
      setFieldTouched={setFieldTouched}
      handleSubmit={handleSubmit}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const submitBtn = tree.findWhere(node => node.prop("testID") === "updateBtn");
  submitBtn.props().onPress();
  expect(handleSubmit.mock.calls.length).toBe(1);
  tree.setProps({ profileLoad: { fetching: true, error: false } });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({ profileLoad: { fetching: false, error: true } });
  expect(toJson(tree)).toMatchSnapshot();

  tree.setProps({ profileUpdate: { fetching: true, error: false } });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({ profileUpdate: { fetching: false, error: true } });
  expect(toJson(tree)).toMatchSnapshot();

  tree.setProps({
    touched: { pseudo: true },
    errors: { pseudo: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({
    touched: { profession: true },
    errors: { profession: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({
    touched: { city: true },
    errors: { city: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({
    touched: { langsToLearn: true },
    errors: { langsToLearn: "error message" }
  });
  expect(toJson(tree)).toMatchSnapshot();

  const inputs = tree.find("Styled(Input)");
  inputs.forEach((node: any) => {
    node.props().onBlur();
    node.props().onChangeText();
  });
  expect(setFieldTouched.mock.calls.length).toBe(2);
  expect(handleChangeImpl.mock.calls.length).toBe(2);
  unMockMath();
});

it("Formik wrapper", () => {
  const addListener = jest.fn();
  const tree = shallow(
    // @ts-ignore
    <ProfileScreen
      {...{ navigation: { addListener } }}
      {...initialState}
      loadProfile={loadProfile}
      updateProfile={updateProfile}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  addListener.mock.calls[0][1]();
  expect(loadProfile.mock.calls.length).toBe(1);
  const formikProps = tree.find("Formik").props();
  // @ts-ignore
  formikProps.onSubmit!(undefined);
  expect(updateProfile).not.toBeCalled();
  // @ts-ignore
  formikProps.onSubmit!(defaultProfileData);
  expect(updateProfile.mock.calls[0][0]).toBe(defaultProfileData);
});
