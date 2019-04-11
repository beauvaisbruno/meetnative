"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = graphql_tag_1.default`
  scalar JSON
  scalar Long
  type Query {
    getLastMessages(recipientId: ID!): [LastMessage]
  }
  type Subscription {
    getLastMessagesSync(recipientId: ID!): [LastMessage]
  }

  type Mutation {
    setLastMessageRead(recipientId: ID!, authorId: ID!): LastMessage
  }

  type LastMessage {
    id: ID!
    recipient: Profile!
    author: Profile!
    recipientId: ID!
    authorId: ID!
    lastReadTime: Long
    lastMsgReceived: String
    lastMsgReceivedTime: Long
  }

  type Profile {
    id: ID!
    age: Int!
    pseudo: String!
    profession: String!
    city: String!
    avatar: String!
    isMale: Boolean!
    lat: Float
    lon: Float
    geohash: Long
    fake: Boolean
    langsToLearn: JSON!
    langsToTeach: JSON!
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
//# sourceMappingURL=typeDefs.js.map
