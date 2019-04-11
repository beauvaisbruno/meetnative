"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
class ActionResult {
  constructor(defaultData) {
    this.fetching = false;
    this.error = false;
    if (defaultData !== undefined) this.data = defaultData;
  }
}
exports.ActionResult = ActionResult;
exports.successAction = (type, values, meta) => {
  const act = typesafe_actions_1.action(type + "Success", values, meta);
  return act;
};
exports.errorAction = (type, values, meta) => {
  const act = typesafe_actions_1.action(type + "Error", values, meta);
  return act;
};
function getNextState(action) {
  let state = { fetching: true, error: false };
  if (action.type.includes("Success")) {
    state = { fetching: false, error: false };
    if (action.payload !== undefined)
      state = Object.assign({}, state, { data: action.payload });
  }
  if (action.type.includes("Error"))
    state = {
      fetching: false,
      error: true,
      errorData: action.payload ? action.payload : undefined
    };
  return state;
}
exports.getNextState = getNextState;
function reduceAction(actions, action, state) {
  const fieldName = action.type.replace("Error", "").replace("Success", "");
  if (!actions[fieldName]) return state;
  const prevState = state[fieldName]
    ? Object.assign({}, state[fieldName])
    : { fetching: false, error: false };
  const parentState = Object.assign({}, state);
  parentState[fieldName] = Object.assign({}, prevState, getNextState(action));
  return parentState;
}
exports.reduceAction = reduceAction;
exports.fetchingAction = (type, values, meta) => {
  return typesafe_actions_1.action(type, values, meta);
};
