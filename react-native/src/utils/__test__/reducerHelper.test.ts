const action = jest.fn();
action.mockReturnValue("action");
jest.mock("typesafe-actions", () => {
  return {
    action
  };
});
import {
  ActionResult,
  errorAction,
  fetchingAction,
  getNextState,
  reduceAction,
  successAction
} from "../reducerHelper";

describe("reduceAction", () => {
  enum actions {
    type = "type"
  }
  it("fetching", () => {
    const fetching = { type: "type", payload: "payload", meta: "meta" };
    const prevState = {
      type: { fetching: false, error: false, data: "someData" }
    };
    const newState = reduceAction(actions, fetching, prevState);
    expect(newState).toEqual({
      type: { fetching: true, error: false, data: "someData" }
    });
  });
  it("fetching with no previous state", () => {
    const fetching = { type: "type", payload: "payload", meta: "meta" };
    const prevState = {};
    const newState = reduceAction(actions, fetching, prevState);
    expect(newState).toEqual({
      type: { fetching: true, error: false }
    });
  });
  it("success", () => {
    const success = { type: "typeSuccess", payload: "payload", meta: "meta" };
    const prevState = {
      type: { fetching: true, error: false, data: "someData" }
    };
    const newState = reduceAction(actions, success, prevState);
    expect(newState).toEqual({
      type: { fetching: false, error: false, data: "payload" }
    });
  });
  it("successWithoutPayload", () => {
    const success = { type: "typeSuccess", payload: undefined, meta: "meta" };
    const prevState = {
      type: { fetching: true, error: false, data: "someData" }
    };
    const newState = reduceAction(actions, success, prevState);
    expect(newState).toEqual({
      type: { fetching: false, error: false, data: "someData" }
    });
  });
  it("error", () => {
    const error = { type: "typeError", payload: "errorPayload", meta: "meta" };
    const prevState = {
      type: { fetching: true, error: false, errorData: "someErrorPayload" }
    };
    const newState = reduceAction(actions, error, prevState);
    expect(newState).toEqual({
      type: { fetching: false, error: true, errorData: "errorPayload" }
    });
  });
  it("errorWithoutPayload", () => {
    const success = { type: "typeError", payload: undefined, meta: "meta" };
    const prevState = {
      type: { fetching: true, error: false, errorData: "someData" }
    };
    const newState = reduceAction(actions, success, prevState);
    expect(newState).toEqual({
      type: { fetching: false, error: true, errorData: undefined }
    });
  });
  it("otherAction", () => {
    const other = { type: "otherType", payload: "payload", meta: "meta" };
    const prevState = {};
    const newState = reduceAction(actions, other, prevState);
    expect(newState).toBe(prevState);
  });
});

it("successAction", () => {
  const res = successAction("type", "value", "meta");
  expect(res).toEqual("action");
  expect(action).toBeCalledWith("typeSuccess", "value", "meta");
});

it("errorAction", () => {
  const res = errorAction("type", "value", "meta");
  expect(res).toEqual("action");
  expect(action).toBeCalledWith("typeError", "value", "meta");
});

it("fetchingAction", () => {
  const res = fetchingAction("type", "value", "meta");
  expect(res).toEqual("action");
  expect(action).toBeCalledWith("type", "value", "meta");
});

it("getNextState", () => {
  const fetching = { type: "type", payload: "payload", meta: "meta" };
  let res = getNextState(fetching);
  expect(res).toEqual({ fetching: true, error: false });

  const success = { type: "typeSuccess", payload: "payload", meta: "meta" };
  res = getNextState(success);
  expect(res).toEqual({ fetching: false, error: false, data: "payload" });

  const successNoPayload = {
    type: "typeSuccess",
    payload: undefined,
    meta: "meta"
  };
  res = getNextState(successNoPayload);
  expect(res).toEqual({ fetching: false, error: false });

  const error = {
    type: "typeError",
    payload: "payload",
    meta: "meta"
  };
  res = getNextState(error);
  expect(res).toEqual({ fetching: false, error: true, errorData: "payload" });

  const errorNoPayload = {
    type: "typeError",
    payload: undefined,
    meta: "meta"
  };
  res = getNextState(errorNoPayload);
  expect(res).toEqual({ fetching: false, error: true });
});
