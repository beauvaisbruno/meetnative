"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyIdToken = jest.fn();
const getUser = jest.fn();
jest.mock("../firebase", () => {
  return {
    firebase: { auth: () => ({ verifyIdToken, getUser }) }
  };
});
const apollo_1 = require("../apollo");
describe("apollo", () => {
  it("subscription", async () => {
    verifyIdToken.mockReturnValue({ uid: "uid" });
    getUser.mockReturnValue("user");
    const res = await apollo_1.subscriptionsDef.onConnect(
      { authorization: "authorization" },
      undefined,
      undefined
    );
    expect(verifyIdToken).toBeCalledWith("authorization");
    expect(getUser).toBeCalledWith("uid");
    expect(res).toEqual({ user: "user" });
  });
  it("context", async () => {
    let res = await apollo_1.contextDef({
      connection: { context: "context" },
      req: undefined,
      res: undefined
    });
    expect(res).toEqual("context");
    verifyIdToken.mockReturnValue({ uid: "uid" });
    getUser.mockReturnValue("user");
    res = await apollo_1.contextDef({
      req: { headers: { authorization: "Bearer authorization" } },
      connection: undefined,
      res: undefined
    });
    expect(verifyIdToken).toBeCalledWith("authorization");
    expect(getUser).toBeCalledWith("uid");
    expect(res).toEqual({ user: "user" });
  });
});
//# sourceMappingURL=apollo.test.js.map
