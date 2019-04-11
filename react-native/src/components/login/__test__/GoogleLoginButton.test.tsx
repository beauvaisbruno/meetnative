import { shallow } from "enzyme";
import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import { LoginActions } from "../loginReducer";
import * as React from "react";
import GoogleLoginButtonContainer,
{ GoogleLoginButton, mapDispatchToProps, mapStateToProps } from "../GoogleLoginButton";
import toJson from "enzyme-to-json";

it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<GoogleLoginButtonContainer/>);
  expect(wrapper).toBeDefined();
  expect(mapStateToProps({login :{ loginGoogle: {expected:"expected"}} } as unknown as IApplicationState))
    .toEqual({expected:"expected"});

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest.spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.googleLogin();
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(LoginActions.loginGoogle);
});
it("Component" , () => {
  const googleLogin = jest.fn();
  const tree = shallow(
  // @ts-ignore
    <GoogleLoginButton
      googleLogin={googleLogin}
      error={false}
      fetching={false}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const button = tree.findWhere(node => node.prop("testID") === "googleLoginBtn");
  button.props().onPress();
  expect(googleLogin).toBeCalled();
  tree.setProps({ error: true, fetching: false });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({ fetching: false, error: true });
  expect(toJson(tree)).toMatchSnapshot();
});
