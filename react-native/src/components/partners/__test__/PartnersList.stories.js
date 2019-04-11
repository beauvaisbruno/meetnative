"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../../utils/decorators");
const react_native_1 = require("@storybook/react-native");
const React = __importStar(require("react"));
const PartnersList_1 = require("../PartnersList");
const mocks_1 = require("../../../utils/mocks");
const now = Date.now();
const oldestMessage = mocks_1.mockLastMessageProfileWithIds({
    lastReadTime: now - 1,
    lastMsgReceivedTime: now - 2
});
const newestMessage = mocks_1.mockLastMessageProfileWithIds({
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
            query: PartnersList_1.getLastMessages,
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
react_native_1.storiesOf("PartnersList", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    .add("default", () => (React.createElement(decorators_1.MockedApollo, { mocks: [
        {
            q: PartnersList_1.getLastMessages,
            v: { userId: userProfile.id },
            r: { getLastMessages: [oldestMessage, newestMessage] }
        },
        {
            q: PartnersList_1.getLastMessagesSync,
            v: { userId: userProfile.id },
            r: { getLastMessagesSync: [oldestMessage, newestMessage] }
        }
    ] },
    React.createElement(PartnersList_1.PartnersList, Object.assign({}, props)))))
    .add("empty", () => (React.createElement(decorators_1.MockedApollo, { mocks: [
        {
            q: PartnersList_1.getLastMessages,
            v: { userId: userProfile.id },
            r: { getLastMessages: [] }
        },
        {
            q: PartnersList_1.getLastMessagesSync,
            v: { userId: userProfile.id },
            r: { getLastMessagesSync: [] }
        }
    ] },
    React.createElement(PartnersList_1.PartnersList, Object.assign({}, props)))))
    .add("error", () => (React.createElement(decorators_1.MockedApollo, { mocks: [
        {
            q: PartnersList_1.getLastMessages,
            v: { userId: userProfile.id },
            e: true
        }
    ] },
    React.createElement(PartnersList_1.PartnersList, Object.assign({}, props)))));
