import { call, put, select, takeEvery } from "redux-saga/effects";
// @ts-ignore
import { firestore } from "react-native-firebase";
import { firesaga } from "../../config/firebase";
import { errorAction, successAction } from "../../utils/reducerHelper";

import { SearchActions } from "./searchReducer";
import { getUserProfile } from "../../utils/sagaHelper";
import { langMatch, sortByDistance } from "../../utils/utils";
import * as ngeohash from "ngeohash";

export const searchSagas = [
  takeEvery(SearchActions.searchProfiles, searchProfilesSaga)
];

export function* searchProfilesSaga() {
  try {
    const userProfile = yield select(getUserProfile);
    const { lon, lat } = userProfile;
    if (!lon || !lat) throw new Error("User has no lon lat coordinates");
    const thresholds = [0.1, 0.2, 0.5, 1, 2];
    let profilesData: any[] = [];
    for (const threshold of thresholds) {
      const snapshot = yield call(
        firesaga.firestore.getCollection,
        firestore()
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
      snapshot.forEach((profile: any) => {
        const otherProfile = profile.data();
        otherProfile.id = profile.id;
        if (
          langMatch(userProfile.langsToLearn, otherProfile.langsToTeach) &&
          langMatch(otherProfile.langsToLearn, userProfile.langsToTeach)
        )
          profilesData.push(otherProfile);
      });
      if (profilesData.length >= 4) break;
    }
    profilesData = sortByDistance(lat, lon, profilesData);
    yield put(successAction(SearchActions.searchProfiles, profilesData));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(SearchActions.searchProfiles, error));
  }
}
