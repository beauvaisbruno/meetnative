import { mount, shallow } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { MessageUnread } from "../MessageUnread";

import * as React from "react";

import { PartnerRow } from "../PartnerRow";
import toJson from "enzyme-to-json";
import { expectTestIDPropExists, mockDate } from "../../../../jest/testUtils";
import {
  mockLastMessageProfile,
  mockLastMessageProfileWithIds,
  mockProfile
} from "../../../utils/mocks";
// @ts-ignore
import jsdom from "../../../../jsdom";

const now = mockDate();
const message = mockLastMessageProfileWithIds();
const userProfile = message.recipient;
const contactProfile = message.author;

const navigate = jest.fn();

const props = {
  userProfile,
  message,
  navigation: { navigate }
};

describe("PartnerRow", () => {
  it("unread message", () => {
    message.lastReadTime = now;
    message.lastMsgReceivedTime = now + 1;
    // @ts-ignore
    const tree = shallow(<PartnerRow {...props} />);
    tree
      .find("Styled(Button)")
      .props()
      // @ts-ignore
      .onPress();
    expect(navigate).toBeCalledWith("RoomScreen", {
      contactProfile
    });
    expectTestIDPropExists(tree, "MessageUnread");
  });
  it("already read message", () => {
    message.lastReadTime = now + 1;
    message.lastMsgReceivedTime = now;
    // @ts-ignore
    const tree = shallow(<PartnerRow {...props} />);
    tree
      .find("Styled(Button)")
      .props()
      // @ts-ignore
      .onPress();

    expect(navigate).toBeCalledWith("RoomScreen", {
      contactProfile
    });
    expectTestIDPropExists(tree, "lastMessageRead");
  });
});
