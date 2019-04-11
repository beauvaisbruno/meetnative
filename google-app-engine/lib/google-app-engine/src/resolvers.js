"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const graphql_subscriptions_1 = require("graphql-subscriptions");
// @ts-ignore
const graphql_type_long_1 = __importDefault(require("graphql-type-long"));
// @ts-ignore
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const withUnsubscribe_1 = require("./withUnsubscribe");
const apollo_server_1 = require("apollo-server");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
  JSON: graphql_type_json_1.default,
  Long: graphql_type_long_1.default,
  Mutation: {
    async setLastMessageRead(_, { recipientId, authorId }, { user }) {
      if (recipientId !== user.uid)
        throw new Error(
          "setLastMessageRead, Not authorized request " +
            recipientId +
            " " +
            user.uid
        );
      const message = await firebase_1.getLastMessage(recipientId, authorId);
      if (
        !(await firebase_1.updateMessage(message.id, {
          lastReadTime: Date.now()
        }))
      )
        throw Error("setLastMessageRead, writing error");
      return await firebase_1.getLastMessageById(message.id);
    }
  },
  Query: {
    async getLastMessages(_, { recipientId }, context) {
      const { user } = context;
      try {
        if (recipientId !== user.uid)
          throw new apollo_server_1.AuthenticationError(
            "LastMessages: Not authorized request " +
              recipientId +
              " " +
              user.uid
          );
        const objects = await firebase_1.getLastMessages(recipientId);
        return objects;
      } catch (error) {
        console.log("error: ", error);
        throw new apollo_server_1.ApolloError(error);
      }
    }
  },
  LastMessage: {
    async recipient(lastMessage) {
      const recipient = await firebase_1.getProfile(lastMessage.recipientId);
      return (
        recipient || new apollo_server_1.ValidationError("User ID not found")
      );
    },
    async author(lastMessage) {
      const author = await firebase_1.getProfile(lastMessage.authorId);
      return author || new apollo_server_1.ValidationError("User ID not found");
    }
  },
  Subscription: {
    getLastMessagesSync: {
      subscribe: (payload, args, context) => {
        try {
          const recipientId = args.recipientId;
          if (recipientId !== context.user.uid)
            throw new apollo_server_1.AuthenticationError(
              "getLastMessagesSync: Not authorized request " +
                recipientId +
                " " +
                context.user.uid
            );
          const unsubscriber = firebase_1.firestore
            .collection("lastMessages")
            .where("recipientId", "==", recipientId)
            .onSnapshot(function(querySnapshot) {
              const lastMessages = [];
              querySnapshot.forEach(function(doc) {
                lastMessages.push(doc.data());
              });
              pubsub.publish("getLastMessagesSync." + recipientId, {
                getLastMessagesSync: lastMessages
              });
            });
          return withUnsubscribe_1.withUnsubscribe(
            pubsub.asyncIterator("getLastMessagesSync." + recipientId),
            unsubscriber
          );
        } catch (error) {
          console.log("error: ", error);
          throw new apollo_server_1.ApolloError(error);
        }
      }
    }
  }
};
//# sourceMappingURL=resolvers.js.map
