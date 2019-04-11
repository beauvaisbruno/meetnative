"use strict";
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
const testUtils_1 = require("../../../../jest/testUtils");
const addListener = jest.fn();
const doSendMessages = jest.fn();
const doSyncMessages = jest.fn();
const getParam = jest.fn();
jest.mock("react-native-firebase", () => {
    return {
        auth: () => ({ currentUser: { uid: "uid" } })
    };
});
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const enzyme_1 = require("enzyme");
const React = __importStar(require("react"));
const RoomScreen_1 = require("../RoomScreen");
const initialProps = {
    userProfile: {
        id: "C3iSMgBhdmazzcOngiTBpo7USNv2",
        langsToLearn: {
            french: "intermediate",
            italian: "beginner",
            spanish: "fluent"
        },
        age: 23,
        lat: 46.144516,
        pseudo: "pseudo",
        lon: 6.081338,
        langsToTeach: {
            english: "native",
            spanish: "fluent"
        },
        geohash: 3661469831164302,
        city: "Genève",
        avatar: "cute",
        profession: "profession"
    },
    navigation: { addListener, getParam },
    sendMessage: { fetching: false },
    doSendMessages,
    doSyncMessages
};
getParam.mockReturnValue({
    langsToLearn: {
        english: "beginner",
        french: "fluent",
        german: "intermediate"
    },
    profession: "Legal Assistant",
    city: "Genève",
    geohash: 872962206,
    langsToTeach: {
        french: "fluent",
        italian: "bilingual",
        spanish: "native"
    },
    lon: 6.107057129141845,
    pseudo: "Maëlle",
    avatar: "pelican",
    lat: 46.08995392215012,
    age: 23,
    id: "IEY3I5fpxQilwKzPt0Sc"
});
it("RoomScreen", () => {
    testUtils_1.mockDate();
    // @ts-ignore
    let tree = enzyme_1.shallow(React.createElement(RoomScreen_1.RoomScreen, Object.assign({}, initialProps)));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    expect(getParam).toBeCalledWith("contactProfile", null);
    expect(addListener.mock.calls[0][0]).toBe("willFocus");
    addListener.mock.calls[0][1]();
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    tree
        .find("Styled(Input)")
        .props()
        // @ts-ignore
        .onChangeText("someTextToSend");
    tree
        .find("Styled(Button)")
        .props()
        // @ts-ignore
        .onPress();
    expect(doSendMessages).toBeCalledWith({
        message: "someTextToSend",
        time: Date.now(),
        authorId: "C3iSMgBhdmazzcOngiTBpo7USNv2",
        recipientId: "IEY3I5fpxQilwKzPt0Sc"
    });
    tree = enzyme_1.shallow(
    // @ts-ignore
    React.createElement(RoomScreen_1.RoomScreen, Object.assign({}, initialProps, { sendMessage: { fetching: true } })));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    testUtils_1.unMockDate();
});
