"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileReducer_1 = require("../profileReducer");
// import { IAction } from "../../../utils/reducerHelper";
jest.mock("../../../utils/reducerHelper");
const reducerHelper = __importStar(require("../../../utils/reducerHelper"));
it("ProfileReducer", () => __awaiter(this, void 0, void 0, function* () {
    const reduceAction = jest.fn().mockReturnValue("newState");
    jest.spyOn(reducerHelper, "reduceAction").mockImplementation(reduceAction);
    const newState = profileReducer_1.reducer("initialeSate", "action");
    expect(newState).toEqual("newState");
    expect(reduceAction).lastCalledWith(profileReducer_1.ProfileActions, "action", "initialeSate");
}));
