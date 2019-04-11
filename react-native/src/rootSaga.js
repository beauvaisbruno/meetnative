"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const profileSaga_1 = require("./components/profile/profileSaga");
const loginSaga_1 = require("./components/login/loginSaga");
// @ts-ignore
const redux_saga_rn_alert_1 = require("redux-saga-rn-alert");
const constants_1 = require("redux-persist/lib/constants");
const searchSaga_1 = require("./components/search/searchSaga");
const roomSaga_1 = require("./components/room/roomSaga");
const firebaseSagas_1 = require("./components/firebaseSagas");
const FirebaseActions_1 = require("./components/FirebaseActions");
const typesafe_actions_1 = require("typesafe-actions");
const apollo_1 = require("./config/apollo");
function* rootSaga() {
    yield effects_1.take(constants_1.REHYDRATE);
    yield effects_1.fork(apollo_1.initApollo);
    yield effects_1.all([
        ...firebaseSagas_1.firebaseSagas,
        ...profileSaga_1.profileSagas,
        ...loginSaga_1.loginSagas,
        ...searchSaga_1.searchSagas,
        ...roomSaga_1.roomSagas,
        effects_1.spawn(redux_saga_rn_alert_1.watchAlertChannel),
        effects_1.put(typesafe_actions_1.action(FirebaseActions_1.FirebaseActions.initSaga))
        // put(action(ApolloActions.initApollo))
    ]);
}
exports.default = rootSaga;
