import {
  firestore,
  getLastMessage,
  getLastMessageById,
  getLastMessages,
  getProfile,
  updateMessage
} from "./firebase";
import { PubSub } from "graphql-subscriptions";
// @ts-ignore
import GraphQLLong from "graphql-type-long";
// @ts-ignore
import GraphQLJSON from "graphql-type-json";
import * as admin from "firebase-admin";
import { withUnsubscribe } from "./withUnsubscribe";
import UserRecord = admin.auth.UserRecord;
import {
  ApolloError,
  AuthenticationError,
  ValidationError
} from "apollo-server";

import { IProfile } from "../../react-native/src/rootReducers";
import { ILastMessage } from "../../react-native/src/components/partners/partnersTypes";

const pubsub = new PubSub();

export const resolvers = {
  JSON: GraphQLJSON,
  Long: GraphQLLong,
  Mutation: {
    async setLastMessageRead(
      _: null,
      { recipientId, authorId }: { recipientId: string; authorId: string },
      { user }: { user: UserRecord }
    ) {
      if (recipientId !== user.uid)
        throw new Error(
          "setLastMessageRead, Not authorized request " +
            recipientId +
            " " +
            user.uid
        );
      const message = (await getLastMessage(
        recipientId,
        authorId
      )) as ILastMessage;
      if (
        !(await updateMessage(message.id, {
          lastReadTime: Date.now()
        }))
      )
        throw Error("setLastMessageRead, writing error");
      return await getLastMessageById(message.id);
    }
  },
  Query: {
    async getLastMessages(
      _: null,
      { recipientId }: { recipientId: string },
      context: any
    ) {
      const { user } = context;
      try {
        if (recipientId !== user.uid)
          throw new AuthenticationError(
            "LastMessages: Not authorized request " +
              recipientId +
              " " +
              user.uid
          );
        const objects = await getLastMessages(recipientId);
        return objects as ILastMessage[];
      } catch (error) {
        console.log("error: ", error);
        throw new ApolloError(error);
      }
    }
  },
  LastMessage: {
    async recipient(lastMessage: ILastMessage) {
      const recipient = await getProfile(lastMessage.recipientId);
      return (
        (recipient as IProfile) || new ValidationError("User ID not found")
      );
    },
    async author(lastMessage: ILastMessage) {
      const author = await getProfile(lastMessage.authorId);
      return (author as IProfile) || new ValidationError("User ID not found");
    }
  },
  Subscription: {
    getLastMessagesSync: {
      subscribe: (payload: any, args: any, context: any) => {
        try {
          const recipientId = args.recipientId;
          if (recipientId !== context.user.uid)
            throw new AuthenticationError(
              "getLastMessagesSync: Not authorized request " +
                recipientId +
                " " +
                context.user.uid
            );
          const unsubscriber = firestore
            .collection("lastMessages")
            .where("recipientId", "==", recipientId)
            .onSnapshot(function(querySnapshot) {
              const lastMessages: ILastMessage[] = [];
              querySnapshot.forEach(function(doc) {
                lastMessages.push(doc.data() as ILastMessage);
              });
              pubsub.publish("getLastMessagesSync." + recipientId, {
                getLastMessagesSync: lastMessages
              });
            });
          return withUnsubscribe(
            pubsub.asyncIterator("getLastMessagesSync." + recipientId),
            unsubscriber
          );
        } catch (error) {
          console.log("error: ", error);
          throw new ApolloError(error);
        }
      }
    }
  }
};
