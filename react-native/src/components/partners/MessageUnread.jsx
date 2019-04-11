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
var Mutation_1 = require("react-apollo/Mutation");
var utilsUi_1 = require("../../utils/utilsUi");
var native_base_1 = require("native-base");
var react_1 = require("react");
var graphql_tag_1 = require("graphql-tag");
var partnersTypes_1 = require("./partnersTypes");
var PartnersList_1 = require("./PartnersList");
var lang_1 = require("./lang");
var custom_1 = require("../../config/native-base-theme/variables/custom");
exports.setLastMessageRead = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {\n    setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"], ["\n  mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {\n    setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {\n      ...lastMessagesFields\n    }\n  }\n  ", "\n"])), partnersTypes_1.lastMessagesFields);
exports.MessageUnread = function (_a) {
    var size = _a.size, userProfile = _a.userProfile, contactProfile = _a.contactProfile, message = _a.message, testID = _a.testID, stories = _a.stories;
    return (<Mutation_1.default mutation={exports.setLastMessageRead} 
    // Unnecessary, for reference only, ui is automatically updated because:
    // (1) old and new ids are matching, so update is auto
    // (2) getLastMessage use subscription
    update={function (cache, _a) {
        var lastReadTime = _a.data.setLastMessageRead.lastReadTime;
        cache.writeFragment({
            id: contactProfile.id + "-" + userProfile.id,
            fragment: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          fragment _ on LastMessage {\n            lastReadTime\n          }\n        "], ["\n          fragment _ on LastMessage {\n            lastReadTime\n          }\n        "]))),
            data: { lastReadTime: lastReadTime }
        });
    }} refetchQueries={function () { return [
        {
            query: PartnersList_1.getLastMessages,
            variables: {
                userId: userProfile.id
            }
        }
    ]; }}>
    {function (setLastMessageRead, _a) {
        var data = _a.data, error = _a.error, loading = _a.loading;
        if (stories && stories.loading)
            loading = stories.loading;
        return (<native_base_1.View style={__assign({ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, utilsUi_1.noMarPad)}>
          <native_base_1.Text style={{ color: custom_1.default.brandDanger, fontSize: size }}>
            {lang_1.default("Unread message")}
          </native_base_1.Text>
          <native_base_1.Button block transparent onPress={function () {
            console.log("setLastMessageRead, recipientId: ", userProfile.id, ", authorId: ", contactProfile.id);
            console.log("optimisticResponse: ", {
                setLastMessageRead: __assign({}, message, { lastReadTime: Date.now() })
            });
            setLastMessageRead({
                variables: {
                    recipientId: userProfile.id,
                    authorId: contactProfile.id
                },
                optimisticResponse: {
                    setLastMessageRead: __assign({}, message, { lastReadTime: Date.now() })
                }
            });
        }} testID={"setLastMessageReadBtn"} style={__assign({}, utilsUi_1.noMarPad, { height: size + 5, marginRight: 5 })}>
            {loading || (<native_base_1.Icon name="close-circle-outline" type="MaterialCommunityIcons" style={__assign({}, utilsUi_1.noMarPad, { fontSize: size })}/>)}
            {loading && (<native_base_1.Icon name="spinner" type="EvilIcons" style={__assign({}, utilsUi_1.noMarPad, { fontSize: size })}/>)}
          </native_base_1.Button>
        </native_base_1.View>);
    }}
  </Mutation_1.default>);
};
var templateObject_1, templateObject_2;
