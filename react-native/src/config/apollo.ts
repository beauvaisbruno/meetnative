import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import gql from "graphql-tag";
import { store } from "./redux";
import firebase from "react-native-firebase";
import { setContext } from "apollo-link-context";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { AsyncStorage } from "react-native";
import { persistCache } from "apollo-cache-persist";
import { getUserProfile } from "../components/partners/PartnersScreen";

const typeDefs = gql`
  directive @client on FIELD
  extend type Query {
    getUserProfile: Profile!
  }
`;
const errorLink = onError((errors: any) => {
  console.log("[errorLink:", errors);
});

// @ts-ignore
const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    subscriptionLink,
    queryOrMutationLink
  );

export const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: false,
  fragmentMatcher: {
    match: ({ id }, typeCond, context) => !!context.store.get(id)
  }
});
const resolvers = {
  Query: {
    getUserProfile: (
      parent: any,
      args: any,
      context: { cache: InMemoryCache }
    ) => {
      const data = {
        ...store.getState().profile.profileLoad.data
      };
      return data;
    }
  }
};

async function getTokenOrUndefined() {
  const user = firebase.auth().currentUser;
  let token: String | undefined;
  if (user) token = await user.getIdToken();
  return token;
}

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await getTokenOrUndefined();
    return {
      headers: {
        ...headers,
        authorization: token ? "Bearer " + token : ""
      }
    };
  } catch (error) {
    console.log("error: ", error);
  }
  return {
    headers: { ...headers }
  };
});
const queryOrMutationLink = authLink.concat(
  createHttpLink({
    // uri: "http://localhost:8080"
    uri: "https://fire-redux-85834.appspot.com"
    // uri: "https://us-central1-fire-redux-85834.cloudfunctions.net/graphql/"
  })
);
export const subscriptionClient = new SubscriptionClient(
  // "ws://localhost:8080/graphql",
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
export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    requestLink({
      queryOrMutationLink,
      subscriptionLink: new WebSocketLink(subscriptionClient)
    })
  ]),
  cache,
  // @ts-ignore
  resolvers
});

cache.writeData({
  data: { getUserProfile: null }
});

export function* initApollo() {
  try {
    yield persistCache({
      cache,
      // @ts-ignore
      storage: AsyncStorage
      // debug: true
    });
    const userProfile = store.getState().profile.profileLoad.data;
    if (userProfile)
      cache.writeQuery({
        query: getUserProfile,
        data: { getUserProfile: userProfile }
      });
  } catch (error) {
    console.log("error: ", error);
  }
}
