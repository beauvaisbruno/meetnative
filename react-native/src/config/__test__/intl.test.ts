jest.mock("react-native-localize",() =>(
  {findBestAvailableLanguage:() => ({languageTag:"en"})}
));

import { changeLocale, translate } from "../intl";

const dictionary = {
  "in english": { fr: "en français" }
};
it("return english if locale", () => {
  expect(translate(dictionary, "in english"))
    .toEqual("in english");
});
it("return the key", () => {
  expect(translate(dictionary, "no translation key exists"))
    .toEqual("no translation key exists");
});
it("return the translation", () => {
  changeLocale("fr");
  expect(translate(dictionary, "in english")).toEqual("en français");
});
it("return english if local do not exist", () => {
  changeLocale("es");
  expect(translate(dictionary, "in english")).toEqual("in english");
});

