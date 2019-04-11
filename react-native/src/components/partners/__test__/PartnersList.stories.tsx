import {
  MockedApollo,
  storeBaseAndNavigatorDecorator
} from "../../../utils/decorators";
import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import {
  getLastMessages,
  getLastMessagesSync,
  PartnersList
} from "../PartnersList";
import { MockedProvider } from "react-apollo/test-utils";
import { View, Text } from "native-base";
import { mockLastMessageProfileWithIds } from "../../../utils/mocks";

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

const mocks = [
  {
    request: {
      query: getLastMessages,
      variables: {
        userId: userProfile.id
      }
    },
    result: {
      data: {
        getLastMessages: [oldestMessage, newestMessage]
      }
    }
  }
];

// const mocksEmpty = [
//   {
//     request: {
//       query: getLastMessages,
//       variables: {
//         userId: userProfile.id
//       }
//     },
//     result: {
//       data: {
//         getLastMessages: []
//       }
//     }
//   }
// ];
// const mocksError = [
//   {
//     request: {
//       query: getLastMessages,
//       variables: {
//         userId: userProfile.id
//       }
//     },
//     result: {
//       errors: [{ message: "Error!" }]
//     }
//   }
// ];
//
// const mocks = {
//   Query: () => {
//     return {
//       getLastMessages: () => {
//         return [oldestMessage, newestMessage];
//       }
//     };
//   }
// };

storiesOf("PartnersList", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  .add("default", () => (
    <MockedApollo
      mocks={[
        {
          q: getLastMessages,
          v: { userId: userProfile.id },
          r: { getLastMessages: [oldestMessage, newestMessage] }
        },
        {
          q: getLastMessagesSync,
          v: { userId: userProfile.id },
          r: { getLastMessagesSync: [oldestMessage, newestMessage] }
        }
      ]}
    >
      <PartnersList {...props} />
    </MockedApollo>
  ))
  .add("empty", () => (
    <MockedApollo
      mocks={[
        {
          q: getLastMessages,
          v: { userId: userProfile.id },
          r: { getLastMessages: [] }
        },
        {
          q: getLastMessagesSync,
          v: { userId: userProfile.id },
          r: { getLastMessagesSync: [] }
        }
      ]}
    >
      <PartnersList {...props} />
    </MockedApollo>
  ))
  .add("error", () => (
    <MockedApollo
      mocks={[
        {
          q: getLastMessages,
          v: { userId: userProfile.id },
          e: true
        }
      ]}
    >
      <PartnersList {...props} />
    </MockedApollo>
  ));
