import jsdom from "../../../../jest/jsdom";
jsdom();
import { mount } from "enzyme";

import { MockedProvider } from "react-apollo/test-utils";
import * as React from "react";
import { MessageUnread, setLastMessageRead } from "../MessageUnread";
import toJson from "enzyme-to-json";
import { mockDate } from "../../../../jest/testUtils";

import { getLastMessages } from "../PartnersList";
import wait from "waait";
import gql from "graphql-tag";
import {
  createCache,
  mockLastMessageProfileWithIds
} from "../../../utils/mocks";
const now = mockDate();

const message = mockLastMessageProfileWithIds();
const userProfile = message.recipient;
const contactProfile = message.author;
const props = {
  size: 20,
  userProfile,
  contactProfile,
  message
};

describe("MessageUnread", () => {
  it("loading", () => {
    const tree = mount(
      <MockedProvider mocks={[]}>{<MessageUnread {...props} />}</MockedProvider>
    );
    expect(toJson(tree)).toMatchSnapshot();
    tree
      .find("Styled(Button)")
      .props()
      // @ts-ignore
      .onPress();
    tree.update();
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find("Styled(Icon)").props().name).toBe("spinner");
  });
  it("success", async () => {
    const cache = createCache();
    const mocks = [
      {
        request: {
          query: setLastMessageRead,
          variables: {
            recipientId: userProfile.id,
            authorId: contactProfile.id
          }
        },
        result: {
          data: {
            setLastMessageRead: {
              ...message,
              lastReadTime: Date.now() + 1
            }
          }
        }
      }
    ];
    const tree = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        {<MessageUnread {...props} />}
      </MockedProvider>
    );
    expect(toJson(tree)).toMatchSnapshot();

    const afterNow = mockDate(now + 1);
    const btn = tree.find("Styled(Button)");
    // @ts-ignore
    btn.props().onPress();
    await wait(1);
    tree.update();
    expect(toJson(tree)).toMatchSnapshot();
    const fragment: any = cache.readFragment({
      id: contactProfile.id + "-" + userProfile.id,
      fragment: gql`
        fragment _ on LastMessage {
          lastReadTime
        }
      `
    });
    expect(fragment.lastReadTime).toEqual(afterNow);
    expect(
      tree
        .find("Mutation")
        .props()
        // @ts-ignore
        .refetchQueries()
    ).toEqual([
      {
        query: getLastMessages,
        variables: {
          userId: userProfile.id
        }
      }
    ]);
  });
});
