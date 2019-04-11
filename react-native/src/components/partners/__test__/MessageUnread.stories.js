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
const test_utils_1 = require("react-apollo/test-utils");
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
react_native_1.storiesOf("PartnersList", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    // @ts-ignore
    .add("default", () => (React.createElement(test_utils_1.MockedProvider, Object.assign({}, { mocks: [], cache: mocks_1.createCache() }),
    React.createElement(PartnersList_1.PartnersList, Object.assign({}, props)))))
    .add("loading", () => (React.createElement(test_utils_1.MockedProvider, Object.assign({}, { mocks: [], cache: mocks_1.createCache() }),
    React.createElement(PartnersList_1.PartnersList, Object.assign({}, Object.assign({}, props, { stories: { loading: true } }))))));
