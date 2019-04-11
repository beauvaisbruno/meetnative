"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const race = jest.fn();
const call = jest.fn();
jest.mock("redux-saga/effects", () => ({ race, call }));
const delay = jest.fn();
jest.mock("redux-saga", () => ({ delay }));
const sagaHelper_1 = require("../sagaHelper");
it("callOrTimeout", () => {
    const fct = jest.fn();
    race.mockReturnValue("race");
    const res = sagaHelper_1.callOrTimeout(1000, fct, "arg1", "arg2");
    expect(res).toEqual("race");
    expect(race).toBeCalledWith({
        // @ts-ignore
        fctToCall: call(fct, "arg1", "arg2"),
        timeout: call(delay, 1000)
    });
});
