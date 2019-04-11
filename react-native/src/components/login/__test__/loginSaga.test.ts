import { firesaga } from "../../../config/firebase";

jest.mock("../../RootNavigation", () => {
  return { navigate: jest.fn() };
});
const alert = jest.fn();
jest.mock("redux-saga-rn-alert", () => {
  return { alert };
});
jest.mock("../../../config/firebase", () => {
  return {
    firesaga: {
      auth: {
        signInWithCredential: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
        channel: jest.fn()
      }
    },
    googleConfigure: jest.fn()
  };
});
const signInWithCredential = jest.fn();
jest.mock("react-native-firebase", () => {
  function auth() {
    return { signInWithCredential };
  }
  auth.GoogleAuthProvider = { credential: jest.fn() };
  auth.FacebookAuthProvider = { credential: jest.fn() };
  return {
    auth
  };
});
jest.mock("react-native-google-signin", () => {
  return {
    GoogleSignin: { hasPlayServices: jest.fn(), signIn: jest.fn() }
  };
});
const start = jest.fn();
const addRequest = jest.fn(infoRequest => {
  return { start };
});
const GraphRequest = jest.fn();
jest.mock("react-native-fbsdk", () => {
  return {
    AccessToken: { getCurrentAccessToken: jest.fn() },
    GraphRequest,
    GraphRequestManager: jest.fn(() => {
      return { addRequest };
    }),
    LoginManager: { logInWithReadPermissions: jest.fn() }
  };
});

import { testSaga } from "redux-saga-test-plan";

import {
  errorAction,
  fetchingAction,
  successAction
} from "../../../utils/reducerHelper";
import { LoginActions } from "../loginReducer";
import {
  getLoginWithEmailErrors,
  getResetEmailErrors,
  graphCallback,
  graphRequest,
  loadUserSaga,
  loginFacebookSaga,
  loginGoogleSaga,
  loginResetEmailSaga,
  loginWithEmailSaga,
  setEntryScreen
} from "../loginSaga";
import { GoogleSignin } from "react-native-google-signin";
import * as Config from "../../../config/firebase";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
import { navigate } from "../../RootNavigation";

class CodeError extends Error {
  code: string;
  constructor(code: string) {
    super("code");
    this.code = code;
  }
}

describe("loginLoadUser", () => {
  const action = fetchingAction(LoginActions.loginLoadUser);
  const error = new Error("error");
  it("success", () => {
    testSaga(loadUserSaga)
      .next()
      .fork(setEntryScreen)
      .next()
      // @ts-ignore
      .call(Config.firesaga.auth.channel)
      .next("channel")
      .put(successAction(LoginActions.loginLoadUser))
      .next()
      .take("channel")
      .next({ error: false, user: "user" })
      .put(successAction(LoginActions.loginLoadUser, "user"))
      .next()
      .call(setEntryScreen)
      .next()
      .take("channel")
      .next({ error: "error" })
      .put(errorAction(LoginActions.loginLoadUser, "error"))
      .next()
      .call(setEntryScreen)
      .throw(error)
      .put(errorAction(LoginActions.loginLoadUser, error))
      .throw(error)
      .put(errorAction(LoginActions.loginLoadUser, error))
      .next()
      .isDone();
  });
});
describe("loginResetEmail", () => {
  const someEmail = "email";
  const setSubmitting = jest.fn();
  const setErrors = jest.fn();
  const action = fetchingAction(
    LoginActions.loginResetEmail,
    {
      email: someEmail
    },
    { setSubmitting, setErrors }
  );
  it("getResetEmailErrors", () => {
    expect(getResetEmailErrors(new Error("network error"))).toEqual({
      email: "Connection impossible : internet is not available."
    });
    expect(getResetEmailErrors(new Error("anyError"))).toEqual({
      email: "The reset is impossible."
    });
    expect(getResetEmailErrors(new CodeError("auth/user-not-found"))).toEqual({
      email: "This email account doesn't exist."
    });
    expect(getResetEmailErrors(new CodeError("anyCode"))).toEqual({
      email: "The reset is impossible."
    });
  });
  it("error", () => {
    const error = new Error("error");
    testSaga(loginResetEmailSaga, action)
      .next()
      .throw(error)
      .call(getResetEmailErrors, error)
      .next("error")
      .call(setErrors, "error")
      .next()
      .put(errorAction(LoginActions.loginResetEmail, error))
      .next()
      .call(setSubmitting, false)
      .next()
      .isDone();
  });
  it("success", () => {
    testSaga(loginResetEmailSaga, action)
      .next()
      .call(Config.firesaga.auth.sendPasswordResetEmail, someEmail, undefined)
      .next()
      .put(successAction(LoginActions.loginResetEmail))
      .next()
      .call(
        alert,
        "Reset password",
        "Instruction has been sent to your email: " + someEmail,
        [
          {
            text: "OK",
            call: {
              method: navigate,
              args: {
                routeName: "LoginScreen",
                params: {
                  resetEmail: "email"
                }
              }
            }
          }
        ],
        { cancelable: false }
      )
      .next()
      .call(setSubmitting, false)
      .next()
      .isDone();
  });
});
describe("loginWithEmailSaga", () => {
  const setErrors = jest.fn();
  const action = fetchingAction(
    LoginActions.loginWithEmail,
    {
      email: "email",
      password: "password"
    },
    { setErrors }
  );
  it("success", () => {
    testSaga(loginWithEmailSaga, action)
      .next()
      .call(
        Config.firesaga.auth.signInWithEmailAndPassword,
        "email",
        "password"
      )
      .next("user")
      .put(successAction(LoginActions.loginWithEmail, "user"))
      .next()
      .isDone();
  });
  it("create account", () => {
    const error = new CodeError("auth/user-not-found");
    testSaga(loginWithEmailSaga, action)
      .next()
      .call(
        Config.firesaga.auth.signInWithEmailAndPassword,
        "email",
        "password"
      )
      .throw(error)
      .call(
        Config.firesaga.auth.createUserWithEmailAndPassword,
        "email",
        "password"
      )
      .next("user")
      .put(successAction(LoginActions.loginWithEmail, "user"))
      .next()
      .isDone();
  });
  it("create account error", () => {
    const error = new Error("error");
    testSaga(loginWithEmailSaga, action)
      .next()
      .throw(error)
      .call(getLoginWithEmailErrors, error)
      .next("getLoginWithEmailErrors")
      .call(setErrors, "getLoginWithEmailErrors")
      .next()
      .put(errorAction(LoginActions.loginWithEmail, error))
      .next()
      .isDone();
  });
  it("getLoginWithEmailErrors", () => {
    expect(getLoginWithEmailErrors(new Error("error"))).toEqual({
      password: "Connection impossible."
    });
    expect(getLoginWithEmailErrors(new Error("network error"))).toEqual({
      password: "Connection impossible : internet is not available."
    });
    expect(
      getLoginWithEmailErrors(new CodeError("auth/wrong-password"))
    ).toEqual({
      password: "This email account exist, but the password is wrong."
    });
    expect(
      getLoginWithEmailErrors(new CodeError("auth/weak-password"))
    ).toEqual({ password: "The password is too weak." });
    expect(
      getLoginWithEmailErrors(new CodeError("auth/invalid-email"))
    ).toEqual({ email: "The email address is not valid." });
    expect(getLoginWithEmailErrors(new CodeError("other"))).toEqual({
      password: "The connection is impossible."
    });
  });
});

describe("loginFacebookSaga", () => {
  const loginFacebook = fetchingAction(LoginActions.loginFacebook);
  it("success", () => {
    testSaga(loginFacebookSaga, loginFacebook)
      .next()
      .call(LoginManager.logInWithReadPermissions, ["public_profile", "email"])
      .next({
        isCancelled: false,
        grantedPermissions: "grantedPermissions"
      })
      .call(AccessToken.getCurrentAccessToken)
      .next({ accessToken: "accessToken" })
      .call(firebase.auth.FacebookAuthProvider.credential, "accessToken")
      .next("credential")
      .call(firesaga.auth.signInWithCredential, "credential")
      .next("user")
      .call(graphRequest, "/me", {
        httpMethod: "GET",
        version: "v2.5",
        parameters: {
          fields: {
            string: "email"
          }
        }
      })
      .next("graphRequest")
      .put(successAction(LoginActions.loginFacebook, "user"))
      .next()
      .isDone();
  });
  it("cancel", () => {
    testSaga(loginFacebookSaga, loginFacebook)
      .next()
      .call(LoginManager.logInWithReadPermissions, ["public_profile", "email"])
      .next({ isCancelled: true })
      .put(
        errorAction(
          LoginActions.loginFacebook,
          new Error("User cancelled request")
        )
      )
      .next()
      .isDone();
  });
  it("no token", () => {
    testSaga(loginFacebookSaga, loginFacebook)
      .next()
      .call(LoginManager.logInWithReadPermissions, ["public_profile", "email"])
      .next({ isCancelled: false })
      .call(AccessToken.getCurrentAccessToken)
      .next(undefined)
      .put(
        errorAction(
          LoginActions.loginFacebook,
          new Error("Something went wrong obtaining the users access token")
        )
      )
      .next()
      .isDone();
  });
  it("graphRequest", async () => {
    GraphRequest.mockImplementation((graphPath, config, callback) => {
      setTimeout(() => {
        callback(undefined, "graphResults");
      }, 1);
    });
    GraphRequest.mockReturnThis();
    expect(graphRequest("graphPath", "config")).resolves.toEqual(
      "graphResults"
    );
    expect(addRequest).toBeCalledWith(new GraphRequest());
    expect(start).toBeCalled();
  });
  it("graphRequest callback", () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    graphCallback(undefined, "result", resolve, reject);
    expect(resolve).toBeCalledWith("result");
    expect(reject).not.toHaveBeenCalled();
    graphCallback("error", undefined, resolve, reject);
    expect(reject).toBeCalledWith("error");
    expect(resolve).toBeCalledTimes(1);
  });
});

it("loginGoogleSaga success", () => {
  const loginGoogle = fetchingAction(LoginActions.loginGoogle);
  testSaga(loginGoogleSaga, loginGoogle)
    .next()
    .call(GoogleSignin.hasPlayServices)
    .next()
    .call(Config.googleConfigure)
    .next()
    .call(GoogleSignin.signIn)
    .next({ idToken: "idToken", accessToken: "accessToken" })
    .call(firebase.auth.GoogleAuthProvider.credential, "idToken", "accessToken")
    .next("credential")
    .call(Config.firesaga.auth.signInWithCredential, "credential")
    .next("user")
    .put(successAction(LoginActions.loginGoogle, "user"))
    .next()
    .isDone();

  const error = new Error();
  testSaga(loginGoogleSaga, loginGoogle)
    .next()
    .throw(error)
    .put(errorAction(LoginActions.loginGoogle, error))
    .next()
    .isDone();
});
