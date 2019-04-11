"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = __importDefault(require("../../../../jest/jsdom"));
jsdom_1.default();
const enzyme_1 = require("enzyme");
const test_utils_1 = require("react-apollo/test-utils");
const React = __importStar(require("react"));
const MessageUnread_1 = require("../MessageUnread");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const testUtils_1 = require("../../../../jest/testUtils");
const PartnersList_1 = require("../PartnersList");
const waait_1 = __importDefault(require("waait"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const mocks_1 = require("../../../utils/mocks");
const now = testUtils_1.mockDate();
const message = mocks_1.mockLastMessageProfileWithIds();
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
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, { mocks: [] }, React.createElement(MessageUnread_1.MessageUnread, Object.assign({}, props))));
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        tree
            .find("Styled(Button)")
            .props()
            // @ts-ignore
            .onPress();
        tree.update();
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        expect(tree.find("Styled(Icon)").props().name).toBe("spinner");
    });
    it("success", () => __awaiter(this, void 0, void 0, function* () {
        const cache = mocks_1.createCache();
        const mocks = [
            {
                request: {
                    query: MessageUnread_1.setLastMessageRead,
                    variables: {
                        recipientId: userProfile.id,
                        authorId: contactProfile.id
                    }
                },
                result: {
                    data: {
                        setLastMessageRead: Object.assign({}, message, { lastReadTime: Date.now() + 1 })
                    }
                }
            }
        ];
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, { mocks: mocks, cache: cache }, React.createElement(MessageUnread_1.MessageUnread, Object.assign({}, props))));
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        const afterNow = testUtils_1.mockDate(now + 1);
        const btn = tree.find("Styled(Button)");
        // @ts-ignore
        btn.props().onPress();
        yield waait_1.default(1);
        tree.update();
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        const fragment = cache.readFragment({
            id: contactProfile.id + "-" + userProfile.id,
            fragment: graphql_tag_1.default `
        fragment _ on LastMessage {
          lastReadTime
        }
      `
        });
        expect(fragment.lastReadTime).toEqual(afterNow);
        expect(tree
            .find("Mutation")
            .props()
            // @ts-ignore
            .refetchQueries()).toEqual([
            {
                query: PartnersList_1.getLastMessages,
                variables: {
                    userId: userProfile.id
                }
            }
        ]);
    }));
});
