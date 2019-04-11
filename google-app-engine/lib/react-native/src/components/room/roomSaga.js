"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const firebase_1 = require("../../config/firebase");
const reducerHelper_1 = require("../../utils/reducerHelper");
const sagaHelper_1 = require("../../utils/sagaHelper");
const roomReducer_1 = require("./roomReducer");
const react_native_firebase_1 = __importStar(require("react-native-firebase"));
const redux_1 = require("../../config/redux");
const RootNavigation_1 = require("../RootNavigation");
exports.roomSagas = [
  effects_1.takeEvery(roomReducer_1.RoomActions.sendMessages, sendMessageSaga),
  effects_1.takeEvery(roomReducer_1.RoomActions.syncMessages, syncMessagesSaga),
  effects_1.takeEvery(roomReducer_1.RoomActions.setMessageRead, setMessageRead),
  effects_1.takeEvery(
    roomReducer_1.RoomActions.stopSyncMessages,
    stopSyncMessagesSaga
  )
];
function* setMessageRead() {
  try {
    if (RootNavigation_1.getCurrentScreen() !== "RoomScreen") return;
    const user = yield effects_1.select(sagaHelper_1.getUserProfile);
    const contact = RootNavigation_1.getCurrentScreenParam().contactProfile;
    const recipientId = user.id;
    const authorId = contact.id;
    const lastMessage = {
      id: authorId + "-" + recipientId,
      recipientId,
      lastReadTime: Date.now(),
      authorId
    };
    yield effects_1.call(
      firebase_1.firesaga.firestore.setDocument,
      "lastMessages/" + lastMessage.id,
      lastMessage,
      { merge: true }
    );
    yield effects_1.put(
      reducerHelper_1.successAction(roomReducer_1.RoomActions.setMessageRead)
    );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        roomReducer_1.RoomActions.setMessageRead,
        error
      )
    );
  }
}
exports.setMessageRead = setMessageRead;
function* syncMessagesSaga() {
  try {
    yield effects_1.fork(syncMessage, "authorId", onLoadAuthorSagaSuccess);
    yield effects_1.fork(
      syncMessage,
      "recipientId",
      onLoadRecipientSagaSuccess
    );
    yield effects_1.put(
      reducerHelper_1.successAction(roomReducer_1.RoomActions.syncMessages)
    );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(roomReducer_1.RoomActions.syncMessages, error)
    );
  }
}
exports.syncMessagesSaga = syncMessagesSaga;
function* stopSyncMessagesSaga() {
  channels = yield channels;
  for (const channel of channels) {
    yield channel.close();
  }
  channels = [];
}
let channels = [];
function* syncMessage(whereClause, successActionCreator) {
  // @ts-ignore
  const channel = firebase_1.firesaga.firestore.channel(
    react_native_firebase_1
      .firestore()
      .collection("messages")
      .where(
        whereClause,
        "=",
        react_native_firebase_1.default.auth().currentUser.uid
      )
  );
  channels.push(channel);
  try {
    while (true) {
      const messages = yield effects_1.take(channel);
      yield effects_1.put(successActionCreator(messages));
    }
  } catch (error) {
    console.log("onLoadSagaError error:", error);
    yield effects_1.put(onLoadSagaError(error));
  }
}
function onLoadAuthorSagaSuccess(messagesRes) {
  return onLoadSagaSuccess(roomReducer_1.RoomActions.loadAuthor, messagesRes);
}
exports.onLoadAuthorSagaSuccess = onLoadAuthorSagaSuccess;
function onLoadRecipientSagaSuccess(messagesRes) {
  redux_1.store.dispatch(
    reducerHelper_1.fetchingAction(roomReducer_1.RoomActions.setMessageRead)
  );
  return onLoadSagaSuccess(
    roomReducer_1.RoomActions.loadRecipient,
    messagesRes
  );
}
exports.onLoadRecipientSagaSuccess = onLoadRecipientSagaSuccess;
function onLoadSagaSuccess(action, messagesRes) {
  if (!messagesRes)
    return reducerHelper_1.successAction(
      roomReducer_1.RoomActions.syncMessages
    );
  const messages = [];
  messagesRes.forEach(messageRes => {
    messages.push(messageRes.data());
  });
  return reducerHelper_1.successAction(action, messages);
}
exports.onLoadSagaSuccess = onLoadSagaSuccess;
function onLoadSagaError(error) {
  return reducerHelper_1.errorAction(
    roomReducer_1.RoomActions.syncMessages,
    error
  );
}
exports.onLoadSagaError = onLoadSagaError;
function* sendMessageSaga(action) {
  try {
    const message = action.payload;
    const callOrTimeoutRes = yield sagaHelper_1.callOrTimeout(
      10000,
      firebase_1.firesaga.firestore.addDocument,
      "messages",
      message,
      undefined
    );
    if (callOrTimeoutRes && callOrTimeoutRes.timeout)
      throw new Error("timeout");
    const lastMessage = {
      id: message.authorId + "-" + message.recipientId,
      recipientId: message.recipientId,
      lastMsgReceived: message.message,
      lastMsgReceivedTime: message.time,
      authorId: message.authorId
    };
    yield effects_1.call(
      firebase_1.firesaga.firestore.setDocument,
      "lastMessages/" + message.authorId + "-" + message.recipientId,
      lastMessage,
      { merge: true }
    );
    yield effects_1.put(
      reducerHelper_1.successAction(roomReducer_1.RoomActions.sendMessages)
    );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(roomReducer_1.RoomActions.sendMessages, error)
    );
  }
}
exports.sendMessageSaga = sendMessageSaga;
//# sourceMappingURL=roomSaga.js.map
