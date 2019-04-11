"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const react_native_google_signin_1 = require("react-native-google-signin");
const redux_saga_firebase_1 = __importDefault(require("redux-saga-firebase"));
const react_native_firebase_1 = __importDefault(
  require("react-native-firebase")
);
exports.googleConfigure = () => {
  react_native_google_signin_1.GoogleSignin.configure({
    webClientId:
      "652473972799-po79i7jn44v653lo2oia868ncfd4srod.apps.googleusercontent.com"
  });
};
exports.firesaga = new redux_saga_firebase_1.default(
  react_native_firebase_1.default
);
//# sourceMappingURL=firebase.js.map
