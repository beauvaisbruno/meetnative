"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
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
const react_native_firebase_1 = __importDefault(
  require("react-native-firebase")
);
const firebase_1 = require("../../config/firebase");
const profileReducer_1 = require("./profileReducer");
const react_native_fbsdk_1 = require("react-native-fbsdk");
const react_native_google_signin_1 = require("react-native-google-signin");
const ngeohash = __importStar(require("ngeohash"));
const reducerHelper_1 = require("../../utils/reducerHelper");
const sagaHelper_1 = require("../../utils/sagaHelper");
const rootReducers_1 = require("../../rootReducers");
const LearnLevel_1 = require("../../LearnLevel");
const TeachLevel_1 = require("../../TeachLevel");
const typesafe_actions_1 = require("typesafe-actions");
const roomReducer_1 = require("../room/roomReducer");
const RootNavigation_1 = require("../RootNavigation");
const firebaseSagas_1 = require("../firebaseSagas");
const storage_1 = __importDefault(require("redux-persist/es/storage"));
const react_native_1 = require("react-native");
const apollo_1 = require("../../config/apollo");
exports.profileSagas = [
  effects_1.takeEvery(
    profileReducer_1.ProfileActions.profileUpdate,
    updateSaga
  ),
  effects_1.takeEvery(profileReducer_1.ProfileActions.profileLoad, loadSaga),
  effects_1.takeEvery(profileReducer_1.ProfileActions.profileLogout, logoutSaga)
];
function* updateSaga(action) {
  try {
    const user = react_native_firebase_1.default.auth().currentUser;
    if (!user) throw Error("No user logged in");
    // if (!action.payload) throw Error("action.payload are null");
    const profile = action.payload;
    profile.geohash = ngeohash.encode_int(profile.lat, profile.lon, 30);
    profile.langsToLearn = LearnLevel_1.LearnLevel.sortKeysByValue(
      profile.langsToLearn
    );
    profile.langsToTeach = TeachLevel_1.TeachLevel.sortKeysByValue(
      profile.langsToTeach
    );
    profile.id = user.uid;
    const callOrTimeoutRes = yield sagaHelper_1.callOrTimeout(
      10000,
      firebase_1.firesaga.firestore.setDocument,
      "profiles/" + user.uid,
      profile,
      undefined
    );
    console.log("callOrTimeoutRes: ", callOrTimeoutRes);
    if (callOrTimeoutRes && callOrTimeoutRes.timeout)
      throw new Error("timeout");
    yield effects_1.put(
      reducerHelper_1.successAction(
        profileReducer_1.ProfileActions.profileUpdate
      )
    );
    const prevProf = yield effects_1.select(sagaHelper_1.getUserProfile);
    console.log("prevProf: ", prevProf);
    const firstProfileUpload = prevProf === null;
    yield effects_1.put(
      reducerHelper_1.successAction(
        profileReducer_1.ProfileActions.profileLoad,
        profile
      )
    );
    if (firstProfileUpload) {
      RootNavigation_1.navigate({ routeName: "SearchScreen" });
      yield effects_1.call(firebaseSagas_1.checkFcmIdAndUpdateSaga);
    }
  } catch (error) {
    console.log("updateSaga error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        profileReducer_1.ProfileActions.profileUpdate,
        error
      )
    );
  }
  yield effects_1.call(action.meta.setSubmitting, false);
}
exports.updateSaga = updateSaga;
function* logoutSaga() {
  try {
    yield effects_1.put(
      reducerHelper_1.fetchingAction(roomReducer_1.RoomActions.stopSyncMessages)
    );
    const [facebook, firebaseResult, google] = yield effects_1.all([
      effects_1.call(firebaseLogout),
      effects_1.call(googleLogout),
      effects_1.call(react_native_fbsdk_1.LoginManager.logOut)
    ]);
    yield effects_1.call(storage_1.default.removeItem, "persist:profile");
    yield effects_1.call(storage_1.default.removeItem, "persist:room");
    yield effects_1.call(
      react_native_1.AsyncStorage.removeItem,
      "apollo-cache-persist"
    );
    yield effects_1.call(apollo_1.client.resetStore);
    apollo_1.subscriptionClient.close(true);
    yield effects_1.put(
      reducerHelper_1.successAction(
        profileReducer_1.ProfileActions.profileLogout
      )
    );
    yield effects_1.put(typesafe_actions_1.action(rootReducers_1.ClearAll));
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        profileReducer_1.ProfileActions.profileLogout,
        error
      )
    );
  }
}
exports.logoutSaga = logoutSaga;
function* firebaseLogout() {
  try {
    yield effects_1.call(firebase_1.firesaga.auth.signOut);
  } catch (error) {
    console.warn("firebaseLogout error: ", error);
  }
  console.log("firebaseLogout done");
}
exports.firebaseLogout = firebaseLogout;
function* googleLogout() {
  try {
    yield effects_1.call(firebase_1.googleConfigure);
    yield effects_1.call(
      react_native_google_signin_1.GoogleSignin.revokeAccess
    );
    yield effects_1.call(react_native_google_signin_1.GoogleSignin.signOut);
    console.log("googleLogout done");
  } catch (error) {
    console.warn("googleLogout error: ", error);
  }
}
exports.googleLogout = googleLogout;
function* loadSaga() {
  try {
    const user = react_native_firebase_1.default.auth().currentUser;
    if (user === null) throw Error("No user logged in");
    const snapshot = yield effects_1.call(
      firebase_1.firesaga.firestore.getDocument,
      "profiles/" + user.uid
    );
    if (snapshot && snapshot.data) {
      // console.log("loadSaga, profile: ", snapshot.data);
      const profile = snapshot.data();
      yield effects_1.put(
        reducerHelper_1.successAction(
          profileReducer_1.ProfileActions.profileLoad,
          profile
        )
      );
      yield effects_1.call(firebaseSagas_1.checkFcmIdAndUpdateSaga);
    } else
      yield effects_1.put(
        reducerHelper_1.successAction(
          profileReducer_1.ProfileActions.profileLoad
        )
      );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        profileReducer_1.ProfileActions.profileLoad,
        error
      )
    );
  }
}
exports.loadSaga = loadSaga;
//# sourceMappingURL=profileSaga.js.map
