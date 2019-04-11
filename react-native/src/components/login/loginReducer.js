"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reducerHelper_1 = require("../../utils/reducerHelper");
var LoginActions;
(function(LoginActions) {
  LoginActions["loginGoogle"] = "loginGoogle";
  LoginActions["loginFacebook"] = "loginFacebook";
  LoginActions["loginWithEmail"] = "loginWithEmail";
  LoginActions["loginLoadUser"] = "loginLoadUser";
  LoginActions["loginResetEmail"] = "loginResetEmail";
})((LoginActions = exports.LoginActions || (exports.LoginActions = {})));
const initialState = {
  loginGoogle: new reducerHelper_1.ActionResult(),
  loginFacebook: new reducerHelper_1.ActionResult(),
  loginWithEmail: new reducerHelper_1.ActionResult(),
  loginLoadUser: new reducerHelper_1.ActionResult(),
  loginResetEmail: new reducerHelper_1.ActionResult()
};
function login(state = initialState, action) {
  state = reducerHelper_1.reduceAction(LoginActions, action, state);
  return state;
}
exports.login = login;
