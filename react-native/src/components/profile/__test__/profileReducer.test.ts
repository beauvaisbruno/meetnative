import { IProfileState, ProfileActions, reducer } from "../profileReducer";
// import { IAction } from "../../../utils/reducerHelper";
jest.mock("../../../utils/reducerHelper");
import * as reducerHelper from "../../../utils/reducerHelper";

it("ProfileReducer", async () => {
  const reduceAction = jest.fn().mockReturnValue("newState");
  jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);

  const newState = reducer(
    ("initialeSate" as unknown) as IProfileState,
    ("action" as unknown) as reducerHelper.IAction
  );

  expect(newState).toEqual("newState");
  expect(reduceAction).lastCalledWith(ProfileActions, "action", "initialeSate");
});
