import { ILoginState, LoginActions, login } from "../loginReducer";
jest.mock("../../../utils/reducerHelper");
import * as reducerHelper from "../../../utils/reducerHelper";

it("ProfileReducer", () => {
  const reduceAction = jest.fn().mockReturnValue("newState");
  jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);

  const newState = login(
    ("initialeSate" as unknown) as ILoginState,
    ("action" as unknown) as reducerHelper.IAction
  );

  expect(newState).toEqual("newState");
  expect(reduceAction).lastCalledWith(LoginActions, "action", "initialeSate");
});
