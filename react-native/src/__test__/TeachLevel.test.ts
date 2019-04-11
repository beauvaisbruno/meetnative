import { TeachLevel } from "../TeachLevel";

it("TeachLevel", () => {
  const langs = {
    key1: TeachLevel.fluent,
    key2: TeachLevel.native,
    key3: TeachLevel.bilingual
  };
  const expects = {
    key2: TeachLevel.native,
    key3: TeachLevel.bilingual,
    key1: TeachLevel.fluent
  };
  console.log("TeachLevel.sort(langs): ", TeachLevel.sortKeysByValue(langs));
  expect(TeachLevel.sortKeysByValue(langs)).toEqual(expects);
});
