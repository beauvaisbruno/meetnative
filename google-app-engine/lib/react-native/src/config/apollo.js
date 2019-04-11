"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_client_1 = require("apollo-client");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_http_1 = require("apollo-link-http");
const apollo_link_error_1 = require("apollo-link-error");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const redux_1 = require("./redux");
const react_native_firebase_1 = __importDefault(
  require("react-native-firebase")
);
const apollo_link_context_1 = require("apollo-link-context");
const apollo_link_1 = require("apollo-link");
const apollo_utilities_1 = require("apollo-utilities");
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const react_native_1 = require("react-native");
const apollo_cache_persist_1 = require("apollo-cache-persist");
// import storage from "redux-persist/es/storage";
const PartnersScreen_1 = require("../components/partners/PartnersScreen");
const typeDefs = graphql_tag_1.default`
  directive @client on FIELD
  extend type Query {
    getUserProfile: Profile!
  }
`;
const errorLink = apollo_link_error_1.onError(errors => {
  console.log("[errorLink:", errors);
});
// @ts-ignore
const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  apollo_link_1.ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = apollo_utilities_1.getMainDefinition(query);
      // if (kind === "OperationDefinition" && operation === "subscription")
      // console.log("requestLink: ", getMainDefinition(query));
      return kind === "OperationDefinition" && operation === "subscription";
    },
    subscriptionLink,
    queryOrMutationLink
  );
exports.cache = new apollo_cache_inmemory_1.InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: false,
  fragmentMatcher: {
    match: ({ id }, typeCond, context) => !!context.store.get(id)
  }
});
const resolvers = {
  Query: {
    getUserProfile: (parent, args, context) => {
      const data = Object.assign(
        {},
        redux_1.store.getState().profile.profileLoad.data
      );
      console.log("resolvers: ", data);
      return data;
    }
  }
};
async function getTokenOrUndefined() {
  const user = react_native_firebase_1.default.auth().currentUser;
  let token = undefined;
  if (user) token = await user.getIdToken();
  return token;
}
const authLink = apollo_link_context_1.setContext(async (_, { headers }) => {
  try {
    console.log(
      "authLink connectionParams: ",
      react_native_firebase_1.default.auth().currentUser.uid
    );
    const token = await getTokenOrUndefined();
    return {
      headers: Object.assign({}, headers, {
        authorization: token ? "Bearer " + token : ""
      })
    };
  } catch (error) {
    console.log("error: ", error);
  }
  return {
    headers: Object.assign({}, headers)
  };
});
const queryOrMutationLink = authLink.concat(
  apollo_link_http_1.createHttpLink({
    // uri: "http://192.168.43.100:5000/fire-redux-85834/us-central1/graphql/"
    // uri: "http://192.168.43.100:8080"
    // uri: "https://firestore-graphql.appspot.com",
    uri: "https://fire-redux-85834.appspot.com"
    // uri: "https://us-central1-fire-redux-85834.cloudfunctions.net/graphql/"
  })
);
exports.subscriptionClient = new subscriptions_transport_ws_1.SubscriptionClient(
  // "ws://192.168.43.100:5000/fire-redux-85834/us-central1/graphql/",
  // "ws://192.168.43.100:8080/graphql",
  // "wss://firestore-graphql.appspot.com/graphql",
  "wss://fire-redux-85834.appspot.com/graphql",
  {
    lazy: true,
    reconnect: true,
    connectionParams: async () => {
      return {
        authorization: await getTokenOrUndefined()
      };
    }
  }
);
exports.client = new apollo_client_1.ApolloClient({
  link: apollo_link_1.ApolloLink.from([
    // reduxLink,
    errorLink,
    // queryOrMutationLink
    requestLink({
      queryOrMutationLink,
      subscriptionLink: new apollo_link_ws_1.WebSocketLink(
        exports.subscriptionClient
      )
    })
  ]),
  cache: exports.cache,
  // typeDefs,
  // @ts-ignore
  resolvers
});
exports.cache.writeData({
  data: { getUserProfile: null }
});
function* initApollo() {
  try {
    yield apollo_cache_persist_1.persistCache({
      cache: exports.cache,
      // @ts-ignore
      storage: react_native_1.AsyncStorage
      // debug: true
    });
    // logAsyncStorage();
    const userProfile = redux_1.store.getState().profile.profileLoad.data;
    console.log("user: redux=>apollo cache: ", userProfile);
    if (userProfile)
      exports.cache.writeQuery({
        query: PartnersScreen_1.getUserProfile,
        data: { getUserProfile: userProfile }
      });
  } catch (error) {
    console.log("error: ", error);
  }
}
exports.initApollo = initApollo;
//# sourceMappingURL=apollo.js.map
