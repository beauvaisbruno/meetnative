"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const React = __importStar(require("react"));
const PartnerRow_1 = require("../PartnerRow");
const testUtils_1 = require("../../../../jest/testUtils");
const mocks_1 = require("../../../utils/mocks");
const now = testUtils_1.mockDate();
const message = mocks_1.mockLastMessageProfileWithIds();
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
        const tree = enzyme_1.shallow(React.createElement(PartnerRow_1.PartnerRow, Object.assign({}, props)));
        tree
            .find("Styled(Button)")
            .props()
            // @ts-ignore
            .onPress();
        expect(navigate).toBeCalledWith("RoomScreen", {
            contactProfile
        });
        testUtils_1.expectTestIDPropExists(tree, "MessageUnread");
    });
    it("already read message", () => {
        message.lastReadTime = now + 1;
        message.lastMsgReceivedTime = now;
        // @ts-ignore
        const tree = enzyme_1.shallow(React.createElement(PartnerRow_1.PartnerRow, Object.assign({}, props)));
        tree
            .find("Styled(Button)")
            .props()
            // @ts-ignore
            .onPress();
        expect(navigate).toBeCalledWith("RoomScreen", {
            contactProfile
        });
        testUtils_1.expectTestIDPropExists(tree, "lastMessageRead");
    });
});
