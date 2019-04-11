import {
  all,
  call,
  fork,
  put,
  spawn,
  take,
  takeEvery
} from "redux-saga/effects";
import { profileSagas, updateSaga } from "./components/profile/profileSaga";
import { loginSagas } from "./components/login/loginSaga";
// @ts-ignore
import { watchAlertChannel } from "redux-saga-rn-alert";
import { REHYDRATE } from "redux-persist/lib/constants";
import { searchSagas } from "./components/search/searchSaga";
import { roomSagas } from "./components/room/roomSaga";
import { ProfileActions } from "./components/profile/profileReducer";
import { firebaseSagas } from "./components/firebaseSagas";
import { FirebaseActions } from "./components/FirebaseActions";
import { action } from "typesafe-actions";
import { cache, initApollo } from "./config/apollo";
import { store } from "./config/redux";
import gql from "graphql-tag";
import { getUserProfile } from "./components/partners/PartnersScreen";

export default function* rootSaga() {
  yield take(REHYDRATE);
  yield fork(initApollo);
  yield all([
    ...firebaseSagas,
    ...profileSagas,
    ...loginSagas,
    ...searchSagas,
    ...roomSagas,
    spawn(watchAlertChannel),
    put(action(FirebaseActions.initSaga))
    // put(action(ApolloActions.initApollo))
  ]);
}
