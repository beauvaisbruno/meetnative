import express from "express";
import * as functions from "firebase-functions";
import cors from "cors";

import { ApolloServer } from "apollo-server-express";

import { ConnectionContext } from "subscriptions-transport-ws";
import { GraphQLFormattedError } from "graphql";
import { resolvers } from "../../../google-app-engine/src/resolvers";
import { typeDefs } from "../../../google-app-engine/src/typeDefs";
import { firebase } from "../../../google-app-engine/src/firebase";

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  engine: {
    apiKey: "service:meetnative-club:YZu7r1MjmmhevlWeemYMWg"
  },
  introspection: true,
  subscriptions: {
    async onConnect(connectionParams: any, websocket, wsContext) {
      // console.log("subscriptions onConnect: ", connectionParams);
      const decodedIdToken = await firebase
        .auth()
        .verifyIdToken(connectionParams.authorization);
      const user = await firebase.auth().getUser(decodedIdToken.uid);
      return { user };
    },
    onDisconnect(websocket: any, context: ConnectionContext) {
      // console.log("subscriptions onDisconnect");
    }
  },
  formatError: (error): GraphQLFormattedError => {
    console.log(error);
    return error;
  },
  // @ts-ignore
  context: async ({ req, res, connection }) => {
    try {
      if (connection) {
        // check connection for metadata
        return connection.context;
      }
      const authorization = req.headers.authorization;
      if (!authorization) throw Error("Must be authenticated");
      const token = authorization!.split("Bearer ")[1];
      const decodedIdToken = await firebase.auth().verifyIdToken(token);
      const user = await firebase.auth().getUser(decodedIdToken.uid);
      return { user };
    } catch (error) {
      return { error };
    }
  }
});

const app = express();
app.use(cors());
apolloServer.applyMiddleware({ app, path: "/" });

//https://dev.to/splodingsocks/getting-all-404s-with-your-firebase-functions-3p1
const firebasePathPatch = (app: any) => (req: any, res: any) => {
  if (!req.path) req.url = "/" + req.url;
  return app(req, res);
};

//Subscription doesn't work
export const graphql = functions.https.onRequest(firebasePathPatch(app));
