"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reducerHelper_1 = require("../../utils/reducerHelper");
var SearchActions;
(function(SearchActions) {
  SearchActions["searchProfiles"] = "searchProfiles";
})((SearchActions = exports.SearchActions || (exports.SearchActions = {})));
exports.initialState = {
  searchProfiles: new reducerHelper_1.ActionResult([])
};
function search(state = exports.initialState, action) {
  state = reducerHelper_1.reduceAction(SearchActions, action, state);
  return state;
}
exports.search = search;
