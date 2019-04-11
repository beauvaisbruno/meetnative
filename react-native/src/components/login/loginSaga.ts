import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
// @ts-ignore
import { alert } from "redux-saga-rn-alert";
import firebase, { firestore } from "react-native-firebase";
import { firesaga, googleConfigure } from "../../config/firebase";
import { LoginActions } from "./loginReducer";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from "react-native-fbsdk";
import {
  errorAction,
  fetchingAction,
  successAction
} from "../../utils/reducerHelper";
import lang from "./lang";
import { getUserProfile } from "../../utils/sagaHelper";
import { navigate } from "../RootNavigation";

export const loginSagas = [
  takeEvery(LoginActions.loginGoogle, loginGoogleSaga),
  takeEvery(LoginActions.loginFacebook, loginFacebookSaga),
  takeEvery(LoginActions.loginLoadUser, loadUserSaga),
  takeEvery(LoginActions.loginWithEmail, loginWithEmailSaga),
  takeEvery(LoginActions.loginResetEmail, loginResetEmailSaga)
];

export function* setEntryScreen() {
  const user = firebase.auth().currentUser;
  if (user) {
    yield call(navigate, {
      routeName: "MainNavigation"
    });
    const profile = yield select(getUserProfile);
    if (profile !== null) {
      yield call(navigate, {
        routeName: "PartnersScreen"
      });
    } else
      yield call(navigate, {
        routeName: "ProfileContainer"
      });
  } else {
    yield call(navigate, {
      routeName: "LoginNavigation"
    });
  }
}
let channel: any = null;
export function* loadUserSaga() {
  try {
    yield fork(setEntryScreen);
    if (channel) return;
    channel = yield call(firesaga.auth.channel);
    yield put(successAction(LoginActions.loginLoadUser));
    while (true) {
      try {
        const { error, user } = yield take(channel);
        console.log("onAuthStateChanged ", user);
        if (error) yield put(errorAction(LoginActions.loginLoadUser, error));
        else yield put(successAction(LoginActions.loginLoadUser, user));
        yield call(setEntryScreen);
      } catch (error) {
        console.log("onAuthStateChanged loop error:", error);
        yield put(errorAction(LoginActions.loginLoadUser, error));
      }
    }
  } catch (error) {
    console.log("onAuthStateChanged error:", error);
    yield put(errorAction(LoginActions.loginLoadUser, error));
  }
}

export function* loginFacebookSaga() {
  try {
    const logInResult = yield call(LoginManager.logInWithReadPermissions, [
      "public_profile",
      "email"
    ]);
    if (logInResult.isCancelled) throw new Error("User cancelled request");
    const data = yield call(AccessToken.getCurrentAccessToken);
    if (!data)
      throw new Error("Something went wrong obtaining the users access token");
    const credential = yield call(
      firebase.auth.FacebookAuthProvider.credential,
      data.accessToken
    );
    const user = yield call(firesaga.auth.signInWithCredential, credential);
    const graphResult = yield call(graphRequest, "/me", {
      httpMethod: "GET",
      version: "v2.5",
      parameters: {
        fields: {
          string: "email"
        }
      }
    });
    console.log(
      "facebookLogin, grantedPermissions: ",
      logInResult.grantedPermissions.toString(),
      " graphResult: ",
      graphResult,
      " user: ",
      user
    );
    yield put(successAction(LoginActions.loginFacebook, user));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(LoginActions.loginFacebook, error));
  }
}

export function graphCallback(
  error: any,
  graphResults: any,
  resolve: (value?: PromiseLike<any> | any) => void,
  reject: (reason?: any) => void
) {
  if (error) {
    reject(error);
  } else {
    resolve(graphResults);
  }
}

export function graphRequest(graphPath: any, config: any) {
  return new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
      graphPath,
      config,
      (error, graphResults) => {
        graphCallback(error, graphResults, resolve, reject);
      }
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  });
}

export function* loginGoogleSaga() {
  try {
    yield call(GoogleSignin.hasPlayServices);
    yield call(googleConfigure);
    const data = yield call(GoogleSignin.signIn);
    const credential = yield call(
      firebase.auth.GoogleAuthProvider.credential,
      data.idToken,
      data.accessToken
    );
    const user = yield call(firesaga.auth.signInWithCredential, credential);
    console.log("googleLogin, user: ", user);

    yield put(successAction(LoginActions.loginGoogle, user));
  } catch (error) {
    console.log("error: ", error);
    yield put(errorAction(LoginActions.loginGoogle, error));
  }
}

export function* loginWithEmailSaga({
  payload: { email, password },
  meta: actions
}: any) {
  console.log("loginWithEmail : " + email + ", " + password);
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    const user = yield call(
      firesaga.auth.signInWithEmailAndPassword,
      email,
      password
    );
    yield put(successAction(LoginActions.loginWithEmail, user));
  } catch (error) {
    try {
      console.log("signInWithEmailAndPassword error: ", error);
      if (error.code && error.code === "auth/user-not-found") {
        const user = yield call(
          firesaga.auth.createUserWithEmailAndPassword,
          email,
          password
        );
        yield put(successAction(LoginActions.loginWithEmail, user));
      } else throw error;
    } catch (error) {
      console.log("createUserWithEmailAndPassword error: ", error);
      yield call(setErrors, yield call(getLoginWithEmailErrors, error));
      yield put(errorAction(LoginActions.loginWithEmail, error));
    }
  }
}

export const getLoginWithEmailErrors = (error: {
  code?: string;
  message: string;
}) => {
  if (error.message && error.message.includes("network error"))
    return {
      password: lang("Connection impossible : internet is not available.")
    };
  if (!error.code) return { password: lang("Connection impossible.") };
  if (error.code === "auth/wrong-password")
    return {
      password: lang("This email account exist, but the password is wrong.")
    };
  if (error.code === "auth/weak-password")
    return { password: lang("The password is too weak.") };
  if (error.code === "auth/invalid-email")
    return { email: lang("The email address is not valid.") };
  return { password: lang("The connection is impossible.") };
};

export function* loginResetEmailSaga({
  payload: { email },
  meta: actions
}: any) {
  console.log("loginResetEmailSaga, email: " + email);
  try {
    yield call(firesaga.auth.sendPasswordResetEmail, email, undefined);
    yield put(successAction(LoginActions.loginResetEmail));
    yield call(
      alert,
      lang("Reset password"),
      lang("Instruction has been sent to your email: {email}", { email }),
      [
        {
          text: lang("OK"),
          call: {
            method: navigate,
            args: {
              routeName: "LoginScreen",
              params: {
                resetEmail: email
              }
            }
          }
        }
      ],
      { cancelable: false }
    );
  } catch (error) {
    console.log("loginResetEmailSaga error: ", error);
    yield call(actions.setErrors, yield call(getResetEmailErrors, error));
    yield put(errorAction(LoginActions.loginResetEmail, error));
  }
  yield call(actions.setSubmitting, false);
}

export const getResetEmailErrors = (error: {
  code?: string;
  message: string;
}) => {
  if (error.message && error.message.includes("network error"))
    return {
      email: lang("Connection impossible : internet is not available.")
    };
  if (!error.code) return { email: lang("The reset is impossible.") };
  if (error.code === "auth/user-not-found")
    return { email: lang("This email account doesn't exist.") };
  return { email: lang("The reset is impossible.") };
};
