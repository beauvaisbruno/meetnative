"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_firebase_1 = __importDefault(require("react-native-firebase"));
const redux_1 = require("../config/redux");
const reducerHelper_1 = require("../utils/reducerHelper");
const RootNavigation_1 = require("./RootNavigation");
const effects_1 = require("redux-saga/effects");
const sagaHelper_1 = require("../utils/sagaHelper");
const lang_1 = __importDefault(require("./lang"));
const firebase_1 = require("../config/firebase");
const typesafe_actions_1 = require("typesafe-actions");
const FirebaseActions_1 = require("./FirebaseActions");
exports.newMessageChannelId = "newMessageChannelId";
let currentFcmId = undefined;
let notificationListener = null;
let notificationOpenedListener = null;
let onTokenRefreshListener = null;
exports.firebaseSagas = [
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.OnNotificationOpen, OnNotificationOpenSaga),
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate, checkFcmIdAndUpdateSaga),
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.onTokenRefresh, onTokenRefreshSaga),
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.onNotificationReceived, onNotificationReceivedSaga),
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.removeAllNotification, removeAllNotificationSaga),
    effects_1.takeEvery(FirebaseActions_1.FirebaseActions.initSaga, initMessaging)
];
function* onTokenRefreshSaga(action) {
    const fcmToken = action.payload;
    if (fcmToken) {
        yield effects_1.call(exports.setFcmToken, fcmToken);
        yield effects_1.put(reducerHelper_1.fetchingAction(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate));
    }
}
exports.onTokenRefreshSaga = onTokenRefreshSaga;
exports.setFcmToken = (fcmToken) => {
    currentFcmId = fcmToken;
};
function initMessaging() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const enabled = yield react_native_firebase_1.default.messaging().hasPermission();
            if (!enabled) {
                console.log("messaging disabled, requestPermission...");
                yield react_native_firebase_1.default.messaging().requestPermission();
                console.log("fcmMount User has authorised.");
            }
            onTokenRefreshListener = yield react_native_firebase_1.default
                .messaging()
                .onTokenRefresh((fcmToken) => {
                redux_1.store.dispatch(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onTokenRefresh, fcmToken));
            });
            react_native_firebase_1.default
                .messaging()
                .getToken()
                .then(fcmToken => {
                redux_1.store.dispatch(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onTokenRefresh, fcmToken));
            })
                .catch(error => {
                console.log("getToken error: ", error);
            });
            notificationListener = yield react_native_firebase_1.default
                .notifications()
                .onNotification((notification) => redux_1.store.dispatch(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.onNotificationReceived, notification)));
            react_native_firebase_1.default
                .notifications()
                .android.createChannel(new react_native_firebase_1.default.notifications.Android.Channel(exports.newMessageChannelId, lang_1.default("New Message"), react_native_firebase_1.default.notifications.Android.Importance.Max).setDescription(lang_1.default("Display a notification when you receive a new message")));
            const notificationOpen = yield react_native_firebase_1.default.notifications().getInitialNotification();
            if (notificationOpen)
                redux_1.store.dispatch(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.OnNotificationOpen, notificationOpen));
            notificationOpenedListener = yield react_native_firebase_1.default
                .notifications()
                .onNotificationOpened((notificationOpen) => {
                redux_1.store.dispatch(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.OnNotificationOpen, notificationOpen));
            });
        }
        catch (error) {
            console.log("initMessaging error: ", error);
        }
    });
}
exports.initMessaging = initMessaging;
function createNotification(id, title, body, data, newMessageChannelId) {
    const notificationToSend = new react_native_firebase_1.default.notifications.Notification()
        .setNotificationId(Date.now() + "")
        .setTitle(title)
        .setBody(body)
        .setData(data);
    notificationToSend.android.setChannelId(newMessageChannelId);
    return notificationToSend;
}
exports.createNotification = createNotification;
function* onNotificationReceivedSaga(action) {
    const { data, title, body } = action.payload;
    if ((yield effects_1.call(RootNavigation_1.getCurrentScreen)) === "RoomScreen") {
        const notifAuthor = JSON.parse(data.author);
        const roomAuthor = (yield effects_1.call(RootNavigation_1.getCurrentScreenParam))
            .contactProfile;
        if (notifAuthor.id === roomAuthor.id)
            return;
    }
    const notificationToSend = yield effects_1.call(createNotification, Date.now() + "", title, body, data, exports.newMessageChannelId);
    // notificationSend.android.setSmallIcon("ic_launcher");
    yield react_native_firebase_1.default.notifications().displayNotification(notificationToSend);
}
exports.onNotificationReceivedSaga = onNotificationReceivedSaga;
function* OnNotificationOpenSaga(action) {
    const notificationOpen = action.payload;
    if (notificationOpen.notification.data.author) {
        const author = JSON.parse(notificationOpen.notification.data.author);
        yield effects_1.call(RootNavigation_1.navigate, {
            routeName: "RoomScreen",
            params: { contactProfile: author }
        });
    }
    react_native_firebase_1.default
        .notifications()
        .removeDeliveredNotification(notificationOpen.notification.notificationId);
}
exports.OnNotificationOpenSaga = OnNotificationOpenSaga;
function removeAllNotificationSaga() {
    react_native_firebase_1.default.notifications().removeAllDeliveredNotifications();
}
exports.removeAllNotificationSaga = removeAllNotificationSaga;
function* checkFcmIdAndUpdateSaga() {
    try {
        const userProfile = yield effects_1.select(sagaHelper_1.getUserProfile);
        const fcmId = yield currentFcmId;
        if (userProfile && fcmId && userProfile.fcmId !== fcmId) {
            const payload = {
                fcmId
            };
            yield effects_1.call(firebase_1.firesaga.firestore.updateDocument, "profiles/" + userProfile.id, payload);
            yield effects_1.put(reducerHelper_1.successAction(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate, payload));
        }
    }
    catch (error) {
        console.log("updateSaga error: ", error);
        yield effects_1.put(reducerHelper_1.errorAction(FirebaseActions_1.FirebaseActions.checkFcmIdAndUpdate, error));
    }
}
exports.checkFcmIdAndUpdateSaga = checkFcmIdAndUpdateSaga;
function stopMessaging() {
    if (onTokenRefreshListener)
        onTokenRefreshListener();
    if (notificationListener)
        notificationListener();
    if (notificationOpenedListener)
        notificationOpenedListener();
}
exports.stopMessaging = stopMessaging;
