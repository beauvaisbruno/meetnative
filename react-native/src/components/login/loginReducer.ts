import {
  ActionResult,
  IActionResult,
  reduceAction
} from "../../utils/reducerHelper";

export enum LoginActions {
  loginGoogle = "loginGoogle",
  loginFacebook = "loginFacebook",
  loginWithEmail = "loginWithEmail",
  loginLoadUser = "loginLoadUser",
  loginResetEmail = "loginResetEmail"
}
export interface ILoginState {
  readonly loginGoogle: IActionResult<any>;
  readonly loginFacebook: IActionResult<any>;
  readonly loginWithEmail: IActionResult<any>;
  readonly loginLoadUser: IActionResult<any>;
  readonly loginResetEmail: IActionResult<undefined>;
}

const initialState: ILoginState = {
  loginGoogle: new ActionResult<any>(),
  loginFacebook: new ActionResult<any>(),
  loginWithEmail: new ActionResult<any>(),
  loginLoadUser: new ActionResult<any>(),
  loginResetEmail: new ActionResult<undefined>()
};

export function login(state = initialState, action: any) {
  state = reduceAction(LoginActions, action, state);
  return state;
}
