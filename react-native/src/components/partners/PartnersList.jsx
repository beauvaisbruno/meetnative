"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var lang_1 = require("./lang");
var React = require("react");
var partnersTypes_1 = require("./partnersTypes");
var PartnerRow_1 = require("./PartnerRow");
var graphql_tag_1 = require("graphql-tag");
var Query_1 = require("react-apollo/Query");
var custom_1 = require("../../config/native-base-theme/variables/custom");
var Loading_1 = require("../../utils/Loading");
exports.getLastMessages = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getLastMessages($userId: ID!) {\n    getLastMessages(recipientId: $userId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"], ["\n  query getLastMessages($userId: ID!) {\n    getLastMessages(recipientId: $userId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"])), partnersTypes_1.lastMessagesFields);
exports.getLastMessagesSync = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  subscription getLastMessagesSync($userId: ID!) {\n    getLastMessagesSync(recipientId: $userId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"], ["\n  subscription getLastMessagesSync($userId: ID!) {\n    getLastMessagesSync(recipientId: $userId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"])), partnersTypes_1.lastMessagesFields);
exports.PartnersList = function (_a) {
    var userProfile = _a.userProfile;
    return (<native_base_1.View>
    <Query_1.default query={exports.getLastMessages} variables={{ userId: userProfile.id }}>
      {function (_a) {
        var loading = _a.loading, error = _a.error, data = _a.data, subscribeToMore = _a.subscribeToMore;
        if (error)
            console.log("getLastMessages error: ", error);
        if (error)
            return (<native_base_1.Text style={{
                color: custom_1.default.brandDanger,
                alignSelf: "center"
            }} testID={"error"}>
              {lang_1.default("Impossible to load new messages")}
            </native_base_1.Text>);
        if (loading || !data.getLastMessages)
            return <Loading_1.default />;
        var lastMessages = data.getLastMessages;
        exportFunctions.subscribe(subscribeToMore, {
            document: exports.getLastMessagesSync,
            variables: { userId: userProfile.id },
            updateQuery: function (prev, _a) {
                var subscriptionData = _a.subscriptionData;
                return (__assign({}, prev, { getLastMessages: subscriptionData.data.getLastMessagesSync }));
            },
            onError: function (error) {
                console.log("subscribeToMore error, userProfile: ", userProfile);
                console.log("subscribeToMore error: ", error);
            }
        });
        if (data.getLastMessages.length === 0)
            return (<native_base_1.View testID={"noPartner"}>
              <native_base_1.Text style={{ fontStyle: "italic", textAlign: "center" }}>
                {lang_1.default("You have no partner yet")}
              </native_base_1.Text>
            </native_base_1.View>);
        lastMessages = lastMessages.sort(function (b, a) {
            if (!a.lastReadTime)
                return -1;
            if (!b.lastReadTime)
                return 1;
            return a.lastReadTime - b.lastReadTime;
        });
        var rows = [];
        lastMessages.forEach(function (message) {
            rows.push(<PartnerRow_1.default key={message.author.id} {...{ message: message, userProfile: userProfile }}/>);
        });
        return rows;
    }}
    </Query_1.default>
  </native_base_1.View>);
};
function subscribe(subscribeToMore, options) {
    subscribeToMore(options);
}
var exportFunctions = {
    subscribe: subscribe,
    PartnersList: exports.PartnersList
};
exports.default = exportFunctions;
var templateObject_1, templateObject_2;
