import firebase from "react-native-firebase";
import { store } from "../config/redux";
import {
  errorAction,
  fetchingAction,
  IActionData,
  successAction
} from "../utils/reducerHelper";
import {
  Notification,
  NotificationOpen
} from "react-native-firebase/notifications";
import {
  getCurrentScreen,
  getCurrentScreenParam,
  navigate
} from "./RootNavigation";
import { IProfile } from "../rootReducers";
import { call, fork, put, select, spawn, takeEvery } from "redux-saga/effects";
import { getUserProfile } from "../utils/sagaHelper";
import lang from "./lang";
import { firesaga } from "../config/firebase";
import { action } from "typesafe-actions";
import { FirebaseActions } from "./FirebaseActions";

export const newMessageChannelId = "newMessageChannelId";
let currentFcmId: string | undefined = undefined;
let notificationListener: any = null;
let notificationOpenedListener: any = null;
let onTokenRefreshListener: null | (() => void) = null;

export const firebaseSagas = [
  takeEvery(FirebaseActions.OnNotificationOpen, OnNotificationOpenSaga),
  takeEvery(FirebaseActions.checkFcmIdAndUpdate, checkFcmIdAndUpdateSaga),
  takeEvery(FirebaseActions.onTokenRefresh, onTokenRefreshSaga),
  takeEvery(FirebaseActions.onNotificationReceived, onNotificationReceivedSaga),
  takeEvery(FirebaseActions.removeAllNotification, removeAllNotificationSaga),
  takeEvery(FirebaseActions.initSaga, initMessaging)
];

export function* onTokenRefreshSaga(action: IActionData<string>) {
  const fcmToken = action.payload;
  if (fcmToken) {
    yield call(setFcmToken, fcmToken);
    yield put(fetchingAction(FirebaseActions.checkFcmIdAndUpdate));
  }
}

export const setFcmToken = (fcmToken: string) => {
  currentFcmId = fcmToken;
};

export async function initMessaging() {
  try {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      console.log("messaging disabled, requestPermission...");
      await firebase.messaging().requestPermission();
      console.log("fcmMount User has authorised.");
    }
    onTokenRefreshListener = await firebase
      .messaging()
      .onTokenRefresh((fcmToken: string) => {
        store.dispatch(action(FirebaseActions.onTokenRefresh, fcmToken));
      });
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        store.dispatch(action(FirebaseActions.onTokenRefresh, fcmToken));
      })
      .catch(error => {
        console.log("getToken error: ", error);
      });
    notificationListener = await firebase
      .notifications()
      .onNotification((notification: Notification) =>
        store.dispatch(
          action(FirebaseActions.onNotificationReceived, notification)
        )
      );
    firebase
      .notifications()
      .android.createChannel(
        new firebase.notifications.Android.Channel(
          newMessageChannelId,
          lang("New Message"),
          firebase.notifications.Android.Importance.Max
        ).setDescription(
          lang("Display a notification when you receive a new message")
        )
      );
    const notificationOpen:
      | NotificationOpen
      | undefined = await firebase.notifications().getInitialNotification();
    if (notificationOpen)
      store.dispatch(
        action(FirebaseActions.OnNotificationOpen, notificationOpen)
      );

    notificationOpenedListener = await firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        store.dispatch(
          action(FirebaseActions.OnNotificationOpen, notificationOpen)
        );
      });
  } catch (error) {
    console.log("initMessaging error: ", error);
  }
}

export function createNotification(
  id: string,
  title: string,
  body: string,
  data: string,
  newMessageChannelId: string
) {
  const notificationToSend = new firebase.notifications.Notification()
    .setNotificationId(Date.now() + "")
    .setTitle(title)
    .setBody(body)
    .setData(data);
  notificationToSend.android.setChannelId(newMessageChannelId);
  return notificationToSend;
}

export function* onNotificationReceivedSaga(action: IActionData<Notification>) {
  const { data, title, body } = action.payload;
  if ((yield call(getCurrentScreen)) === "RoomScreen") {
    const notifAuthor = JSON.parse(data.author) as IProfile;
    const roomAuthor = (yield call(getCurrentScreenParam))!
      .contactProfile as IProfile;
    if (notifAuthor.id === roomAuthor.id) return;
  }
  const notificationToSend = yield call(
    createNotification,
    Date.now() + "",
    title,
    body,
    data,
    newMessageChannelId
  );

  // notificationSend.android.setSmallIcon("ic_launcher");
  yield firebase.notifications().displayNotification(notificationToSend);
}

export function* OnNotificationOpenSaga(action: IActionData<NotificationOpen>) {
  const notificationOpen = action.payload;
  if (notificationOpen.notification.data.author) {
    const author = JSON.parse(notificationOpen.notification.data.author);
    yield call(navigate, {
      routeName: "RoomScreen",
      params: { contactProfile: author }
    });
  }
  firebase
    .notifications()
    .removeDeliveredNotification(notificationOpen.notification.notificationId);
}

export function removeAllNotificationSaga() {
  firebase.notifications().removeAllDeliveredNotifications();
}

export function* checkFcmIdAndUpdateSaga() {
  try {
    const userProfile = yield select(getUserProfile);
    const fcmId = yield currentFcmId;
    if (userProfile && fcmId && userProfile.fcmId !== fcmId) {
      const payload = {
        fcmId
      };
      yield call(
        firesaga.firestore.updateDocument,
        "profiles/" + userProfile.id,
        payload
      );
      yield put(successAction(FirebaseActions.checkFcmIdAndUpdate, payload));
    }
  } catch (error) {
    console.log("updateSaga error: ", error);
    yield put(errorAction(FirebaseActions.checkFcmIdAndUpdate, error));
  }
}

export function stopMessaging() {
  if (onTokenRefreshListener) onTokenRefreshListener();
  if (notificationListener) notificationListener();
  if (notificationOpenedListener) notificationOpenedListener();
}
