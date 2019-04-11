import { AnyAction, combineReducers } from "redux";
import { IProfileState, profile } from "./components/profile/profileReducer";
import { ILoginState, login } from "./components/login/loginReducer";
// @ts-ignore
import { alertReducer } from "redux-saga-rn-alert";
import { ISearchState, search } from "./components/search/searchReducer";
import { IRoomState, room } from "./components/room/roomReducer";

export interface IApplicationState {
  profile: IProfileState;
  login: ILoginState;
  search: ISearchState;
  room: IRoomState;
}

const appReducer = combineReducers<IApplicationState & any>({
  profile,
  login,
  search,
  room,
  alertReducer
});

export const ClearAll = "ClearAll";

export const rootReducers = (
  state: IApplicationState | undefined,
  action: AnyAction
) => {
  if (action.type === ClearAll) {
    state = undefined;
  }
  return appReducer(state, action);
};

export interface IProfile {
  langsToLearn: { [key: string]: string };
  langsToTeach: { [key: string]: string };
  age: number;
  pseudo: string;
  profession: string;
  city: string;
  avatar: string;
  isMale: boolean;
  lat?: number;
  lon?: number;
  geohash?: number;
  id?: string;
  fake?: boolean;
  fcmId?: string;
}
