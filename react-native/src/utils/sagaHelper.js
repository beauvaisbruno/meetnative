"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const redux_saga_1 = require("redux-saga");
function callOrTimeout(timeoutMs = 10000, fctToCall, ...args) {
  return effects_1.race({
    // @ts-ignore
    fctToCall: effects_1.call(fctToCall, ...args),
    timeout: effects_1.call(redux_saga_1.delay, timeoutMs)
  });
}
exports.callOrTimeout = callOrTimeout;
exports.getUserProfile = state => state.profile.profileLoad.data;
