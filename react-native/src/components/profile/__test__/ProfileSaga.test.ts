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

import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  errorAction,
  fetchingAction,
  successAction
} from "../../../utils/reducerHelper";
import {
  firebaseLogout,
  googleLogout,
  loadSaga,
  logoutSaga,
  updateSaga
} from "../profileSaga";
import { call } from "redux-saga/effects";
import { ProfileActions } from "../profileReducer";
import { LoginManager } from "react-native-fbsdk";
import { throwError } from "redux-saga-test-plan/providers";
import { GoogleSignin } from "react-native-google-signin";
import { firesaga, googleConfigure } from "../../../config/firebase";
import { checkFcmIdAndUpdateSaga } from "../../firebaseSagas";

const loadAction = fetchingAction(ProfileActions.profileLoad, "payload", {
  setSubmitting: jest.fn()
});
describe("load profile saga", () => {
  it("load profile saga success", () => {
    auth.mockReturnValue({ currentUser: { uid: "someUid" } });
    testSaga(loadSaga)
      .next()
      .call(firesaga.firestore.getDocument, "profiles/someUid")
      .next({ data: () => "profile" })
      .put(successAction(ProfileActions.profileLoad, "profile"))
      .next()
      .call(checkFcmIdAndUpdateSaga)
      .next()
      .isDone();
  });
});

const logoutAction = fetchingAction(ProfileActions.profileLogout);

it("google logout", () => {
  testSaga(googleLogout)
    .next()
    .call(googleConfigure)
    .next()
    .call(GoogleSignin.revokeAccess)
    .next()
    .call(GoogleSignin.signOut)
    .next()
    .isDone();
  testSaga(googleLogout)
    .next()
    .throw(new Error("google logout error"))
    .isDone();
});

it("firebase logout", () => {
  testSaga(firebaseLogout)
    .next()
    .call(firesaga.auth.signOut)
    .next()
    .isDone();
  testSaga(firebaseLogout)
    .next()
    .throw(new Error("firebase logout error"))
    .isDone();
});

it("logout saga success", () => {
  return (
    expectSaga(logoutSaga, logoutAction)
      .provide([
        [call(firebaseLogout), undefined],
        [call(googleLogout), undefined],
        [call(LoginManager.logOut), undefined]
      ])
      // .provide({all: () => [undefined,undefined,undefined]})
      .put(successAction(ProfileActions.profileLogout))
      .run()
  );
});

it("logout saga error", () => {
  const error = new Error();
  return expectSaga(logoutSaga, logoutAction)
    .provide([
      [call(firebaseLogout), undefined],
      [call(googleLogout), undefined],
      [call(LoginManager.logOut), throwError(error)]
    ])
    .put(errorAction(ProfileActions.profileLogout, error))
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
const updateAction = fetchingAction(ProfileActions.profileUpdate, profileUser, {
  setSubmitting: jest.fn()
});
it("update saga success", () => {
  callOrTimeout.mockReturnValue({ fctToCall: null });
  auth.mockReturnValue({ currentUser: { uid: "someUid" } });
  testSaga(updateSaga, updateAction)
    .next()
    .is({ fctToCall: null })
    .next()
    .put(successAction(ProfileActions.profileUpdate))
    .next()
    .select(getUserProfile)
    .next(null)
    .put(successAction(ProfileActions.profileLoad, profileUser))
    .next()
    .call(checkFcmIdAndUpdateSaga)
    .next()
    .call(updateAction.meta.setSubmitting, false)
    .next()
    .isDone();
  expect(callOrTimeout).lastCalledWith(
    10000,
    firesaga.firestore.setDocument,
    "profiles/someUid",
    updateAction.payload,
    undefined
  );
});

it("update saga timeout", () => {
  callOrTimeout.mockReturnValue({ timeout: true });
  auth.mockReturnValue({ currentUser: { uid: "someUid" } });
  testSaga(updateSaga, updateAction)
    .next()
    .is({ timeout: true })
    .next({ timeout: true })
    .put(errorAction(ProfileActions.profileUpdate, new Error("timeout")))
    .next()
    .call(updateAction.meta.setSubmitting, false)
    .next()
    .isDone();
});

it("update saga no user", () => {
  auth.mockReturnValue({ currentUser: null });
  testSaga(updateSaga, updateAction)
    .next()
    .put(errorAction(ProfileActions.profileUpdate, Error("No user logged in")))
    .next()
    .call(updateAction.meta.setSubmitting, false)
    .next()
    .isDone();
});
