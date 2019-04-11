import { mockDate, unMockDate } from "../../../react-native/jest/testUtils";

const getLastMessages = jest.fn();
const getProfile = jest.fn();
const getLastMessageById = jest.fn();
const getLastMessage = jest.fn();
const updateMessage = jest.fn();
jest.mock("../firebase", () => {
  return {
    getLastMessages,
    getProfile,
    getLastMessageById,
    getLastMessage,
    updateMessage
  };
});

import { createApolloServer } from "../apollo";
import { createTestClient } from "apollo-server-testing";
import { lastMessagesFields } from "../../../react-native/src/components/partners/partnersTypes";
import gql from "graphql-tag";
import {
  mockLastMessage,
  mockProfile
} from "../../../react-native/src/utils/mocks";

describe("resolvers", () => {
  const context = jest.fn();
  const { query, mutate } = createTestClient(
    // @ts-ignore
    createApolloServer(context, jest.fn())
  );
  it("query error", async () => {
    context.mockReturnValue({ user: { uid: "notUserId" } });
    const res = await query({
      query: gql`
        query getLastMessages($userId: ID!) {
          getLastMessages(recipientId: $userId) {
            id
          }
        }
      `,
      // @ts-ignore
      variables: { userId: "userId" }
    });
    expect(res.errors[0]).toBeDefined();
  });
  it("mutate error", async () => {
    context.mockReturnValue({ user: { uid: "notUserId" } });
    const res = await query({
      query: gql`
        mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {
          setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {
            id
          }
        }
      `,
      // @ts-ignore
      variables: { userId: "userId" }
    });
    expect(res.errors[0]).toBeDefined();
  });
  it("mutate", async () => {
    const before = mockDate();
    context.mockReturnValue({ user: { uid: "userId" } });
    const mockProfile1 = mockProfile();
    getProfile.mockReturnValue(mockProfile1);
    const mockLastMessage1 = mockLastMessage();
    const mockLastMessage2 = mockLastMessage();
    getLastMessage.mockReturnValue(mockLastMessage1);
    updateMessage.mockReturnValue(true);
    getLastMessageById.mockReturnValue(mockLastMessage2);
    const after = mockDate(before + 1);
    const res = await mutate({
      query: gql`
        mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {
          setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {
            ...lastMessagesFields
          }
        }
        ${lastMessagesFields}
      `,
      // @ts-ignore
      variables: { recipientId: "userId", authorId: "authorId" }
    });
    expect(updateMessage).toBeCalledWith(mockLastMessage1.id, {
      lastReadTime: after
    });
    expect(res.data.setLastMessageRead.id).toBe(mockLastMessage2.id);
    expect(res.data.setLastMessageRead.author.id).toBe(mockProfile1.id);
    expect(res.data.setLastMessageRead.recipient.id).toBe(mockProfile1.id);
    unMockDate();
  });
  it("query", async () => {
    context.mockReturnValue({ user: { uid: "userId" } });
    const mockLastMessage1 = mockLastMessage();
    getLastMessages.mockReturnValue([mockLastMessage1]);
    const mockProfile1 = mockProfile();
    getProfile.mockReturnValue(mockProfile1);

    const res = await query({
      query: gql`
        query getLastMessages($userId: ID!) {
          getLastMessages(recipientId: $userId) {
            ...lastMessagesFields
          }
        }
        ${lastMessagesFields}
      `,
      // @ts-ignore
      variables: { userId: "userId" }
    });
    expect(res.data.getLastMessages[0].id).toBe(mockLastMessage1.id);
    expect(res.data.getLastMessages[0].author.id).toBe(mockProfile1.id);
    expect(res.data.getLastMessages[0].recipient.id).toBe(mockProfile1.id);
  });
});
