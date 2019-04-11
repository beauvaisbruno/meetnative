// @ts-ignore
import GraphQLLong from "graphql-type-long";
// @ts-ignore
import GraphQLJSON from "graphql-type-json";
import gql from "graphql-tag";

export const typeDefs = gql`
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
