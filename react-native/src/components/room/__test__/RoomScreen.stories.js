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
    navigation: {
        addListener: () => { },
        getParam: () => ({
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
        })
    },
    sendMessage: { fetching: false, error: false },
    doSendMessages: (message) => {
        console.log("message: ", message);
    }
};
react_native_1.storiesOf("RoomScreen", module)
    .addDecorator(decorators_1.storeBaseAndNavigatorDecorator)
    // @ts-ignore
    .add("default", () => React.createElement(RoomScreen_1.RoomScreen, Object.assign({}, initialProps)))
    .add("load", () => (
// @ts-ignore
React.createElement(RoomScreen_1.RoomScreen, Object.assign({}, initialProps, { sendMessage: {
        fetching: true,
        error: false
    } }))))
    .add("error", () => (
// @ts-ignore
React.createElement(RoomScreen_1.RoomScreen, Object.assign({}, initialProps, { sendMessage: {
        fetching: false,
        error: true
    } }))));
