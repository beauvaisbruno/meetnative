import * as React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import LogoutButtonContainer, { LogoutButton, mapDispatchToProps, mapStateToProps } from "../LogoutButton";
import { IApplicationState } from "../../../rootReducers";
import * as reducerHelper from "../../../utils/reducerHelper";
import { ProfileActions } from "../profileReducer";
import { FormikActions } from "formik";

it("Component" , () => {
  const doLogout = jest.fn();
  const tree = shallow(
    <LogoutButton
      doLogout={doLogout}
      {...new reducerHelper.ActionResult<undefined>()}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const button = tree.findWhere(node => node.prop("testID") === "logoutButton");
  button.props().onPress();
  expect(doLogout.mock.calls.length).toBe(1);
});

it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<LogoutButtonContainer/>);
  expect(wrapper).toBeDefined();
  expect(mapStateToProps({ profile: { profileLogout: {expected:"expected"}} } as unknown as IApplicationState))
    .toEqual({expected:"expected"});

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest.spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.doLogout();
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(ProfileActions.profileLogout);
});
