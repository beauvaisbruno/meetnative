"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const profileReducer_1 = require("./components/profile/profileReducer");
const loginReducer_1 = require("./components/login/loginReducer");
// @ts-ignore
const redux_saga_rn_alert_1 = require("redux-saga-rn-alert");
const searchReducer_1 = require("./components/search/searchReducer");
const roomReducer_1 = require("./components/room/roomReducer");
const appReducer = redux_1.combineReducers({
  profile: profileReducer_1.profile,
  login: loginReducer_1.login,
  search: searchReducer_1.search,
  room: roomReducer_1.room,
  alertReducer: redux_saga_rn_alert_1.alertReducer
});
exports.ClearAll = "ClearAll";
exports.rootReducers = (state, action) => {
  if (action.type === exports.ClearAll) {
    state = undefined;
  }
  return appReducer(state, action);
};
//# sourceMappingURL=rootReducers.js.map
