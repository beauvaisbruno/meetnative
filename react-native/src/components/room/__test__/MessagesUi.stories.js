"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@storybook/react-native");
const decorators_1 = require("../../../utils/decorators");
const React = __importStar(require("react"));
const utils_1 = require("../../../utils/utils");
const MessagesUi_1 = require("../MessagesUi");
const now = Date.now();
function toUser(delay, message = "I available to meet up this afternoon. And you ?") {
    return {
        message,
        time: now - delay,
        authorId: "IEY3I5fpxQilwKzPt0Sc",
        recipientId: "C3iSMgBhdmazzcOngiTBpo7USNv2"
    };
}
function fromUser(delay, message = "Yes, I am available. Let's meet up.") {
    return {
        message,
        recipientId: "IEY3I5fpxQilwKzPt0Sc",
        time: now - delay - 1,
        authorId: "C3iSMgBhdmazzcOngiTBpo7USNv2"
    };
}
const initialProps = {
    userProfile: {
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
        profession: "profession",
        id: "IEY3I5fpxQilwKzPt0Sc"
    },
    contactProfile: {
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
        id: "C3iSMgBhdmazzcOngiTBpo7USNv2"
    },
    loadAuthor: {
        data: [
            fromUser(0),
            fromUser(24 * utils_1.MIN),
            fromUser(25 * utils_1.MIN),
            fromUser(10 * utils_1.HOUR),
            fromUser(25 * utils_1.HOUR),
            fromUser(5 * utils_1.DAY),
            fromUser(8 * utils_1.DAY),
            fromUser(8 * utils_1.DAY - 1, "Hello !")
        ]
    },
    loadRecipient: {
        data: [
            toUser(0),
            toUser(24 * utils_1.MIN),
            toUser(25 * utils_1.MIN),
            toUser(10 * utils_1.HOUR),
            toUser(25 * utils_1.HOUR),
            toUser(5 * utils_1.DAY),
            toUser(8 * utils_1.DAY - 2),
            toUser(8 * utils_1.DAY - 3, "Hello !")
        ]
    },
    navigation: { addListener: () => { } },
    loadRoom: { fetching: false },
    doLoadMessages: () => {
        console.log("doLoadMessages");
    }
};
react_native_1.storiesOf("MessagesUi", module)
    .addDecorator(decorators_1.baseDecorator)
    // @ts-ignore
    .add("default", () => React.createElement(MessagesUi_1.MessagesUi, Object.assign({}, initialProps)));
