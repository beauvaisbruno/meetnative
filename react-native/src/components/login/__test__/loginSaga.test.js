"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../../../config/firebase");
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
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const reducerHelper_1 = require("../../../utils/reducerHelper");
const loginReducer_1 = require("../loginReducer");
const loginSaga_1 = require("../loginSaga");
const react_native_google_signin_1 = require("react-native-google-signin");
const Config = __importStar(require("../../../config/firebase"));
const react_native_fbsdk_1 = require("react-native-fbsdk");
const react_native_firebase_1 = __importDefault(require("react-native-firebase"));
const RootNavigation_1 = require("../../RootNavigation");
class CodeError extends Error {
    constructor(code) {
        super("code");
        this.code = code;
    }
}
describe("loginLoadUser", () => {
    const action = reducerHelper_1.fetchingAction(loginReducer_1.LoginActions.loginLoadUser);
    const error = new Error("error");
    it("success", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loadUserSaga)
            .next()
            .fork(loginSaga_1.setEntryScreen)
            .next()
            // @ts-ignore
            .call(Config.firesaga.auth.channel)
            .next("channel")
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginLoadUser))
            .next()
            .take("channel")
            .next({ error: false, user: "user" })
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginLoadUser, "user"))
            .next()
            .call(loginSaga_1.setEntryScreen)
            .next()
            .take("channel")
            .next({ error: "error" })
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginLoadUser, "error"))
            .next()
            .call(loginSaga_1.setEntryScreen)
            .throw(error)
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginLoadUser, error))
            .throw(error)
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginLoadUser, error))
            .next()
            .isDone();
    });
});
describe("loginResetEmail", () => {
    const someEmail = "email";
    const setSubmitting = jest.fn();
    const setErrors = jest.fn();
    const action = reducerHelper_1.fetchingAction(loginReducer_1.LoginActions.loginResetEmail, {
        email: someEmail
    }, { setSubmitting, setErrors });
    it("getResetEmailErrors", () => {
        expect(loginSaga_1.getResetEmailErrors(new Error("network error"))).toEqual({
            email: "Connection impossible : internet is not available."
        });
        expect(loginSaga_1.getResetEmailErrors(new Error("anyError"))).toEqual({
            email: "The reset is impossible."
        });
        expect(loginSaga_1.getResetEmailErrors(new CodeError("auth/user-not-found"))).toEqual({
            email: "This email account doesn't exist."
        });
        expect(loginSaga_1.getResetEmailErrors(new CodeError("anyCode"))).toEqual({
            email: "The reset is impossible."
        });
    });
    it("error", () => {
        const error = new Error("error");
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginResetEmailSaga, action)
            .next()
            .throw(error)
            .call(loginSaga_1.getResetEmailErrors, error)
            .next("error")
            .call(setErrors, "error")
            .next()
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginResetEmail, error))
            .next()
            .call(setSubmitting, false)
            .next()
            .isDone();
    });
    it("success", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginResetEmailSaga, action)
            .next()
            .call(Config.firesaga.auth.sendPasswordResetEmail, someEmail, undefined)
            .next()
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginResetEmail))
            .next()
            .call(alert, "Reset password", "Instruction has been sent to your email: " + someEmail, [
            {
                text: "OK",
                call: {
                    method: RootNavigation_1.navigate,
                    args: {
                        routeName: "LoginScreen",
                        params: {
                            resetEmail: "email"
                        }
                    }
                }
            }
        ], { cancelable: false })
            .next()
            .call(setSubmitting, false)
            .next()
            .isDone();
    });
});
describe("loginWithEmailSaga", () => {
    const setErrors = jest.fn();
    const action = reducerHelper_1.fetchingAction(loginReducer_1.LoginActions.loginWithEmail, {
        email: "email",
        password: "password"
    }, { setErrors });
    it("success", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginWithEmailSaga, action)
            .next()
            .call(Config.firesaga.auth.signInWithEmailAndPassword, "email", "password")
            .next("user")
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginWithEmail, "user"))
            .next()
            .isDone();
    });
    it("create account", () => {
        const error = new CodeError("auth/user-not-found");
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginWithEmailSaga, action)
            .next()
            .call(Config.firesaga.auth.signInWithEmailAndPassword, "email", "password")
            .throw(error)
            .call(Config.firesaga.auth.createUserWithEmailAndPassword, "email", "password")
            .next("user")
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginWithEmail, "user"))
            .next()
            .isDone();
    });
    it("create account error", () => {
        const error = new Error("error");
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginWithEmailSaga, action)
            .next()
            .throw(error)
            .call(loginSaga_1.getLoginWithEmailErrors, error)
            .next("getLoginWithEmailErrors")
            .call(setErrors, "getLoginWithEmailErrors")
            .next()
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginWithEmail, error))
            .next()
            .isDone();
    });
    it("getLoginWithEmailErrors", () => {
        expect(loginSaga_1.getLoginWithEmailErrors(new Error("error"))).toEqual({
            password: "Connection impossible."
        });
        expect(loginSaga_1.getLoginWithEmailErrors(new Error("network error"))).toEqual({
            password: "Connection impossible : internet is not available."
        });
        expect(loginSaga_1.getLoginWithEmailErrors(new CodeError("auth/wrong-password"))).toEqual({
            password: "This email account exist, but the password is wrong."
        });
        expect(loginSaga_1.getLoginWithEmailErrors(new CodeError("auth/weak-password"))).toEqual({ password: "The password is too weak." });
        expect(loginSaga_1.getLoginWithEmailErrors(new CodeError("auth/invalid-email"))).toEqual({ email: "The email address is not valid." });
        expect(loginSaga_1.getLoginWithEmailErrors(new CodeError("other"))).toEqual({
            password: "The connection is impossible."
        });
    });
});
describe("loginFacebookSaga", () => {
    const loginFacebook = reducerHelper_1.fetchingAction(loginReducer_1.LoginActions.loginFacebook);
    it("success", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginFacebookSaga, loginFacebook)
            .next()
            .call(react_native_fbsdk_1.LoginManager.logInWithReadPermissions, ["public_profile", "email"])
            .next({
            isCancelled: false,
            grantedPermissions: "grantedPermissions"
        })
            .call(react_native_fbsdk_1.AccessToken.getCurrentAccessToken)
            .next({ accessToken: "accessToken" })
            .call(react_native_firebase_1.default.auth.FacebookAuthProvider.credential, "accessToken")
            .next("credential")
            .call(firebase_1.firesaga.auth.signInWithCredential, "credential")
            .next("user")
            .call(loginSaga_1.graphRequest, "/me", {
            httpMethod: "GET",
            version: "v2.5",
            parameters: {
                fields: {
                    string: "email"
                }
            }
        })
            .next("graphRequest")
            .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginFacebook, "user"))
            .next()
            .isDone();
    });
    it("cancel", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginFacebookSaga, loginFacebook)
            .next()
            .call(react_native_fbsdk_1.LoginManager.logInWithReadPermissions, ["public_profile", "email"])
            .next({ isCancelled: true })
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginFacebook, new Error("User cancelled request")))
            .next()
            .isDone();
    });
    it("no token", () => {
        redux_saga_test_plan_1.testSaga(loginSaga_1.loginFacebookSaga, loginFacebook)
            .next()
            .call(react_native_fbsdk_1.LoginManager.logInWithReadPermissions, ["public_profile", "email"])
            .next({ isCancelled: false })
            .call(react_native_fbsdk_1.AccessToken.getCurrentAccessToken)
            .next(undefined)
            .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginFacebook, new Error("Something went wrong obtaining the users access token")))
            .next()
            .isDone();
    });
    it("graphRequest", () => __awaiter(this, void 0, void 0, function* () {
        GraphRequest.mockImplementation((graphPath, config, callback) => {
            setTimeout(() => {
                callback(undefined, "graphResults");
            }, 1);
        });
        GraphRequest.mockReturnThis();
        expect(loginSaga_1.graphRequest("graphPath", "config")).resolves.toEqual("graphResults");
        expect(addRequest).toBeCalledWith(new GraphRequest());
        expect(start).toBeCalled();
    }));
    it("graphRequest callback", () => {
        const resolve = jest.fn();
        const reject = jest.fn();
        loginSaga_1.graphCallback(undefined, "result", resolve, reject);
        expect(resolve).toBeCalledWith("result");
        expect(reject).not.toHaveBeenCalled();
        loginSaga_1.graphCallback("error", undefined, resolve, reject);
        expect(reject).toBeCalledWith("error");
        expect(resolve).toBeCalledTimes(1);
    });
});
it("loginGoogleSaga success", () => {
    const loginGoogle = reducerHelper_1.fetchingAction(loginReducer_1.LoginActions.loginGoogle);
    redux_saga_test_plan_1.testSaga(loginSaga_1.loginGoogleSaga, loginGoogle)
        .next()
        .call(react_native_google_signin_1.GoogleSignin.hasPlayServices)
        .next()
        .call(Config.googleConfigure)
        .next()
        .call(react_native_google_signin_1.GoogleSignin.signIn)
        .next({ idToken: "idToken", accessToken: "accessToken" })
        .call(react_native_firebase_1.default.auth.GoogleAuthProvider.credential, "idToken", "accessToken")
        .next("credential")
        .call(Config.firesaga.auth.signInWithCredential, "credential")
        .next("user")
        .put(reducerHelper_1.successAction(loginReducer_1.LoginActions.loginGoogle, "user"))
        .next()
        .isDone();
    const error = new Error();
    redux_saga_test_plan_1.testSaga(loginSaga_1.loginGoogleSaga, loginGoogle)
        .next()
        .throw(error)
        .put(reducerHelper_1.errorAction(loginReducer_1.LoginActions.loginGoogle, error))
        .next()
        .isDone();
});
