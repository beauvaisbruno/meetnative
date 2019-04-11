import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { firebase } from "./firebase";
import { ConnectionContext } from "subscriptions-transport-ws";
import { GraphQLFormattedError } from "graphql";

export const contextDef = async ({ req, res, connection }) => {
  if (connection)
    // Connection metadata concern subscription over websocket
    return connection.context;
  const authorization = req.headers.authorization;
  if (!authorization) throw Error("Must be authenticated");
  const token = authorization!.split("Bearer ")[1];
  const decodedIdToken = await firebase.auth().verifyIdToken(token);
  const user = await firebase.auth().getUser(decodedIdToken.uid);
  return { user };
};

export const subscriptionsDef = {
  async onConnect(connectionParams: any, websocket, wsContext) {
    const decodedIdToken = await firebase
      .auth()
      .verifyIdToken(connectionParams.authorization);
    const user = await firebase.auth().getUser(decodedIdToken.uid);
    return { user };
  },
  onDisconnect(websocket: any, context: ConnectionContext) {
    // console.log("subscriptions onDisconnect");
  }
};

export const createApolloServer = (
  context = contextDef,
  subscriptions = subscriptionsDef
) =>
  new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
    subscriptions,
    formatError: (error): GraphQLFormattedError => {
      console.log(error);
      return error;
    },
    context
  });
