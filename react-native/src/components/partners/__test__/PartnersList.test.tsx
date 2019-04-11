import { View } from "react-native";

const PartnerRowMock = jest.fn(props => (
  <View testID="PartnerRow" {...props} />
));
jest.mock("../PartnerRow", () => PartnerRowMock);

import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import * as React from "react";
import toJson from "enzyme-to-json";
import {
  expectExists,
  expectTestIDPropExists,
  mockDate
} from "../../../../jest/testUtils";
import PartnersListFcts, {
  getLastMessages,
  getLastMessagesSync,
  PartnersList
} from "../PartnersList";
import { defaultProfileData } from "../../profile/profileReducer";
import wait from "waait";
import {
  createCache,
  mockLastMessageProfileWithIds
} from "../../../utils/mocks";

import jsdom from "../../../../jest/jsdom";
jsdom();
const oldTime = mockDate();
const oldestMessage = mockLastMessageProfileWithIds({
  lastMsgReceived: "oldMsg"
});
const recentTime = mockDate(oldTime + 1);
const newestMessage = mockLastMessageProfileWithIds({
  lastMsgReceived: "newMsg",
  id: "newestMessageId"
});
const userProfile = oldestMessage.recipient;
const contactProfile = oldestMessage.author;
const userProfileId = userProfile.id;
const contactProfileId = contactProfile.id;
const props = {
  userProfile
};

describe("PartnerList", () => {
  it("loading and error", async () => {
    const mocks = [
      {
        request: {
          query: getLastMessages,
          variables: {
            userId: userProfileId
          }
        },
        result: {
          errors: [{ message: "Error!" }]
        }
      }
    ];
    const tree = mount(
      <MockedProvider {...{ mocks, cache: createCache() }}>
        {<PartnersList {...props} />}
      </MockedProvider>
    );
    expect(toJson(tree)).toMatchSnapshot();
    await wait(1);
    tree.update();
    expect(toJson(tree)).toMatchSnapshot();
    expectTestIDPropExists(tree, "error");
  });
  it("no partner yet and subscribe", async () => {
    const subscribe = jest.fn();
    PartnersListFcts.subscribe = subscribe;
    const mocks = [
      {
        request: {
          query: getLastMessages,
          variables: {
            userId: userProfileId
          }
        },
        result: {
          data: {
            getLastMessages: []
          }
        }
      }
    ];
    const tree = mount(
      <MockedProvider mocks={mocks}>
        {<PartnersList {...props} />}
      </MockedProvider>
    );
    await wait(1);
    tree.update();
    // expect(toJson(tree)).toMatchSnapshot();
    expectTestIDPropExists(tree, "noPartner");
    const subscribeOptions = subscribe.mock.calls[0][1];
    expect(subscribeOptions.document).toEqual(getLastMessagesSync);
    expect(subscribeOptions.variables).toEqual({ userId: userProfile.id });
    expect(
      subscribeOptions.updateQuery(
        {},
        {
          subscriptionData: {
            data: { getLastMessagesSync: "getLastMessagesSync" }
          }
        }
      )
    ).toEqual({ getLastMessages: "getLastMessagesSync" });
  });
  it("query success", async () => {
    const mocks = [
      {
        request: {
          query: getLastMessages,
          variables: {
            userId: userProfileId
          }
        },
        result: {
          data: {
            getLastMessages: [oldestMessage, newestMessage]
          }
        }
      }
    ];
    const tree = mount(
      <MockedProvider {...{ mocks, cache: createCache() }}>
        {<PartnersList {...props} />}
      </MockedProvider>
    );
    await wait(1);
    tree.update();
    // expect(toJson(tree)).toMatchSnapshot();
    expect(PartnerRowMock.mock.calls[0][0].message.lastMsgReceived).toBe(
      "newMsg"
    );
    expect(PartnerRowMock.mock.calls[0][0].userProfile).toBe(userProfile);
    expect(PartnerRowMock.mock.calls[1][0].message.lastMsgReceived).toBe(
      "oldMsg"
    );
  });
});
