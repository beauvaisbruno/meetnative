"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
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
Object.defineProperty(exports, "__esModule", { value: true });
const native_base_1 = require("native-base");
const lang_1 = __importDefault(require("./lang"));
const React = __importStar(require("react"));
const partnersTypes_1 = require("./partnersTypes");
const PartnerRow_1 = __importDefault(require("./PartnerRow"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const Query_1 = __importDefault(require("react-apollo/Query"));
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const Loading_1 = __importDefault(require("../../utils/Loading"));
exports.getLastMessages = graphql_tag_1.default`
  query getLastMessages($userId: ID!) {
    getLastMessages(recipientId: $userId) {
      ...lastMessagesFields
    }
  }
  ${partnersTypes_1.lastMessagesFields}
`;
exports.getLastMessagesSync = graphql_tag_1.default`
  subscription getLastMessagesSync($userId: ID!) {
    getLastMessagesSync(recipientId: $userId) {
      ...lastMessagesFields
    }
  }
  ${partnersTypes_1.lastMessagesFields}
`;
exports.PartnersList = ({ userProfile }) =>
  React.createElement(
    native_base_1.View,
    null,
    React.createElement(
      Query_1.default,
      { query: exports.getLastMessages, variables: { userId: userProfile.id } },
      ({ loading, error, data, subscribeToMore }) => {
        if (error) console.log("getLastMessages error: ", error);
        if (error)
          return React.createElement(
            native_base_1.Text,
            {
              style: {
                color: custom_1.default.brandDanger,
                alignSelf: "center"
              },
              testID: "error"
            },
            lang_1.default("Impossible to load new messages")
          );
        if (loading || !data.getLastMessages)
          return React.createElement(Loading_1.default, null);
        let lastMessages = data.getLastMessages;
        exportFunctions.subscribe(subscribeToMore, {
          document: exports.getLastMessagesSync,
          variables: { userId: userProfile.id },
          updateQuery: (prev, { subscriptionData }) =>
            Object.assign({}, prev, {
              getLastMessages: subscriptionData.data.getLastMessagesSync
            }),
          onError: error => {
            console.log("subscribeToMore error, userProfile: ", userProfile);
            console.log("subscribeToMore error: ", error);
          }
        });
        if (data.getLastMessages.length === 0)
          return React.createElement(
            native_base_1.View,
            { testID: "noPartner" },
            React.createElement(
              native_base_1.Text,
              { style: { fontStyle: "italic", textAlign: "center" } },
              lang_1.default("You have no partner yet")
            )
          );
        lastMessages = lastMessages.sort((b, a) => {
          if (!a.lastReadTime) return -1;
          if (!b.lastReadTime) return 1;
          return a.lastReadTime - b.lastReadTime;
        });
        const rows = [];
        lastMessages.forEach(message => {
          rows.push(
            React.createElement(
              PartnerRow_1.default,
              Object.assign(
                { key: message.author.id },
                { message, userProfile }
              )
            )
          );
        });
        return rows;
      }
    )
  );
function subscribe(subscribeToMore, options) {
  subscribeToMore(options);
}
const exportFunctions = {
  subscribe,
  PartnersList: exports.PartnersList
};
exports.default = exportFunctions;
//# sourceMappingURL=PartnersList.js.map
