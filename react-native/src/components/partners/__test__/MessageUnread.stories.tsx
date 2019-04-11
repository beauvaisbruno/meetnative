import {
  baseDecorator,
  storeBaseAndNavigatorDecorator
} from "../../../utils/decorators";
import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { PartnersList } from "../PartnersList";
import { MockedProvider } from "react-apollo/test-utils";
import {
  createCache,
  mockLastMessageProfileWithIds
} from "../../../utils/mocks";

const now = Date.now();
const oldestMessage = mockLastMessageProfileWithIds({
  lastReadTime: now - 1,
  lastMsgReceivedTime: now - 2
});
const newestMessage = mockLastMessageProfileWithIds({
  id: "newestMessageId",
  lastReadTime: now - 1,
  lastMsgReceivedTime: now
});
const userProfile = oldestMessage.recipient;
const contactProfile = oldestMessage.author;
const props = {
  userProfile
};

storiesOf("PartnersList", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  // @ts-ignore
  .add("default", () => (
    <MockedProvider {...{ mocks: [], cache: createCache() }}>
      <PartnersList {...props} />
    </MockedProvider>
  ))
  .add("loading", () => (
    <MockedProvider {...{ mocks: [], cache: createCache() }}>
      <PartnersList {...{ ...props, stories: { loading: true } }} />
    </MockedProvider>
  ));
