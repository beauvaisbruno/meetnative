"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const PartnerRowMock = jest.fn(props => (React.createElement(react_native_1.View, Object.assign({ testID: "PartnerRow" }, props))));
jest.mock("../PartnerRow", () => PartnerRowMock);
const enzyme_1 = require("enzyme");
const test_utils_1 = require("react-apollo/test-utils");
const React = __importStar(require("react"));
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const testUtils_1 = require("../../../../jest/testUtils");
const PartnersList_1 = __importStar(require("../PartnersList"));
const waait_1 = __importDefault(require("waait"));
const mocks_1 = require("../../../utils/mocks");
const jsdom_1 = __importDefault(require("../../../../jest/jsdom"));
jsdom_1.default();
const oldTime = testUtils_1.mockDate();
const oldestMessage = mocks_1.mockLastMessageProfileWithIds({
    lastMsgReceived: "oldMsg"
});
const recentTime = testUtils_1.mockDate(oldTime + 1);
const newestMessage = mocks_1.mockLastMessageProfileWithIds({
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
    it("loading and error", () => __awaiter(this, void 0, void 0, function* () {
        const mocks = [
            {
                request: {
                    query: PartnersList_1.getLastMessages,
                    variables: {
                        userId: userProfileId
                    }
                },
                result: {
                    errors: [{ message: "Error!" }]
                }
            }
        ];
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, Object.assign({}, { mocks, cache: mocks_1.createCache() }), React.createElement(PartnersList_1.PartnersList, Object.assign({}, props))));
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        yield waait_1.default(1);
        tree.update();
        expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
        testUtils_1.expectTestIDPropExists(tree, "error");
    }));
    it("no partner yet and subscribe", () => __awaiter(this, void 0, void 0, function* () {
        const subscribe = jest.fn();
        PartnersList_1.default.subscribe = subscribe;
        const mocks = [
            {
                request: {
                    query: PartnersList_1.getLastMessages,
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
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, { mocks: mocks }, React.createElement(PartnersList_1.PartnersList, Object.assign({}, props))));
        yield waait_1.default(1);
        tree.update();
        // expect(toJson(tree)).toMatchSnapshot();
        testUtils_1.expectTestIDPropExists(tree, "noPartner");
        const subscribeOptions = subscribe.mock.calls[0][1];
        expect(subscribeOptions.document).toEqual(PartnersList_1.getLastMessagesSync);
        expect(subscribeOptions.variables).toEqual({ userId: userProfile.id });
        expect(subscribeOptions.updateQuery({}, {
            subscriptionData: {
                data: { getLastMessagesSync: "getLastMessagesSync" }
            }
        })).toEqual({ getLastMessages: "getLastMessagesSync" });
    }));
    it("query success", () => __awaiter(this, void 0, void 0, function* () {
        const mocks = [
            {
                request: {
                    query: PartnersList_1.getLastMessages,
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
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, Object.assign({}, { mocks, cache: mocks_1.createCache() }), React.createElement(PartnersList_1.PartnersList, Object.assign({}, props))));
        yield waait_1.default(1);
        tree.update();
        // expect(toJson(tree)).toMatchSnapshot();
        expect(PartnerRowMock.mock.calls[0][0].message.lastMsgReceived).toBe("newMsg");
        expect(PartnerRowMock.mock.calls[0][0].userProfile).toBe(userProfile);
        expect(PartnerRowMock.mock.calls[1][0].message.lastMsgReceived).toBe("oldMsg");
    }));
});
