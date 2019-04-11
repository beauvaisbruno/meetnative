import { LearnLevel } from "../LearnLevel";

it("LearnLevel", () => {
  const langs = {
    key1: LearnLevel.fluent,
    key2: LearnLevel.beginner,
    key3: LearnLevel.intermediate
  };
  const expects = {
    key1: LearnLevel.fluent,
    key3: LearnLevel.intermediate,
    key2: LearnLevel.beginner
  };

  expect(LearnLevel.sortKeysByValue(langs)).toEqual(expects);
});
