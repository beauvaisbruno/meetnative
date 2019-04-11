"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const firebase_1 = require("./firebase");
exports.contextDef = async ({ req, res, connection }) => {
  if (connection)
    // Connection metadata concern subscription over websocket
    return connection.context;
  const authorization = req.headers.authorization;
  if (!authorization) throw Error("Must be authenticated");
  const token = authorization.split("Bearer ")[1];
  const decodedIdToken = await firebase_1.firebase.auth().verifyIdToken(token);
  const user = await firebase_1.firebase.auth().getUser(decodedIdToken.uid);
  return { user };
};
exports.subscriptionsDef = {
  async onConnect(connectionParams, websocket, wsContext) {
    const decodedIdToken = await firebase_1.firebase
      .auth()
      .verifyIdToken(connectionParams.authorization);
    const user = await firebase_1.firebase.auth().getUser(decodedIdToken.uid);
    return { user };
  },
  onDisconnect(websocket, context) {
    // console.log("subscriptions onDisconnect");
  }
};
exports.createApolloServer = (
  context = exports.contextDef,
  subscriptions = exports.subscriptionsDef
) =>
  new apollo_server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: typeDefs_1.typeDefs,
    introspection: true,
    subscriptions,
    formatError: error => {
      console.log(error);
      return error;
    },
    context
  });
//# sourceMappingURL=apollo.js.map
