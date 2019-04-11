import { all, call, put, select, takeEvery } from "redux-saga/effects";
import firebase from "react-native-firebase";
import { firesaga, googleConfigure } from "../../config/firebase";
import { ProfileActions } from "./profileReducer";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import * as ngeohash from "ngeohash";
import {
  errorAction,
  fetchingAction,
  IAction,
  successAction
} from "../../utils/reducerHelper";
import { callOrTimeout, getUserProfile } from "../../utils/sagaHelper";
import { ClearAll, IProfile } from "../../rootReducers";
import { LearnLevel } from "../../LearnLevel";
import { TeachLevel } from "../../TeachLevel";
import { action as actionCreator } from "typesafe-actions";
import { RoomActions } from "../room/roomReducer";
import { navigate } from "../RootNavigation";
import { checkFcmIdAndUpdateSaga } from "../firebaseSagas";
import storage from "redux-persist/es/storage";
import { AsyncStorage } from "react-native";
import { client, subscriptionClient } from "../../config/apollo";

export const profileSagas = [
  takeEvery(ProfileActions.profileUpdate, updateSaga),
  takeEvery(ProfileActions.profileLoad, loadSaga),
  takeEvery(ProfileActions.profileLogout, logoutSaga)
];

export function* updateSaga(action: IAction) {
  try {
    const user = firebase.auth().currentUser;
    if (!user) throw Error("No user logged in");
    // if (!action.payload) throw Error("action.payload are null");
    const profile = action.payload as IProfile;
    profile.geohash = ngeohash.encode_int(profile.lat!, profile.lon!, 30);

    profile.langsToLearn = LearnLevel.sortKeysByValue(profile.langsToLearn);
    profile.langsToTeach = TeachLevel.sortKeysByValue(profile.langsToTeach);
    profile.id = user.uid;

    const callOrTimeoutRes = yield callOrTimeout(
      10000,
      firesaga.firestore.setDocument,
      "profiles/" + user.uid,
      profile,
      undefined
    );
    if (callOrTimeoutRes && callOrTimeoutRes.timeout)
      throw new Error("timeout");
    yield put(successAction(ProfileActions.profileUpdate));
    const prevProf = yield select(getUserProfile);
    const firstProfileUpload = prevProf === null;
    yield put(successAction(ProfileActions.profileLoad, profile));
    if (firstProfileUpload) {
      navigate({ routeName: "SearchScreen" });
      yield call(checkFcmIdAndUpdateSaga);
    }
  } catch (error) {
    console.log("updateSaga error: ", error);
    yield put(errorAction(ProfileActions.profileUpdate, error));
  }
  yield call(action.meta.setSubmitting, false);
}

export function* logoutSaga() {
  try {
    yield put(fetchingAction(RoomActions.stopSyncMessages));
    const [facebook, firebaseResult, google] = yield all([
      call(firebaseLogout),
      call(googleLogout),
      call(LoginManager.logOut)
    ]);

    yield call(storage.removeItem, "persist:profile");
    yield call(storage.removeItem, "persist:room");
    yield call(AsyncStorage.removeItem, "apollo-cache-persist");
    yield call(client.resetStore);
    subscriptionClient.close(true);

    yield put(successAction(ProfileActions.profileLogout));
    yield put(actionCreator(ClearAll));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(ProfileActions.profileLogout, error));
  }
}

export function* firebaseLogout() {
  try {
    yield call(firesaga.auth.signOut);
  } catch (error) {
    console.warn("firebaseLogout error: ", error);
  }
}

export function* googleLogout() {
  try {
    yield call(googleConfigure);
    yield call(GoogleSignin.revokeAccess);
    yield call(GoogleSignin.signOut);
  } catch (error) {
    console.warn("googleLogout error: ", error);
  }
}

export function* loadSaga() {
  try {
    const user = firebase.auth().currentUser;
    if (user === null) throw Error("No user logged in");
    const snapshot = yield call(
      firesaga.firestore.getDocument,
      "profiles/" + user.uid
    );
    if (snapshot && snapshot.data) {
      const profile = snapshot.data();
      yield put(successAction(ProfileActions.profileLoad, profile));
      yield call(checkFcmIdAndUpdateSaga);
    } else yield put(successAction(ProfileActions.profileLoad));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(ProfileActions.profileLoad, error));
  }
}
