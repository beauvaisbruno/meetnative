import { call, race } from "redux-saga/effects";
import { delay } from "redux-saga";
import { IApplicationState, IProfile } from "../rootReducers";

export function callOrTimeout(
  timeoutMs = 10000,
  fctToCall: any,
  ...args: any[]
) {
  return race({
    // @ts-ignore
    fctToCall: call(fctToCall, ...args),
    timeout: call(delay, timeoutMs)
  });
}
export const getUserProfile = (state: IApplicationState): IProfile | null =>
  state.profile.profileLoad.data!;
