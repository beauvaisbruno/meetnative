import { action as actionCreator } from "typesafe-actions";
import { PayloadMetaAction } from "typesafe-actions/dist/type-helpers";

export type IAction = PayloadMetaAction<string, any, any>;
export type IActionData<T> = PayloadMetaAction<string, T, any>;

export interface IActionResult<T> {
  fetching: boolean;
  error: boolean;
  data?: T;
  errorData?: any;
}

export class ActionResult<T> implements IActionResult<T> {
  error: boolean;
  fetching: boolean;
  data?: T;
  constructor(defaultData?: T) {
    this.fetching = false;
    this.error = false;
    if (defaultData !== undefined) this.data = defaultData;
  }
}

export const successAction = (type: string, values?: any, meta?: any): any => {
  const act: any = actionCreator(type + "Success", values, meta);
  return act;
};
export const errorAction = (type: string, values?: any, meta?: any): any => {
  const act: any = actionCreator(type + "Error", values, meta);
  return act;
};

export function getNextState(action: IAction): IActionResult<any> {
  let state: IActionResult<any> = { fetching: true, error: false };
  if (action.type.includes("Success")) {
    state = { fetching: false, error: false };
    if (action.payload !== undefined)
      state = { ...state, data: action.payload };
  }
  if (action.type.includes("Error"))
    state = {
      fetching: false,
      error: true,
      errorData: action.payload ? action.payload : undefined
    };
  return state;
}
export function reduceAction<T extends { [key: string]: any }>(
  actions: any,
  action: IAction,
  state: T
): T {
  const fieldName = action.type.replace("Error", "").replace("Success", "");
  if (!actions[fieldName]) return state;
  const prevState: IActionResult<any> = state[fieldName]
    ? { ...state[fieldName] }
    : { fetching: false, error: false };
  const parentState = { ...state };

  parentState[fieldName] = { ...prevState, ...getNextState(action) };
  return parentState;
}

export const fetchingAction = (type: string, values?: any, meta?: any): any => {
  return actionCreator(type, values, meta);
};
