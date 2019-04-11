"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
// @ts-ignore
const redux_saga_rn_alert_1 = require("redux-saga-rn-alert");
const react_native_firebase_1 = __importDefault(
  require("react-native-firebase")
);
const firebase_1 = require("../../config/firebase");
const loginReducer_1 = require("./loginReducer");
const react_native_google_signin_1 = require("react-native-google-signin");
const react_native_fbsdk_1 = require("react-native-fbsdk");
const reducerHelper_1 = require("../../utils/reducerHelper");
const lang_1 = __importDefault(require("./lang"));
const sagaHelper_1 = require("../../utils/sagaHelper");
const RootNavigation_1 = require("../RootNavigation");
exports.loginSagas = [
  effects_1.takeEvery(loginReducer_1.LoginActions.loginGoogle, loginGoogleSaga),
  effects_1.takeEvery(
    loginReducer_1.LoginActions.loginFacebook,
    loginFacebookSaga
  ),
  effects_1.takeEvery(loginReducer_1.LoginActions.loginLoadUser, loadUserSaga),
  effects_1.takeEvery(
    loginReducer_1.LoginActions.loginWithEmail,
    loginWithEmailSaga
  ),
  effects_1.takeEvery(
    loginReducer_1.LoginActions.loginResetEmail,
    loginResetEmailSaga
  )
];
function* setEntryScreen() {
  const user = react_native_firebase_1.default.auth().currentUser;
  if (user) {
    yield effects_1.call(RootNavigation_1.navigate, {
      routeName: "MainNavigation"
    });
    const profile = yield effects_1.select(sagaHelper_1.getUserProfile);
    if (profile !== null) {
      yield effects_1.call(RootNavigation_1.navigate, {
        routeName: "PartnersScreen"
      });
    } else
      yield effects_1.call(RootNavigation_1.navigate, {
        routeName: "ProfileContainer"
      });
  } else {
    yield effects_1.call(RootNavigation_1.navigate, {
      routeName: "LoginNavigation"
    });
  }
}
exports.setEntryScreen = setEntryScreen;
let channel = null;
function* loadUserSaga() {
  try {
    yield effects_1.fork(setEntryScreen);
    if (channel) return;
    channel = yield effects_1.call(firebase_1.firesaga.auth.channel);
    yield effects_1.put(
      reducerHelper_1.successAction(loginReducer_1.LoginActions.loginLoadUser)
    );
    while (true) {
      try {
        const { error, user } = yield effects_1.take(channel);
        console.log("onAuthStateChanged ", user);
        if (error)
          yield effects_1.put(
            reducerHelper_1.errorAction(
              loginReducer_1.LoginActions.loginLoadUser,
              error
            )
          );
        else
          yield effects_1.put(
            reducerHelper_1.successAction(
              loginReducer_1.LoginActions.loginLoadUser,
              user
            )
          );
        yield effects_1.call(setEntryScreen);
      } catch (error) {
        console.log("onAuthStateChanged loop error:", error);
        yield effects_1.put(
          reducerHelper_1.errorAction(
            loginReducer_1.LoginActions.loginLoadUser,
            error
          )
        );
      }
    }
  } catch (error) {
    console.log("onAuthStateChanged error:", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        loginReducer_1.LoginActions.loginLoadUser,
        error
      )
    );
  }
}
exports.loadUserSaga = loadUserSaga;
function* loginFacebookSaga() {
  try {
    const logInResult = yield effects_1.call(
      react_native_fbsdk_1.LoginManager.logInWithReadPermissions,
      ["public_profile", "email"]
    );
    if (logInResult.isCancelled) throw new Error("User cancelled request");
    const data = yield effects_1.call(
      react_native_fbsdk_1.AccessToken.getCurrentAccessToken
    );
    if (!data)
      throw new Error("Something went wrong obtaining the users access token");
    const credential = yield effects_1.call(
      react_native_firebase_1.default.auth.FacebookAuthProvider.credential,
      data.accessToken
    );
    const user = yield effects_1.call(
      firebase_1.firesaga.auth.signInWithCredential,
      credential
    );
    const graphResult = yield effects_1.call(graphRequest, "/me", {
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
    yield effects_1.put(
      reducerHelper_1.successAction(
        loginReducer_1.LoginActions.loginFacebook,
        user
      )
    );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        loginReducer_1.LoginActions.loginFacebook,
        error
      )
    );
  }
}
exports.loginFacebookSaga = loginFacebookSaga;
function graphCallback(error, graphResults, resolve, reject) {
  if (error) {
    reject(error);
  } else {
    resolve(graphResults);
  }
}
exports.graphCallback = graphCallback;
function graphRequest(graphPath, config) {
  return new Promise((resolve, reject) => {
    const infoRequest = new react_native_fbsdk_1.GraphRequest(
      graphPath,
      config,
      (error, graphResults) => {
        graphCallback(error, graphResults, resolve, reject);
      }
    );
    new react_native_fbsdk_1.GraphRequestManager()
      .addRequest(infoRequest)
      .start();
  });
}
exports.graphRequest = graphRequest;
function* loginGoogleSaga() {
  try {
    yield effects_1.call(
      react_native_google_signin_1.GoogleSignin.hasPlayServices
    );
    yield effects_1.call(firebase_1.googleConfigure);
    const data = yield effects_1.call(
      react_native_google_signin_1.GoogleSignin.signIn
    );
    const credential = yield effects_1.call(
      react_native_firebase_1.default.auth.GoogleAuthProvider.credential,
      data.idToken,
      data.accessToken
    );
    const user = yield effects_1.call(
      firebase_1.firesaga.auth.signInWithCredential,
      credential
    );
    console.log("googleLogin, user: ", user);
    yield effects_1.put(
      reducerHelper_1.successAction(
        loginReducer_1.LoginActions.loginGoogle,
        user
      )
    );
  } catch (error) {
    console.log("error: ", error);
    yield effects_1.put(
      reducerHelper_1.errorAction(
        loginReducer_1.LoginActions.loginGoogle,
        error
      )
    );
  }
}
exports.loginGoogleSaga = loginGoogleSaga;
function* loginWithEmailSaga({ payload: { email, password }, meta: actions }) {
  console.log("loginWithEmail : " + email + ", " + password);
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    const user = yield effects_1.call(
      firebase_1.firesaga.auth.signInWithEmailAndPassword,
      email,
      password
    );
    yield effects_1.put(
      reducerHelper_1.successAction(
        loginReducer_1.LoginActions.loginWithEmail,
        user
      )
    );
  } catch (error) {
    try {
      console.log("signInWithEmailAndPassword error: ", error);
      if (error.code && error.code === "auth/user-not-found") {
        const user = yield effects_1.call(
          firebase_1.firesaga.auth.createUserWithEmailAndPassword,
          email,
          password
        );
        yield effects_1.put(
          reducerHelper_1.successAction(
            loginReducer_1.LoginActions.loginWithEmail,
            user
          )
        );
      } else throw error;
    } catch (error) {
      console.log("createUserWithEmailAndPassword error: ", error);
      yield effects_1.call(
        setErrors,
        yield effects_1.call(exports.getLoginWithEmailErrors, error)
      );
      yield effects_1.put(
        reducerHelper_1.errorAction(
          loginReducer_1.LoginActions.loginWithEmail,
          error
        )
      );
    }
  }
}
exports.loginWithEmailSaga = loginWithEmailSaga;
exports.getLoginWithEmailErrors = error => {
  if (error.message && error.message.includes("network error"))
    return {
      password: lang_1.default(
        "Connection impossible : internet is not available."
      )
    };
  if (!error.code)
    return { password: lang_1.default("Connection impossible.") };
  if (error.code === "auth/wrong-password")
    return {
      password: lang_1.default(
        "This email account exist, but the password is wrong."
      )
    };
  if (error.code === "auth/weak-password")
    return { password: lang_1.default("The password is too weak.") };
  if (error.code === "auth/invalid-email")
    return { email: lang_1.default("The email address is not valid.") };
  return { password: lang_1.default("The connection is impossible.") };
};
function* loginResetEmailSaga({ payload: { email }, meta: actions }) {
  console.log("loginResetEmailSaga, email: " + email);
  try {
    yield effects_1.call(
      firebase_1.firesaga.auth.sendPasswordResetEmail,
      email,
      undefined
    );
    yield effects_1.put(
      reducerHelper_1.successAction(loginReducer_1.LoginActions.loginResetEmail)
    );
    yield effects_1.call(
      redux_saga_rn_alert_1.alert,
      lang_1.default("Reset password"),
      lang_1.default("Instruction has been sent to your email: {email}", {
        email
      }),
      [
        {
          text: lang_1.default("OK"),
          call: {
            method: RootNavigation_1.navigate,
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
    yield effects_1.call(
      actions.setErrors,
      yield effects_1.call(exports.getResetEmailErrors, error)
    );
    yield effects_1.put(
      reducerHelper_1.errorAction(
        loginReducer_1.LoginActions.loginResetEmail,
        error
      )
    );
  }
  yield effects_1.call(actions.setSubmitting, false);
}
exports.loginResetEmailSaga = loginResetEmailSaga;
exports.getResetEmailErrors = error => {
  if (error.message && error.message.includes("network error"))
    return {
      email: lang_1.default(
        "Connection impossible : internet is not available."
      )
    };
  if (!error.code) return { email: lang_1.default("The reset is impossible.") };
  if (error.code === "auth/user-not-found")
    return { email: lang_1.default("This email account doesn't exist.") };
  return { email: lang_1.default("The reset is impossible.") };
};
