"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchReducer_1 = require("../searchReducer");
jest.mock("../../../utils/reducerHelper");
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
it("RoomReducer", () => {
    const reduceAction = jest.fn().mockReturnValue("newState");
    jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);
    const newState = searchReducer_1.search("initialeSate", "action");
    expect(newState).toEqual("newState");
    expect(reduceAction).lastCalledWith(searchReducer_1.SearchActions, "action", "initialeSate");
});
