"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quotes */
const testUtils_1 = require("../../../jest/testUtils");
const hasPermission = jest.fn();
const requestPermission = jest.fn();
const onTokenRefresh = jest.fn();
const getToken = jest.fn();
const onNotification = jest.fn();
const createChannel = jest.fn();
const getInitialNotification = jest.fn();
const onNotificationOpened = jest.fn();
const setDescription = jest.fn();
const displayNotification = jest.fn();
const removeDeliveredNotification = jest.fn();
const removeAllDeliveredNotifications = jest.fn();
const Channel = jest.fn(() => ({
    setDescription
}));
jest.mock("react-native-firebase", () => {
    const exports = {
        messaging: () => ({
            hasPermission,
            requestPermission,
            onTokenRefresh,
            getToken
        }),
        notifications: () => ({
            onNotification,
            getInitialNotification,
            onNotificationOpened,
            android: { createChannel },
            displayNotification,
            removeDeliveredNotification,
            removeAllDeliveredNotifications
        })
    };
    // @ts-ignore
    exports.notifications.Android = {
        Channel,
        Importance: { Max: "Max" }
    };
    return exports;
});
const dispatch = jest.fn();
jest.mock("../../config/redux", () => ({ store: { dispatch } }));
jest.mock("../lang", () => (text) => text);
const getCurrentScreen = jest.fn();
const getCurrentScreenParam = jest.fn();
const navigate = jest.fn();
jest.mock("../RootNavigation", () => ({
    getCurrentScreen,
    getCurrentScreenParam,
    navigate
}));
const updateDocument = jest.fn();
jest.mock("../../config/firebase", () => ({
    firesaga: { firestore: { updateDocument } }
}));
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const firebaseSagas_1 = require("../firebaseSagas");
const reducerHelper_1 = require("../../utils/reducerHelper");
const FirebaseActions_1 = require("../FirebaseActions");
const typesafe_actions_1 = require("typesafe-actions");
const sagaHelper_1 = require("../../utils/sagaHelper");
const firebase_1 = require("../../config/firebase");
it("initMessagingSaga", () => __awaiter(this, void 0, void 0, function* () {
    hasPermission.mockReturnValue(false);
    dispatch.mockReturnValue("dispatch");
    const getTokenThen = jest.fn();
    getToken.mockReturnValue({ then: getTokenThen });
    setDescription.mockReturnValue({ then: getTokenThen });
    getInitialNotification.mockReturnValue("notificationOpen");
    getTokenThen.mockReturnValue({ catch: jest.fn() });
    yield firebaseSagas_1.initMessaging();
    expect(requestPermission).toHaveBeenCalled();
    expect(onNotification).toHaveBeenCalled();
    expect(createChannel).toHaveBeenCalledWith({ then: getTokenThen });
    expect(getInitialNotification).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.OnNotificationOpen, "notificationOpen"));
    expect(onNotificationOpened).toHaveBeenCalled();
    getTokenThen.mock.calls[0][0]("fcmToken");
    expect(dispatch.mock.calls[1][0]).toEqual(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onTokenRefresh, "fcmToken"));
    onTokenRefresh.mock.calls[0][0]("fcmToken");
    expect(dispatch.mock.calls[2][0]).toEqual(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onTokenRefresh, "fcmToken"));
    onNotification.mock.calls[0][0]("notification");
    expect(dispatch.mock.calls[3][0]).toEqual(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onNotificationReceived, "notification"));
    onNotificationOpened.mock.calls[0][0]("notificationOpen");
    expect(dispatch.mock.calls[4][0]).toEqual(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.OnNotificationOpen, "notificationOpen"));
}));
it("onTokenRefreshSaga", () => {
    redux_saga_test_plan_1.testSaga(firebaseSagas_1.onTokenRefreshSaga, typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onTokenRefresh, "fcmToken"))
        .next()
        .call(firebaseSagas_1.setFcmToken, "fcmToken")
        .next()
        .put(reducerHelper_1.fetchingAction(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate))
        .next()
        .isDone();
});
describe("onNotificationReceivedSaga", () => {
    it("room displayed", () => {
        redux_saga_test_plan_1.testSaga(firebaseSagas_1.onNotificationReceivedSaga, typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onNotificationReceived, {
            data: { author: '{"id":"id"}' },
            title: "title",
            body: "body"
        }))
            .next()
            .call(getCurrentScreen)
            .next("RoomScreen")
            .call(getCurrentScreenParam)
            .next({ contactProfile: { id: "id" } })
            .isDone();
    });
    it("local notification", () => {
        testUtils_1.mockDate();
        redux_saga_test_plan_1.testSaga(firebaseSagas_1.onNotificationReceivedSaga, typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onNotificationReceived, {
            data: { author: '{"id":"id"}' },
            title: "title",
            body: "body"
        }))
            .next()
            .call(getCurrentScreen)
            .next("RoomScreen")
            .call(getCurrentScreenParam)
            .next({ contactProfile: { id: "otherId" } })
            .call(firebaseSagas_1.createNotification, Date.now() + "", "title", "body", { author: '{"id":"id"}' }, firebaseSagas_1.newMessageChannelId)
            .next("notificationToSend")
            .next()
            .isDone();
        expect(displayNotification).toBeCalledWith("notificationToSend");
        testUtils_1.unMockDate();
    });
});
it("OnNotificationOpenSaga", () => {
    redux_saga_test_plan_1.testSaga(firebaseSagas_1.OnNotificationOpenSaga, typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onNotificationReceived, {
        notification: { data: { author: "{}" }, notificationId: "notificationId" }
    }))
        .next()
        .call(navigate, {
        routeName: "RoomScreen",
        params: { contactProfile: {} }
    })
        .next()
        .isDone();
    expect(removeDeliveredNotification).toBeCalledWith("notificationId");
});
it("removeAllNotificationSaga", () => {
    firebaseSagas_1.removeAllNotificationSaga();
    expect(removeAllDeliveredNotifications).toBeCalled();
});
it("checkFcmIdAndUpdateSaga", () => {
    redux_saga_test_plan_1.testSaga(firebaseSagas_1.checkFcmIdAndUpdateSaga)
        .next()
        .select(sagaHelper_1.getUserProfile)
        .next({ fcmId: "fcmId", id: "id" })
        .next("newFcmId")
        .call(firebase_1.firesaga.firestore.updateDocument, "profiles/id", {
        fcmId: "newFcmId"
    })
        .next()
        .put(reducerHelper_1.successAction(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate, {
        fcmId: "newFcmId"
    }))
        .next()
        .isDone();
});
