import {
  getRandomKey,
  getRandomProp,
  intersectObjKey,
  isEmpty,
  langMatch,
  objsToArrayWithKey,
  sortByDistance
} from "../utils";
import { LearnLevel } from "../../LearnLevel";
import { TeachLevel } from "../../TeachLevel";

it("getRandomProp", () => {
  const objs = {
    key1: "prop1",
    key2: "prop2",
    key3: "prop3"
  };
  const res = getRandomProp(objs);
  expect(["prop1", "prop2", "prop3"]).toContain(res);
});
it("getRandomKey", () => {
  const objs = {
    key1: "prop1",
    key2: "prop2",
    key3: "prop3"
  };
  const res = getRandomKey(objs);
  expect(["key1", "key2", "key3"]).toContain(res);
});

it("objsToArrayWithKey", () => {
  const objs = {
    key1: { prop1: "prop1" },
    key2: { prop2: "prop2" }
  };
  const res = objsToArrayWithKey(objs);
  expect(res).toEqual([
    { prop1: "prop1", key: "key1" },
    { prop2: "prop2", key: "key2" }
  ]);
});

it("intersectObjKey", () => {
  const res = intersectObjKey({ key1: "", key2: "" }, { key1: "", key3: "" });
  expect(res).toEqual(["key1"]);
});

it("isEmpty", () => {
  expect(isEmpty({})).toEqual(true);
  expect(isEmpty(null)).toEqual(true);
  expect(isEmpty(undefined)).toEqual(true);
  expect(isEmpty([])).toEqual(true);
  expect(isEmpty([undefined])).toEqual(true);
  expect(isEmpty([null])).toEqual(true);

  expect(isEmpty(["value"])).toEqual(false);
  expect(isEmpty({ prop: undefined })).toEqual(false);
  expect(isEmpty({ prop: null })).toEqual(false);
  expect(isEmpty({ prop: "prop" })).toEqual(false);
});

it("cross lang match", () => {
  const user = {
    learn: {
      french: "intermediate",
      italian: "beginner",
      spanish: "fluent"
    },
    teach: {
      english: "native",
      spanish: "fluent"
    }
  };
  const other = {
    learn: { spanish: "beginner" },
    teach: { italian: "native" }
  };

  expect(
    langMatch(user.learn, other.teach) && langMatch(other.learn, user.teach)
  ).toBe(true);
});

it("lang match", () => {
  let learns: any = { english: LearnLevel.beginner };
  let teachs: any = { english: TeachLevel.native };
  expect(langMatch(learns, teachs)).toBe(true);
  learns = { french: LearnLevel.beginner, english: LearnLevel.beginner };
  teachs = { spanish: TeachLevel.native, english: TeachLevel.native };
  expect(langMatch(learns, teachs)).toBe(true);
  learns = { english: LearnLevel.beginner };
  teachs = { english: TeachLevel.fluent };
  expect(langMatch(learns, teachs)).toBe(true);
  learns = { english: LearnLevel.fluent };
  teachs = { english: TeachLevel.native };
  expect(langMatch(learns, teachs)).toBe(true);
  learns = { english: LearnLevel.fluent };
  teachs = { english: TeachLevel.fluent };
  expect(langMatch(learns, teachs)).toBe(false);
  learns = { french: LearnLevel.beginner };
  teachs = { spanish: TeachLevel.native };
  expect(langMatch(learns, teachs)).toBe(false);
});

it("sortByDistance", () => {
  expect(
    sortByDistance(1, 1, [{ lat: 10, lon: 10 }, { lat: 2, lon: 2 }])
  ).toEqual([{ lat: 2, lon: 2 }, { lat: 10, lon: 10 }]);
});
