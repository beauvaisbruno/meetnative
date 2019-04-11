import { ISearchState, SearchActions, search } from "../searchReducer";
jest.mock("../../../utils/reducerHelper");
import * as reducerHelper from "../../../utils/reducerHelper";

it("RoomReducer", () => {
  const reduceAction = jest.fn().mockReturnValue("newState");
  jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);

  const newState = search(
    ("initialeSate" as unknown) as ISearchState,
    ("action" as unknown) as reducerHelper.IAction
  );

  expect(newState).toEqual("newState");
  expect(reduceAction).lastCalledWith(SearchActions, "action", "initialeSate");
});
