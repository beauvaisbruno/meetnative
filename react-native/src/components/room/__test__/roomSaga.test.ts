import { call } from "redux-saga/effects";

const where = jest.fn(() => "query");
const collection = jest.fn(() => ({ where }));
const firestore = jest.fn(() => ({ collection }));

jest.mock("react-native-firebase", () => {
  return {
    auth: () => ({ currentUser: { uid: "uid" } }),
    firestore
  };
});
const setDocument = jest.fn();
const addDocument = jest.fn();
jest.mock("../../../config/firebase", () => {
  return {
    firesaga: {
      firestore: {
        syncCollection: jest.fn(),
        addDocument,
        setDocument
      }
    }
  };
});
const callOrTimeout = jest.fn();
// jest.mock("typesafe-actions", () => ({
//   action: actionName => actionName
// }));
jest.mock("../../../utils/sagaHelper", () => {
  return {
    callOrTimeout
  };
});
jest.mock("../../../config/redux", () => {
  return {
    store: { dispatch: jest.fn() }
  };
});
jest.mock("../../RootNavigation", () => {
  return {
    navigate: jest.fn()
  };
});
import {
  syncMessagesSaga,
  onLoadAuthorSagaSuccess,
  onLoadRecipientSagaSuccess,
  onLoadSagaError,
  sendMessageSaga,
  syncMessage
} from "../roomSaga";
import { testSaga } from "redux-saga-test-plan";
import {
  errorAction,
  fetchingAction,
  successAction
} from "../../../utils/reducerHelper";
import { RoomActions } from "../roomReducer";
import { firesaga } from "../../../config/firebase";
import { ILastMessage } from "../../partners/partnersTypes";

it("loadMessagesSaga", () => {
  testSaga(syncMessagesSaga)
    .next()
    .fork(syncMessage, "authorId", onLoadAuthorSagaSuccess)
    .next()
    .fork(syncMessage, "recipientId", onLoadRecipientSagaSuccess)
    .next()
    .put(successAction(RoomActions.syncMessages))
    .next()
    .isDone();
  expect(onLoadAuthorSagaSuccess(null)).toEqual(
    successAction(RoomActions.syncMessages)
  );
  expect(onLoadAuthorSagaSuccess([{ data: () => "data" }])).toEqual(
    successAction(RoomActions.loadAuthor, ["data"])
  );
  expect(onLoadRecipientSagaSuccess([{ data: () => "data" }])).toEqual(
    successAction(RoomActions.loadRecipient, ["data"])
  );
});
const message = {
  message: "message",
  time: 1,
  authorId: "authorId",
  recipientId: "recipientId"
};
it("sendMessageSaga", () => {
  callOrTimeout.mockReturnValue({ fctToCall: null });
  const lastMessage: ILastMessage = {
    id: message.authorId + "-" + message.recipientId,
    recipientId: message.recipientId,
    lastMsgReceived: message.message,
    lastMsgReceivedTime: message.time,
    authorId: message.authorId
  };
  testSaga(sendMessageSaga, fetchingAction(RoomActions.sendMessages, message))
    .next()
    .is({ fctToCall: null })
    .next()
    .call(
      firesaga.firestore.setDocument,
      "lastMessages/" + message.authorId + "-" + message.recipientId,
      lastMessage,
      { merge: true }
    )
    .next()
    .put(successAction(RoomActions.sendMessages))
    .next()
    .isDone();
  expect(callOrTimeout).toBeCalledWith(
    10000,
    firesaga.firestore.addDocument,
    "messages",
    message,
    undefined
  );
  callOrTimeout.mockReturnValue({ timeout: true });
  testSaga(sendMessageSaga, fetchingAction(RoomActions.sendMessages, message))
    .next()
    .is({ timeout: true })
    .next({ timeout: true })
    .put(errorAction(RoomActions.sendMessages, new Error("timeout")));
});
