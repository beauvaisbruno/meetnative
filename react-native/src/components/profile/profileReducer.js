"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __importDefault(require("redux-persist/es/storage"));
const redux_persist_1 = require("redux-persist");
// @ts-ignore
const autoMergeLevel2_1 = __importDefault(
  require("redux-persist/lib/stateReconciler/autoMergeLevel2")
);
const reducerHelper_1 = require("../../utils/reducerHelper");
const utils_1 = require("../../utils/utils");
const Avatars_1 = require("./img/Avatars");
const LearnLevel_1 = require("../../LearnLevel");
const TeachLevel_1 = require("../../TeachLevel");
exports.defaultProfileData = {
  id: "",
  pseudo: "",
  profession: "",
  city: "",
  age: 21,
  avatar: utils_1.getRandomKey(Avatars_1.avatars),
  langsToLearn: { english: LearnLevel_1.LearnLevel.beginner },
  langsToTeach: { english: TeachLevel_1.TeachLevel.native },
  isMale: true
};
var ProfileActions;
(function(ProfileActions) {
  ProfileActions["profileUpdate"] = "profileUpdate";
  ProfileActions["profileLoad"] = "profileLoad";
  ProfileActions["profileLogout"] = "profileLogout";
})((ProfileActions = exports.ProfileActions || (exports.ProfileActions = {})));
exports.initialState = {
  profileUpdate: new reducerHelper_1.ActionResult(),
  profileLoad: new reducerHelper_1.ActionResult(null),
  profileLogout: new reducerHelper_1.ActionResult()
};
const persistConfig = {
  key: "profile",
  storage: storage_1.default,
  stateReconciler: autoMergeLevel2_1.default,
  whitelist: ["profileLoad"]
};
exports.reducer = (state = exports.initialState, action) => {
  state = reducerHelper_1.reduceAction(ProfileActions, action, state);
  return state;
};
exports.profile = redux_persist_1.persistReducer(
  persistConfig,
  exports.reducer
);
