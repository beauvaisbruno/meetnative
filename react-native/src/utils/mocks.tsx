import { InMemoryCache } from "apollo-cache-inmemory";
import { ILastMessage, ILastMessageProfiles } from "../components/partners/partnersTypes";
import { IProfile } from "../rootReducers";
import merge from "deepmerge";

export const createCache = (config = {}) =>
  new InMemoryCache({
    dataIdFromObject: o => o.id,
    addTypename: false,
    fragmentMatcher: {
      match: ({ id }, typeCond, context) => !!context.store.get(id)
    },
    ...config
  });

export function mockLastMessage(props: any = {}): ILastMessage {
  const now = Date.now();
  const recipientId = "recipientId";
  const authorId = "authorId";
  const prev: ILastMessage = {
    id: authorId + "-" + recipientId,
    recipientId,
    lastReadTime: now,
    lastMsgReceived:
      "A Long message received. A Long message received. A Long message received. A Long message received",
    lastMsgReceivedTime: now - 1,
    authorId
  };
  return { ...prev, ...props };
}

export function mockLastMessageWithIds(
  authorId = "authorId",
  recipientId = "recipientId",
  props: any = {}
): ILastMessage {
  const now = Date.now();
  const prev: ILastMessage = {
    id: authorId + "-" + recipientId,
    recipientId,
    authorId,
    lastReadTime: now,
    lastMsgReceived:
      "A Long message received. A Long message received. A Long message received. A Long message received",
    lastMsgReceivedTime: now - 1
  };
  return { ...prev, ...props };
}

export function mockLastMessageProfile(props: any = {}): ILastMessageProfiles {
  const lastMessage = mockLastMessage(props);
  const prev: ILastMessageProfiles = {
    ...lastMessage,
    author: mockProfile({ id: lastMessage.authorId }),
    recipient: mockProfile({ id: lastMessage.recipientId })
  };
  return merge(prev, props);
}

export function mockLastMessageProfileWithIds(
  props: any = {},
  authorId = "authorId",
  recipientId = "recipientId"
): ILastMessageProfiles {
  const lastMessage = mockLastMessageWithIds(authorId, recipientId);
  const prev: ILastMessageProfiles = {
    ...lastMessage,
    author: mockProfile({ id: lastMessage.authorId }),
    recipient: mockProfile({ id: lastMessage.recipientId })
  };
  return merge(prev, props);
}

export function mockProfile(props: any = {}): IProfile {
  const prev: IProfile = {
    id: "id",
    pseudo: "Maëlle",
    isMale: false,
    langsToLearn: {
      english: "beginner",
      french: "fluent",
      german: "intermediate"
    },
    profession: "Legal Assistant",
    city: "Genève",
    geohash: 872962206,
    langsToTeach: {
      french: "fluent",
      italian: "bilingual",
      spanish: "native"
    },
    lon: 6.107057129141845,
    avatar: "pelican",
    lat: 46.08995392215012,
    age: 23
  };
  return { ...prev, ...props };
}
