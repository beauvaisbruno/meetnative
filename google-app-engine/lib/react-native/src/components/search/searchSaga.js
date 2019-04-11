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
// @ts-ignore
const react_native_firebase_1 = require("react-native-firebase");
const firebase_1 = require("../../config/firebase");
const reducerHelper_1 = require("../../utils/reducerHelper");
const searchReducer_1 = require("./searchReducer");
const sagaHelper_1 = require("../../utils/sagaHelper");
const utils_1 = require("../../utils/utils");
const ngeohash = __importStar(require("ngeohash"));
exports.searchSagas = [
  effects_1.takeEvery(
    searchReducer_1.SearchActions.searchProfiles,
    searchProfilesSaga
  )
];
function* searchProfilesSaga() {
  try {
    const userProfile = yield effects_1.select(sagaHelper_1.getUserProfile);
    const { lon, lat } = userProfile;
    if (!lon || !lat) throw new Error("User has no lon lat coordinates");
    const thresholds = [0.1, 0.2, 0.5, 1, 2];
    let profilesData = [];
    for (const threshold of thresholds) {
      const snapshot = yield effects_1.call(
        firebase_1.firesaga.firestore.getCollection,
        react_native_firebase_1
          .firestore()
          .collection("profiles")
          .where(
            "geohash",
            ">",
            ngeohash.encode_int(lat - threshold, lon - threshold, 30)
          )
          .where(
            "geohash",
            "<",
            ngeohash.encode_int(lat + threshold, lon + threshold, 30)
          )
      );
      if (snapshot.size < 4 && threshold < 2) {
        continue;
      }
      profilesData = [];
      // eslint-disable-next-line
      snapshot.forEach(profile => {
        const otherProfile = profile.data();
        otherProfile.id = profile.id;
        if (
          utils_1.langMatch(
            userProfile.langsToLearn,
            otherProfile.langsToTeach
          ) &&
          utils_1.langMatch(otherProfile.langsToLearn, userProfile.langsToTeach)
        )
          profilesData.push(otherProfile);
      });
      if (profilesData.length >= 4) break;
    }
    profilesData = utils_1.sortByDistance(lat, lon, profilesData);
    yield effects_1.put(
      reducerHelper_1.successAction(
        searchReducer_1.SearchActions.searchProfiles,
        profilesData
      )
    );
  } catch (error) {
    yield effects_1.put(
      reducerHelper_1.errorAction(
        searchReducer_1.SearchActions.searchProfiles,
        error
      )
    );
  }
}
exports.searchProfilesSaga = searchProfilesSaga;
//# sourceMappingURL=searchSaga.js.map
