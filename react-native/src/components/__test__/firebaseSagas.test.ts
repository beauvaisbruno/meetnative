/* eslint-disable quotes */
import { mockDate, unMockDate } from "../../../jest/testUtils";

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

jest.mock("../lang", () => (text: any) => text);

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

import { testSaga } from "redux-saga-test-plan";
import {
  checkFcmIdAndUpdateSaga,
  createNotification,
  initMessaging,
  newMessageChannelId,
  OnNotificationOpenSaga,
  onNotificationReceivedSaga,
  onTokenRefreshSaga,
  removeAllNotificationSaga,
  setFcmToken
} from "../firebaseSagas";
import { fetchingAction, successAction } from "../../utils/reducerHelper";
import { FirebaseActions } from "../FirebaseActions";
import { action } from "typesafe-actions";
import firebase from "react-native-firebase";
import { getUserProfile } from "../../utils/sagaHelper";
import { firesaga } from "../../config/firebase";

it("initMessagingSaga", async () => {
  hasPermission.mockReturnValue(false);
  dispatch.mockReturnValue("dispatch");
  const getTokenThen = jest.fn();
  getToken.mockReturnValue({ then: getTokenThen });
  setDescription.mockReturnValue({ then: getTokenThen });
  getInitialNotification.mockReturnValue("notificationOpen");
  getTokenThen.mockReturnValue({ catch: jest.fn() });
  await initMessaging();

  expect(requestPermission).toHaveBeenCalled();
  expect(onNotification).toHaveBeenCalled();

  expect(createChannel).toHaveBeenCalledWith({ then: getTokenThen });
  expect(getInitialNotification).toHaveBeenCalled();
  expect(dispatch.mock.calls[0][0]).toEqual(
    action(FirebaseActions.OnNotificationOpen, "notificationOpen")
  );
  expect(onNotificationOpened).toHaveBeenCalled();

  getTokenThen.mock.calls[0][0]("fcmToken");
  expect(dispatch.mock.calls[1][0]).toEqual(
    action(FirebaseActions.onTokenRefresh, "fcmToken")
  );

  onTokenRefresh.mock.calls[0][0]("fcmToken");
  expect(dispatch.mock.calls[2][0]).toEqual(
    action(FirebaseActions.onTokenRefresh, "fcmToken")
  );

  onNotification.mock.calls[0][0]("notification");
  expect(dispatch.mock.calls[3][0]).toEqual(
    action(FirebaseActions.onNotificationReceived, "notification")
  );

  onNotificationOpened.mock.calls[0][0]("notificationOpen");
  expect(dispatch.mock.calls[4][0]).toEqual(
    action(FirebaseActions.OnNotificationOpen, "notificationOpen")
  );
});

it("onTokenRefreshSaga", () => {
  testSaga(
    onTokenRefreshSaga,
    action(FirebaseActions.onTokenRefresh, "fcmToken")
  )
    .next()
    .call(setFcmToken, "fcmToken")
    .next()
    .put(fetchingAction(FirebaseActions.checkFcmIdAndUpdate))
    .next()
    .isDone();
});

describe("onNotificationReceivedSaga", () => {
  it("room displayed", () => {
    testSaga(
      onNotificationReceivedSaga,
      action(FirebaseActions.onNotificationReceived, {
        data: { author: '{"id":"id"}' },
        title: "title",
        body: "body"
      })
    )
      .next()
      .call(getCurrentScreen)
      .next("RoomScreen")
      .call(getCurrentScreenParam)
      .next({ contactProfile: { id: "id" } })
      .isDone();
  });
  it("local notification", () => {
    mockDate();
    testSaga(
      onNotificationReceivedSaga,
      action(FirebaseActions.onNotificationReceived, {
        data: { author: '{"id":"id"}' },
        title: "title",
        body: "body"
      })
    )
      .next()
      .call(getCurrentScreen)
      .next("RoomScreen")
      .call(getCurrentScreenParam)
      .next({ contactProfile: { id: "otherId" } })
      .call(
        createNotification,
        Date.now() + "",
        "title",
        "body",
        { author: '{"id":"id"}' },
        newMessageChannelId
      )
      .next("notificationToSend")
      .next()
      .isDone();
    expect(displayNotification).toBeCalledWith("notificationToSend");
    unMockDate();
  });
});

it("OnNotificationOpenSaga", () => {
  testSaga(
    OnNotificationOpenSaga,
    action(FirebaseActions.onNotificationReceived, {
      notification: { data: { author: "{}" }, notificationId: "notificationId" }
    })
  )
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
  removeAllNotificationSaga();
  expect(removeAllDeliveredNotifications).toBeCalled();
});

it("checkFcmIdAndUpdateSaga", () => {
  testSaga(checkFcmIdAndUpdateSaga)
    .next()
    .select(getUserProfile)
    .next({ fcmId: "fcmId", id: "id" })
    .next("newFcmId")
    .call(firesaga.firestore.updateDocument, "profiles/id", {
      fcmId: "newFcmId"
    })
    .next()
    .put(
      successAction(FirebaseActions.checkFcmIdAndUpdate, {
        fcmId: "newFcmId"
      })
    )
    .next()
    .isDone();
});
