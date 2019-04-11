import { shallow } from "enzyme";
import * as React from "react";
import { IApplicationState, IProfile } from "../../../rootReducers";
import { ProfileActions } from "../profileReducer";
import ProfileContainer, {
  mapStateToProps,
  mapDispatchToProps
} from "../ProfileContainer";
jest.mock("../../../utils/reducerHelper");
import * as reducerHelper from "../../../utils/reducerHelper";
import { FormikActions } from "formik";

it("Container", () => {
  // @ts-ignore
  const wrapper = shallow(<ProfileContainer />);
  expect(wrapper).toBeDefined();
  expect(
    mapStateToProps(({
      profile: { expected: "expected" }
    } as unknown) as IApplicationState)
  ).toEqual({ expected: "expected" });

  const dispatchMock = jest.fn();
  const fetchingAction = jest.fn().mockReturnValue("fetchingAction");
  jest
    .spyOn(reducerHelper, "fetchingAction")
    .mockImplementation(fetchingAction);

  const map = mapDispatchToProps(dispatchMock);
  map.loadProfile();
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(ProfileActions.profileLoad);

  map.updateProfile(
    ("values" as unknown) as IProfile,
    ("actions" as unknown) as FormikActions<IProfile>
  );
  expect(dispatchMock).lastCalledWith("fetchingAction");
  expect(fetchingAction).lastCalledWith(
    ProfileActions.profileUpdate,
    "values",
    "actions"
  );
});
