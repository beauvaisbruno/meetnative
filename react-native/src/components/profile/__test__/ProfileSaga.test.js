"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callOrTimeout = jest.fn();
const getUserProfile = jest.fn();
jest.mock("../../../utils/sagaHelper", () => {
    return {
        callOrTimeout,
        getUserProfile
    };
});
jest.mock("react-native-fbsdk", () => {
    return {
        LoginManager: { logOut: jest.fn() }
    };
});
jest.mock("../../RootNavigation", () => {
    return {
        navigate: jest.fn()
    };
});
jest.mock("../../../config/apollo", () => {
    return {
        client: jest.fn(),
        subscriptionClient: jest.fn()
    };
});
jest.mock("react-native-google-signin", () => {
    return {
        GoogleSignin: { revokeAccess: jest.fn(), signOut: jest.fn() }
    };
});
jest.mock("../../../config/apollo", () => {
    return {
        client: { resetStore: jest.fn() },
        subscriptionClient: { close: jest.fn() }
    };
});
const auth = jest.fn();
jest.mock("react-native-firebase", () => {
    return {
        auth
    };
});
jest.mock("../../../config/firebase", () => {
    return {
        firesaga: {
            firestore: {
                setDocument: jest.fn(),
                getDocument: jest.fn(),
                syncDocument: function* syncDocument() {
                    yield;
                }
            },
            auth: { signOut: jest.fn() }
        },
        googleConfigure: () => "googleConfigure"
    };
});
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const reducerHelper_1 = require("../../../utils/reducerHelper");
const profileSaga_1 = require("../profileSaga");
const effects_1 = require("redux-saga/effects");
const profileReducer_1 = require("../profileReducer");
const react_native_fbsdk_1 = require("react-native-fbsdk");
const providers_1 = require("redux-saga-test-plan/providers");
const react_native_google_signin_1 = require("react-native-google-signin");
const firebase_1 = require("../../../config/firebase");
const firebaseSagas_1 = require("../../firebaseSagas");
const loadAction = reducerHelper_1.fetchingAction(profileReducer_1.ProfileActions.profileLoad, "payload", {
    setSubmitting: jest.fn()
});
describe("load profile saga", () => {
    it("load profile saga success", () => {
        auth.mockReturnValue({ currentUser: { uid: "someUid" } });
        redux_saga_test_plan_1.testSaga(profileSaga_1.loadSaga)
            .next()
            .call(firebase_1.firesaga.firestore.getDocument, "profiles/someUid")
            .next({ data: () => "profile" })
            .put(reducerHelper_1.successAction(profileReducer_1.ProfileActions.profileLoad, "profile"))
            .next()
            .call(firebaseSagas_1.checkFcmIdAndUpdateSaga)
            .next()
            .isDone();
    });
});
const logoutAction = reducerHelper_1.fetchingAction(profileReducer_1.ProfileActions.profileLogout);
it("google logout", () => {
    redux_saga_test_plan_1.testSaga(profileSaga_1.googleLogout)
        .next()
        .call(firebase_1.googleConfigure)
        .next()
        .call(react_native_google_signin_1.GoogleSignin.revokeAccess)
        .next()
        .call(react_native_google_signin_1.GoogleSignin.signOut)
        .next()
        .isDone();
    redux_saga_test_plan_1.testSaga(profileSaga_1.googleLogout)
        .next()
        .throw(new Error("google logout error"))
        .isDone();
});
it("firebase logout", () => {
    redux_saga_test_plan_1.testSaga(profileSaga_1.firebaseLogout)
        .next()
        .call(firebase_1.firesaga.auth.signOut)
        .next()
        .isDone();
    redux_saga_test_plan_1.testSaga(profileSaga_1.firebaseLogout)
        .next()
        .throw(new Error("firebase logout error"))
        .isDone();
});
it("logout saga success", () => {
    return (redux_saga_test_plan_1.expectSaga(profileSaga_1.logoutSaga, logoutAction)
        .provide([
        [effects_1.call(profileSaga_1.firebaseLogout), undefined],
        [effects_1.call(profileSaga_1.googleLogout), undefined],
        [effects_1.call(react_native_fbsdk_1.LoginManager.logOut), undefined]
    ])
        // .provide({all: () => [undefined,undefined,undefined]})
        .put(reducerHelper_1.successAction(profileReducer_1.ProfileActions.profileLogout))
        .run());
});
it("logout saga error", () => {
    const error = new Error();
    return redux_saga_test_plan_1.expectSaga(profileSaga_1.logoutSaga, logoutAction)
        .provide([
        [effects_1.call(profileSaga_1.firebaseLogout), undefined],
        [effects_1.call(profileSaga_1.googleLogout), undefined],
        [effects_1.call(react_native_fbsdk_1.LoginManager.logOut), providers_1.throwError(error)]
    ])
        .put(reducerHelper_1.errorAction(profileReducer_1.ProfileActions.profileLogout, error))
        .run();
});
const profileUser = {
    id: "profileId",
    langsToLearn: {
        french: "intermediate"
    },
    langsToTeach: {
        english: "native"
    }
};
const updateAction = reducerHelper_1.fetchingAction(profileReducer_1.ProfileActions.profileUpdate, profileUser, {
    setSubmitting: jest.fn()
});
it("update saga success", () => {
    callOrTimeout.mockReturnValue({ fctToCall: null });
    auth.mockReturnValue({ currentUser: { uid: "someUid" } });
    redux_saga_test_plan_1.testSaga(profileSaga_1.updateSaga, updateAction)
        .next()
        .is({ fctToCall: null })
        .next()
        .put(reducerHelper_1.successAction(profileReducer_1.ProfileActions.profileUpdate))
        .next()
        .select(getUserProfile)
        .next(null)
        .put(reducerHelper_1.successAction(profileReducer_1.ProfileActions.profileLoad, profileUser))
        .next()
        .call(firebaseSagas_1.checkFcmIdAndUpdateSaga)
        .next()
        .call(updateAction.meta.setSubmitting, false)
        .next()
        .isDone();
    expect(callOrTimeout).lastCalledWith(10000, firebase_1.firesaga.firestore.setDocument, "profiles/someUid", updateAction.payload, undefined);
});
it("update saga timeout", () => {
    callOrTimeout.mockReturnValue({ timeout: true });
    auth.mockReturnValue({ currentUser: { uid: "someUid" } });
    redux_saga_test_plan_1.testSaga(profileSaga_1.updateSaga, updateAction)
        .next()
        .is({ timeout: true })
        .next({ timeout: true })
        .put(reducerHelper_1.errorAction(profileReducer_1.ProfileActions.profileUpdate, new Error("timeout")))
        .next()
        .call(updateAction.meta.setSubmitting, false)
        .next()
        .isDone();
});
it("update saga no user", () => {
    auth.mockReturnValue({ currentUser: null });
    redux_saga_test_plan_1.testSaga(profileSaga_1.updateSaga, updateAction)
        .next()
        .put(reducerHelper_1.errorAction(profileReducer_1.ProfileActions.profileUpdate, Error("No user logged in")))
        .next()
        .call(updateAction.meta.setSubmitting, false)
        .next()
        .isDone();
});
