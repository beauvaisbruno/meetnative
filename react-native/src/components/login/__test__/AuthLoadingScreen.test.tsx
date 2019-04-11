import { shallow } from "enzyme";

import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import { FormikActions } from "formik";
import { ILoginState, LoginActions } from "../loginReducer";
import * as React from "react";
import AuthLoadingScreenContainer, { AuthLoadingScreen,
  mapDispatchToProps, mapStateToProps } from "../AuthLoadingScreen";
import { LogoutButton } from "../../profile/LogoutButton";
import toJson from "enzyme-to-json";

it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<AuthLoadingScreenContainer/>);
  expect(wrapper).toBeDefined();
  expect(mapStateToProps({ loginLoadUser: { expected: "expected" } } as unknown as ILoginState))
    .toEqual({ expected: "expected" });

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest.spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.loadUser();
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(LoginActions.loginLoadUser);
});

it("Component" , () => {
  const loadUser = jest.fn();
  const tree = shallow(
    <AuthLoadingScreen
      loadUser={loadUser}
      {...new reducerHelper.ActionResult<undefined>()}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  expect(loadUser).toBeCalled();
});
