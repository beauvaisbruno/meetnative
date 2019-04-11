"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reducerHelper_1 = require("../../utils/reducerHelper");
var PartnersActions;
(function(PartnersActions) {
  PartnersActions["syncLastMessages"] = "syncLastMessages";
  PartnersActions["stopSyncLastMessages"] = "stopSyncLastMessages";
})(
  (PartnersActions = exports.PartnersActions || (exports.PartnersActions = {}))
);
exports.initialState = {
  syncLastMessages: new reducerHelper_1.ActionResult(null)
};
function partner(state = exports.initialState, action) {
  state = reducerHelper_1.reduceAction(PartnersActions, action, state);
  return state;
}
exports.partner = partner;
//# sourceMappingURL=partnersReducer.js.map
