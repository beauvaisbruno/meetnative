"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../../../react-native/jest/testUtils");
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
const apollo_1 = require("../apollo");
const apollo_server_testing_1 = require("apollo-server-testing");
const partnersTypes_1 = require("../../../react-native/src/components/partners/partnersTypes");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const mocks_1 = require("../../../react-native/src/utils/mocks");
describe("resolvers", () => {
  const context = jest.fn();
  const { query, mutate } = apollo_server_testing_1.createTestClient(
    // @ts-ignore
    apollo_1.createApolloServer(context, jest.fn())
  );
  it("query error", async () => {
    context.mockReturnValue({ user: { uid: "notUserId" } });
    const res = await query({
      query: graphql_tag_1.default`
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
      query: graphql_tag_1.default`
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
    const before = testUtils_1.mockDate();
    context.mockReturnValue({ user: { uid: "userId" } });
    const mockProfile1 = mocks_1.mockProfile();
    getProfile.mockReturnValue(mockProfile1);
    const mockLastMessage1 = mocks_1.mockLastMessage();
    const mockLastMessage2 = mocks_1.mockLastMessage();
    getLastMessage.mockReturnValue(mockLastMessage1);
    updateMessage.mockReturnValue(true);
    getLastMessageById.mockReturnValue(mockLastMessage2);
    const after = testUtils_1.mockDate(before + 1);
    const res = await mutate({
      query: graphql_tag_1.default`
        mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {
          setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {
            ...lastMessagesFields
          }
        }
        ${partnersTypes_1.lastMessagesFields}
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
    testUtils_1.unMockDate();
  });
  it("query", async () => {
    context.mockReturnValue({ user: { uid: "userId" } });
    const mockLastMessage1 = mocks_1.mockLastMessage();
    getLastMessages.mockReturnValue([mockLastMessage1]);
    const mockProfile1 = mocks_1.mockProfile();
    getProfile.mockReturnValue(mockProfile1);
    const res = await query({
      query: graphql_tag_1.default`
        query getLastMessages($userId: ID!) {
          getLastMessages(recipientId: $userId) {
            ...lastMessagesFields
          }
        }
        ${partnersTypes_1.lastMessagesFields}
      `,
      // @ts-ignore
      variables: { userId: "userId" }
    });
    expect(res.data.getLastMessages[0].id).toBe(mockLastMessage1.id);
    expect(res.data.getLastMessages[0].author.id).toBe(mockProfile1.id);
    expect(res.data.getLastMessages[0].recipient.id).toBe(mockProfile1.id);
  });
});
//# sourceMappingURL=resolvers.test.js.map
