import { shallow } from "enzyme";
import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import { LoginActions } from "../loginReducer";
import * as React from "react";
import FbLoginButtonContainer, { FbLoginButton, mapDispatchToProps, mapStateToProps } from "../FbLoginButton";
import toJson from "enzyme-to-json";


it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<FbLoginButtonContainer/>);
  expect(wrapper).toBeDefined();
  expect(mapStateToProps({login :{ loginFacebook: {expected:"expected"}} } as unknown as IApplicationState))
    .toEqual({expected:"expected"});

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest.spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.facebookLogin();
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(LoginActions.loginFacebook);
});
it("Component" , () => {
  const facebookLogin = jest.fn();
  const tree = shallow(
  // @ts-ignore
    <FbLoginButton
      facebookLogin={facebookLogin}
      error={false}
      fetching={false}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const button = tree.findWhere(node => node.prop("testID") === "facebookLoginButton");
  button.props().onPress();
  expect(facebookLogin).toBeCalled();
  tree.setProps({ error: true, fetching: false });
  expect(toJson(tree)).toMatchSnapshot();
  tree.setProps({ fetching: false, error: true });
  expect(toJson(tree)).toMatchSnapshot();
});
