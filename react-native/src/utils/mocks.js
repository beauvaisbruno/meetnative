"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const deepmerge_1 = __importDefault(require("deepmerge"));
exports.createCache = (config = {}) => new apollo_cache_inmemory_1.InMemoryCache(Object.assign({ dataIdFromObject: o => o.id, addTypename: false, fragmentMatcher: {
        match: ({ id }, typeCond, context) => !!context.store.get(id)
    } }, config));
function mockLastMessage(props = {}) {
    const now = Date.now();
    const recipientId = "recipientId";
    const authorId = "authorId";
    const prev = {
        id: authorId + "-" + recipientId,
        recipientId,
        lastReadTime: now,
        lastMsgReceived: "A Long message received. A Long message received. A Long message received. A Long message received",
        lastMsgReceivedTime: now - 1,
        authorId
    };
    return Object.assign({}, prev, props);
}
exports.mockLastMessage = mockLastMessage;
function mockLastMessageWithIds(authorId = "authorId", recipientId = "recipientId", props = {}) {
    const now = Date.now();
    const prev = {
        id: authorId + "-" + recipientId,
        recipientId,
        authorId,
        lastReadTime: now,
        lastMsgReceived: "A Long message received. A Long message received. A Long message received. A Long message received",
        lastMsgReceivedTime: now - 1
    };
    return Object.assign({}, prev, props);
}
exports.mockLastMessageWithIds = mockLastMessageWithIds;
function mockLastMessageProfile(props = {}) {
    const lastMessage = mockLastMessage(props);
    const prev = Object.assign({}, lastMessage, { author: mockProfile({ id: lastMessage.authorId }), recipient: mockProfile({ id: lastMessage.recipientId }) });
    return deepmerge_1.default(prev, props);
}
exports.mockLastMessageProfile = mockLastMessageProfile;
function mockLastMessageProfileWithIds(props = {}, authorId = "authorId", recipientId = "recipientId") {
    const lastMessage = mockLastMessageWithIds(authorId, recipientId);
    const prev = Object.assign({}, lastMessage, { author: mockProfile({ id: lastMessage.authorId }), recipient: mockProfile({ id: lastMessage.recipientId }) });
    return deepmerge_1.default(prev, props);
}
exports.mockLastMessageProfileWithIds = mockLastMessageProfileWithIds;
function mockProfile(props = {}) {
    const prev = {
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
    return Object.assign({}, prev, props);
}
exports.mockProfile = mockProfile;
