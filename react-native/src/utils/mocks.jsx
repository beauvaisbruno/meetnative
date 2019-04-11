"use strict";
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
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var deepmerge_1 = require("deepmerge");
exports.createCache = function (config) {
    if (config === void 0) { config = {}; }
    return new apollo_cache_inmemory_1.InMemoryCache(__assign({ dataIdFromObject: function (o) { return o.id; }, addTypename: false, fragmentMatcher: {
            match: function (_a, typeCond, context) {
                var id = _a.id;
                return !!context.store.get(id);
            }
        } }, config));
};
function mockLastMessage(props) {
    if (props === void 0) { props = {}; }
    var now = Date.now();
    var recipientId = "recipientId";
    var authorId = "authorId";
    var prev = {
        id: authorId + "-" + recipientId,
        recipientId: recipientId,
        lastReadTime: now,
        lastMsgReceived: "A Long message received. A Long message received. A Long message received. A Long message received",
        lastMsgReceivedTime: now - 1,
        authorId: authorId
    };
    return __assign({}, prev, props);
}
exports.mockLastMessage = mockLastMessage;
function mockLastMessageWithIds(authorId, recipientId, props) {
    if (authorId === void 0) { authorId = "authorId"; }
    if (recipientId === void 0) { recipientId = "recipientId"; }
    if (props === void 0) { props = {}; }
    var now = Date.now();
    var prev = {
        id: authorId + "-" + recipientId,
        recipientId: recipientId,
        authorId: authorId,
        lastReadTime: now,
        lastMsgReceived: "A Long message received. A Long message received. A Long message received. A Long message received",
        lastMsgReceivedTime: now - 1
    };
    return __assign({}, prev, props);
}
exports.mockLastMessageWithIds = mockLastMessageWithIds;
function mockLastMessageProfile(props) {
    if (props === void 0) { props = {}; }
    var lastMessage = mockLastMessage(props);
    var prev = __assign({}, lastMessage, { author: mockProfile({ id: lastMessage.authorId }), recipient: mockProfile({ id: lastMessage.recipientId }) });
    return deepmerge_1.default(prev, props);
}
exports.mockLastMessageProfile = mockLastMessageProfile;
function mockLastMessageProfileWithIds(props, authorId, recipientId) {
    if (props === void 0) { props = {}; }
    if (authorId === void 0) { authorId = "authorId"; }
    if (recipientId === void 0) { recipientId = "recipientId"; }
    var lastMessage = mockLastMessageWithIds(authorId, recipientId);
    var prev = __assign({}, lastMessage, { author: mockProfile({ id: lastMessage.authorId }), recipient: mockProfile({ id: lastMessage.recipientId }) });
    return deepmerge_1.default(prev, props);
}
exports.mockLastMessageProfileWithIds = mockLastMessageProfileWithIds;
function mockProfile(props) {
    if (props === void 0) { props = {}; }
    var prev = {
        id: "id",
        pseudo: "Maëlle",
        isMale: false,
        langsToLearn: {
            english: "beginner",
            french: "fluent",
            german: "intermediate"
        },
        profession: "Legal Assistant",
        city: "Genève",
        geohash: 872962206,
        langsToTeach: {
            french: "fluent",
            italian: "bilingual",
            spanish: "native"
        },
        lon: 6.107057129141845,
        avatar: "pelican",
        lat: 46.08995392215012,
        age: 23
    };
    return __assign({}, prev, props);
}
exports.mockProfile = mockProfile;
