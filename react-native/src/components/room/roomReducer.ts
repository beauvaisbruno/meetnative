import { ActionResult, IAction, reduceAction } from "../../utils/reducerHelper";
import update from "immutability-helper";
import storage from "redux-persist/es/storage";
import { Reducer } from "redux";
import { persistReducer, PersistPartial } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
export enum RoomActions {
  loadAuthor = "loadAuthor",
  loadRecipient = "loadRecipient",
  syncMessages = "syncMessages",
  stopSyncMessages = "stopSyncMessages",
  sendMessages = "sendMessages",
  setMessageRead = "setMessageRead"
}

export interface IRoomState {
  loadRoom: ActionResult<undefined>;
  loadAuthor: ActionResult<IMessage[] | null>;
  loadRecipient: ActionResult<IMessage[] | null>;
  sendMessages: ActionResult<undefined>;
}

export interface IMessage {
  message: string;
  time: number;
  authorId: string;
  recipientId: string;
}

export const initialState: IRoomState = {
  loadRoom: new ActionResult<undefined>(),
  loadAuthor: new ActionResult<IMessage[] | null>(null),
  loadRecipient: new ActionResult<IMessage[] | null>(null),
  sendMessages: new ActionResult<undefined>()
};

const persistConfig = {
  key: "room",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["loadAuthor", "loadRecipient"]
};

export const reducer = (state = initialState, action: IAction) => {
  state = reduceAction(RoomActions, action, state);
  if (action.type === RoomActions.sendMessages) {
    const message = action.payload;
    if (Array.isArray(state.loadAuthor.data))
      state = update(state, { loadAuthor: { data: { $push: [message] } } });
  }
  return state;
};

export const room: Reducer<
  IRoomState & PersistPartial,
  IAction
> = persistReducer(persistConfig, reducer);
