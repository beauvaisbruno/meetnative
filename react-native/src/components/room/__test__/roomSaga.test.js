"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const roomSaga_1 = require("../roomSaga");
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const reducerHelper_1 = require("../../../utils/reducerHelper");
const roomReducer_1 = require("../roomReducer");
const firebase_1 = require("../../../config/firebase");
it("loadMessagesSaga", () => {
    redux_saga_test_plan_1.testSaga(roomSaga_1.syncMessagesSaga)
        .next()
        .fork(roomSaga_1.syncMessage, "authorId", roomSaga_1.onLoadAuthorSagaSuccess)
        .next()
        .fork(roomSaga_1.syncMessage, "recipientId", roomSaga_1.onLoadRecipientSagaSuccess)
        .next()
        .put(reducerHelper_1.successAction(roomReducer_1.RoomActions.syncMessages))
        .next()
        .isDone();
    expect(roomSaga_1.onLoadAuthorSagaSuccess(null)).toEqual(reducerHelper_1.successAction(roomReducer_1.RoomActions.syncMessages));
    expect(roomSaga_1.onLoadAuthorSagaSuccess([{ data: () => "data" }])).toEqual(reducerHelper_1.successAction(roomReducer_1.RoomActions.loadAuthor, ["data"]));
    expect(roomSaga_1.onLoadRecipientSagaSuccess([{ data: () => "data" }])).toEqual(reducerHelper_1.successAction(roomReducer_1.RoomActions.loadRecipient, ["data"]));
});
const message = {
    message: "message",
    time: 1,
    authorId: "authorId",
    recipientId: "recipientId"
};
it("sendMessageSaga", () => {
    callOrTimeout.mockReturnValue({ fctToCall: null });
    const lastMessage = {
        id: message.authorId + "-" + message.recipientId,
        recipientId: message.recipientId,
        lastMsgReceived: message.message,
        lastMsgReceivedTime: message.time,
        authorId: message.authorId
    };
    redux_saga_test_plan_1.testSaga(roomSaga_1.sendMessageSaga, reducerHelper_1.fetchingAction(roomReducer_1.RoomActions.sendMessages, message))
        .next()
        .is({ fctToCall: null })
        .next()
        .call(firebase_1.firesaga.firestore.setDocument, "lastMessages/" + message.authorId + "-" + message.recipientId, lastMessage, { merge: true })
        .next()
        .put(reducerHelper_1.successAction(roomReducer_1.RoomActions.sendMessages))
        .next()
        .isDone();
    expect(callOrTimeout).toBeCalledWith(10000, firebase_1.firesaga.firestore.addDocument, "messages", message, undefined);
    callOrTimeout.mockReturnValue({ timeout: true });
    redux_saga_test_plan_1.testSaga(roomSaga_1.sendMessageSaga, reducerHelper_1.fetchingAction(roomReducer_1.RoomActions.sendMessages, message))
        .next()
        .is({ timeout: true })
        .next({ timeout: true })
        .put(reducerHelper_1.errorAction(roomReducer_1.RoomActions.sendMessages, new Error("timeout")));
});
