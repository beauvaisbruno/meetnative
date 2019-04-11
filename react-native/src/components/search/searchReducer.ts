import { ActionResult, reduceAction } from "../../utils/reducerHelper";
import { IProfile } from "../../rootReducers";

export enum SearchActions {
  searchProfiles = "searchProfiles"
}

export interface ISearchState {
  searchProfiles: ActionResult<IProfile[]>;
}

export const initialState: ISearchState = {
  searchProfiles: new ActionResult<IProfile[]>([])
};

export function search(state = initialState, action: any) {
  state = reduceAction(SearchActions, action, state);

  return state;
}
