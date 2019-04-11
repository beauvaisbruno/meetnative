"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar JSON\n  scalar Long\n  type Query {\n    getLastMessages(recipientId: ID!): [LastMessage]\n  }\n  type Subscription {\n    getLastMessagesSync(recipientId: ID!): [LastMessage]\n  }\n\n  type Mutation {\n    setLastMessageRead(recipientId: ID!, authorId: ID!): LastMessage\n  }\n\n  type LastMessage {\n    id: ID!\n    recipient: Profile!\n    author: Profile!\n    recipientId: ID!\n    authorId: ID!\n    lastReadTime: Long\n    lastMsgReceived: String\n    lastMsgReceivedTime: Long\n  }\n\n  type Profile {\n    id: ID!\n    age: Int!\n    pseudo: String!\n    profession: String!\n    city: String!\n    avatar: String!\n    isMale: Boolean!\n    lat: Float\n    lon: Float\n    geohash: Long\n    fake: Boolean\n    langsToLearn: JSON!\n    langsToTeach: JSON!\n  }\n  schema {\n    query: Query\n    mutation: Mutation\n    subscription: Subscription\n  }\n"], ["\n  scalar JSON\n  scalar Long\n  type Query {\n    getLastMessages(recipientId: ID!): [LastMessage]\n  }\n  type Subscription {\n    getLastMessagesSync(recipientId: ID!): [LastMessage]\n  }\n\n  type Mutation {\n    setLastMessageRead(recipientId: ID!, authorId: ID!): LastMessage\n  }\n\n  type LastMessage {\n    id: ID!\n    recipient: Profile!\n    author: Profile!\n    recipientId: ID!\n    authorId: ID!\n    lastReadTime: Long\n    lastMsgReceived: String\n    lastMsgReceivedTime: Long\n  }\n\n  type Profile {\n    id: ID!\n    age: Int!\n    pseudo: String!\n    profession: String!\n    city: String!\n    avatar: String!\n    isMale: Boolean!\n    lat: Float\n    lon: Float\n    geohash: Long\n    fake: Boolean\n    langsToLearn: JSON!\n    langsToTeach: JSON!\n  }\n  schema {\n    query: Query\n    mutation: Mutation\n    subscription: Subscription\n  }\n"])));
var templateObject_1;
