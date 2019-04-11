"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("react-native-localize", () => ({ findBestAvailableLanguage: () => ({ languageTag: "en" }) }));
const intl_1 = require("../intl");
const dictionary = {
    "in english": { fr: "en français" }
};
it("return english if locale", () => {
    expect(intl_1.translate(dictionary, "in english"))
        .toEqual("in english");
});
it("return the key", () => {
    expect(intl_1.translate(dictionary, "no translation key exists"))
        .toEqual("no translation key exists");
});
it("return the translation", () => {
    intl_1.changeLocale("fr");
    expect(intl_1.translate(dictionary, "in english")).toEqual("en français");
});
it("return english if local do not exist", () => {
    intl_1.changeLocale("es");
    expect(intl_1.translate(dictionary, "in english")).toEqual("in english");
});
