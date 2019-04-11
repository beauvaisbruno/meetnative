import storage from "redux-persist/es/storage";
import { persistReducer, PersistPartial } from "redux-persist";
import { Reducer } from "redux";
// @ts-ignore
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  ActionResult,
  IAction,
  IActionResult,
  reduceAction
} from "../../utils/reducerHelper";
import { getRandomKey } from "../../utils/utils";
import { avatars } from "./img/Avatars";
import { LearnLevel } from "../../LearnLevel";
import { TeachLevel } from "../../TeachLevel";
import { IProfile } from "../../rootReducers";
import { FirebaseActions } from "../FirebaseActions";
import { PayloadMetaAction } from "typesafe-actions/dist/create-action";

export const defaultProfileData: IProfile = {
  id: "",
  pseudo: "",
  profession: "",
  city: "",
  age: 21,
  avatar: getRandomKey(avatars),
  langsToLearn: { english: LearnLevel.beginner },
  langsToTeach: { english: TeachLevel.native },
  isMale: true
};

export enum ProfileActions {
  profileUpdate = "profileUpdate",
  profileLoad = "profileLoad",
  profileLogout = "profileLogout"
}

export interface IProfileState {
  readonly profileUpdate: IActionResult<undefined>;
  readonly profileLoad: IActionResult<IProfile | null>;
  readonly profileLogout: IActionResult<undefined>;
}

export const initialState: IProfileState = {
  profileUpdate: new ActionResult<undefined>(),
  profileLoad: new ActionResult<IProfile | null>(null),
  profileLogout: new ActionResult<undefined>()
};

const persistConfig = {
  key: "profile",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["profileLoad"]
};

export const reducer = (state = initialState, action: IAction) => {
  state = reduceAction(ProfileActions, action, state);
  return state;
};

export const profile: Reducer<
  IProfileState & PersistPartial,
  IAction
> = persistReducer(persistConfig, reducer);
