"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const reducerHelper_1 = require("../../utils/reducerHelper");
const immutability_helper_1 = __importDefault(require("immutability-helper"));
const storage_1 = __importDefault(require("redux-persist/es/storage"));
const redux_persist_1 = require("redux-persist");
const autoMergeLevel2_1 = __importDefault(
  require("redux-persist/es/stateReconciler/autoMergeLevel2")
);
var RoomActions;
(function(RoomActions) {
  RoomActions["loadAuthor"] = "loadAuthor";
  RoomActions["loadRecipient"] = "loadRecipient";
  RoomActions["syncMessages"] = "syncMessages";
  RoomActions["stopSyncMessages"] = "stopSyncMessages";
  RoomActions["sendMessages"] = "sendMessages";
  RoomActions["setMessageRead"] = "setMessageRead";
})((RoomActions = exports.RoomActions || (exports.RoomActions = {})));
exports.initialState = {
  loadRoom: new reducerHelper_1.ActionResult(),
  loadAuthor: new reducerHelper_1.ActionResult(null),
  loadRecipient: new reducerHelper_1.ActionResult(null),
  sendMessages: new reducerHelper_1.ActionResult()
};
const persistConfig = {
  key: "room",
  storage: storage_1.default,
  stateReconciler: autoMergeLevel2_1.default,
  whitelist: ["loadAuthor", "loadRecipient"]
};
exports.reducer = (state = exports.initialState, action) => {
  state = reducerHelper_1.reduceAction(RoomActions, action, state);
  if (action.type === RoomActions.sendMessages) {
    const message = action.payload;
    if (Array.isArray(state.loadAuthor.data))
      state = immutability_helper_1.default(state, {
        loadAuthor: { data: { $push: [message] } }
      });
  }
  return state;
};
exports.room = redux_persist_1.persistReducer(persistConfig, exports.reducer);
//# sourceMappingURL=roomReducer.js.map
