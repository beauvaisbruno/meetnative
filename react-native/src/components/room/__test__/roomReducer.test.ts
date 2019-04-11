import { IRoomState, RoomActions, room } from "../roomReducer";
jest.mock("../../../utils/reducerHelper");
import * as reducerHelper from "../../../utils/reducerHelper";

it("RoomReducer", () => {
  const reduceAction = jest.fn().mockReturnValue("newState");
  jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);

  const newState = room(
    // @ts-ignore
    "initialeSate",
    "action"
  );

  expect(newState).toEqual("newState");
  expect(reduceAction).lastCalledWith(RoomActions, "action", "initialeSate");
});
