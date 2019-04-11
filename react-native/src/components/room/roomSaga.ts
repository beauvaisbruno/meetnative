import { call, fork, put, select, take, takeEvery } from "redux-saga/effects";

import { firesaga } from "../../config/firebase";
import {
  errorAction,
  fetchingAction,
  IAction,
  successAction
} from "../../utils/reducerHelper";
import { callOrTimeout, getUserProfile } from "../../utils/sagaHelper";
import { IMessage, RoomActions } from "./roomReducer";
import firebase, { firestore } from "react-native-firebase";
import { AnyAction } from "redux";
import { Channel } from "redux-saga";
import { ILastMessage } from "../partners/partnersTypes";
import { store } from "../../config/redux";
import { getCurrentScreenParam, getCurrentScreen } from "../RootNavigation";
import { IProfile } from "../../rootReducers";

export const roomSagas = [
  takeEvery(RoomActions.sendMessages, sendMessageSaga),
  takeEvery(RoomActions.syncMessages, syncMessagesSaga),
  takeEvery(RoomActions.setMessageRead, setMessageRead),
  takeEvery(RoomActions.stopSyncMessages, stopSyncMessagesSaga)
];

export function* setMessageRead() {
  try {
    if (getCurrentScreen() !== "RoomScreen") return;
    const user = yield select(getUserProfile);
    const contact = getCurrentScreenParam()!.contactProfile as IProfile;
    const recipientId = user.id;
    const authorId = contact.id!;
    const lastMessage: ILastMessage = {
      id: authorId + "-" + recipientId,
      recipientId,
      lastReadTime: Date.now(),
      authorId
    };
    yield call(
      firesaga.firestore.setDocument,
      "lastMessages/" + lastMessage.id,
      lastMessage,
      { merge: true }
    );
    yield put(successAction(RoomActions.setMessageRead));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(RoomActions.setMessageRead, error));
  }
}

export function* syncMessagesSaga() {
  try {
    yield fork(syncMessage, "authorId", onLoadAuthorSagaSuccess);
    yield fork(syncMessage, "recipientId", onLoadRecipientSagaSuccess);
    yield put(successAction(RoomActions.syncMessages));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(RoomActions.syncMessages, error));
  }
}

function* stopSyncMessagesSaga() {
  channels = yield channels;
  for (const channel of channels) {
    yield channel.close();
  }
  channels = [];
}

let channels: Channel<any>[] = [];
export function* syncMessage(
  whereClause: string,
  successActionCreator: (res: any) => IAction
) {
  // @ts-ignore
  const channel: Channel<any> = firesaga.firestore.channel(
    firestore()
      .collection("messages")
      .where(whereClause, "=", firebase.auth().currentUser!.uid)
  );
  channels.push(channel);
  try {
    while (true) {
      const messages = yield take(channel);
      yield put(successActionCreator(messages));
    }
  } catch (error) {
    console.log("onLoadSagaError error:", error);
    yield put(onLoadSagaError(error));
  }
}

export function onLoadAuthorSagaSuccess(messagesRes: any) {
  return onLoadSagaSuccess(RoomActions.loadAuthor, messagesRes);
}
export function onLoadRecipientSagaSuccess(messagesRes: any) {
  store.dispatch(fetchingAction(RoomActions.setMessageRead));
  return onLoadSagaSuccess(RoomActions.loadRecipient, messagesRes);
}
export function onLoadSagaSuccess(action: string, messagesRes: any) {
  if (!messagesRes) return successAction(RoomActions.syncMessages);
  const messages: IMessage[] = [];
  messagesRes.forEach((messageRes: any) => {
    messages.push(messageRes.data());
  });
  return successAction(action, messages);
}

export function onLoadSagaError(error: Error): AnyAction {
  return errorAction(RoomActions.syncMessages, error);
}

export function* sendMessageSaga(action: IAction) {
  try {
    const message = action.payload as IMessage;
    const callOrTimeoutRes = yield callOrTimeout(
      10000,
      firesaga.firestore.addDocument,
      "messages",
      message,
      undefined
    );
    if (callOrTimeoutRes && callOrTimeoutRes.timeout)
      throw new Error("timeout");
    const lastMessage: ILastMessage = {
      id: message.authorId + "-" + message.recipientId,
      recipientId: message.recipientId,
      lastMsgReceived: message.message,
      lastMsgReceivedTime: message.time,
      authorId: message.authorId
    };
    yield call(
      firesaga.firestore.setDocument,
      "lastMessages/" + message.authorId + "-" + message.recipientId,
      lastMessage,
      { merge: true }
    );
    yield put(successAction(RoomActions.sendMessages));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(RoomActions.sendMessages, error));
  }
}
