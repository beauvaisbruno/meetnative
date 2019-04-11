"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const PageTemplate_1 = __importDefault(require("../PageTemplate"));
const lang_1 = __importDefault(require("./lang"));
const partnersTypes_1 = require("./partnersTypes");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const Query_1 = __importDefault(require("react-apollo/Query"));
const PartnersList_1 = require("./PartnersList");
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const FirebaseActions_1 = require("../FirebaseActions");
const typesafe_actions_1 = require("typesafe-actions");
const Loading_1 = __importDefault(require("../../utils/Loading"));
exports.getUserProfile = graphql_tag_1.default`
  query getUserProfile {
    getUserProfile @client {
      ...profileFields
    }
  }
  ${partnersTypes_1.profileFields}
`;
exports.PartnersScreen = props =>
  React.createElement(
    native_base_1.View,
    null,
    React.createElement(react_navigation_1.NavigationEvents, {
      onDidFocus: () => props.removeAllNotification()
    }),
    React.createElement(
      Query_1.default,
      { query: exports.getUserProfile },
      ({ loading, error, data, startPolling, stopPolling }) => {
        startPolling(500);
        if (error) console.log("error: ", error);
        if (!data || !data.getUserProfile)
          return React.createElement(Loading_1.default, null);
        stopPolling();
        return React.createElement(PartnersList_1.PartnersList, {
          userProfile: data.getUserProfile
        });
      }
    )
  );
exports.default = react_redux_1.connect(null, dispatch => ({
  removeAllNotification: () =>
    dispatch(
      typesafe_actions_1.action(
        FirebaseActions_1.FirebaseActions.removeAllNotification
      )
    )
}))(
  PageTemplate_1.default(
    exports.PartnersScreen,
    lang_1.default("Last Messages"),
    false
  )
);
