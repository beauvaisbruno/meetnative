"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const LearnLevel_1 = require("../../LearnLevel");
const TeachLevel_1 = require("../../TeachLevel");
it("getRandomProp", () => {
    const objs = {
        key1: "prop1",
        key2: "prop2",
        key3: "prop3"
    };
    const res = utils_1.getRandomProp(objs);
    expect(["prop1", "prop2", "prop3"]).toContain(res);
});
it("getRandomKey", () => {
    const objs = {
        key1: "prop1",
        key2: "prop2",
        key3: "prop3"
    };
    const res = utils_1.getRandomKey(objs);
    expect(["key1", "key2", "key3"]).toContain(res);
});
it("objsToArrayWithKey", () => {
    const objs = {
        key1: { prop1: "prop1" },
        key2: { prop2: "prop2" }
    };
    const res = utils_1.objsToArrayWithKey(objs);
    expect(res).toEqual([
        { prop1: "prop1", key: "key1" },
        { prop2: "prop2", key: "key2" }
    ]);
});
it("intersectObjKey", () => {
    const res = utils_1.intersectObjKey({ key1: "", key2: "" }, { key1: "", key3: "" });
    expect(res).toEqual(["key1"]);
});
it("isEmpty", () => {
    expect(utils_1.isEmpty({})).toEqual(true);
    expect(utils_1.isEmpty(null)).toEqual(true);
    expect(utils_1.isEmpty(undefined)).toEqual(true);
    expect(utils_1.isEmpty([])).toEqual(true);
    expect(utils_1.isEmpty([undefined])).toEqual(true);
    expect(utils_1.isEmpty([null])).toEqual(true);
    expect(utils_1.isEmpty(["value"])).toEqual(false);
    expect(utils_1.isEmpty({ prop: undefined })).toEqual(false);
    expect(utils_1.isEmpty({ prop: null })).toEqual(false);
    expect(utils_1.isEmpty({ prop: "prop" })).toEqual(false);
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
    expect(utils_1.langMatch(user.learn, other.teach) && utils_1.langMatch(other.learn, user.teach)).toBe(true);
});
it("lang match", () => {
    let learns = { english: LearnLevel_1.LearnLevel.beginner };
    let teachs = { english: TeachLevel_1.TeachLevel.native };
    expect(utils_1.langMatch(learns, teachs)).toBe(true);
    learns = { french: LearnLevel_1.LearnLevel.beginner, english: LearnLevel_1.LearnLevel.beginner };
    teachs = { spanish: TeachLevel_1.TeachLevel.native, english: TeachLevel_1.TeachLevel.native };
    expect(utils_1.langMatch(learns, teachs)).toBe(true);
    learns = { english: LearnLevel_1.LearnLevel.beginner };
    teachs = { english: TeachLevel_1.TeachLevel.fluent };
    expect(utils_1.langMatch(learns, teachs)).toBe(true);
    learns = { english: LearnLevel_1.LearnLevel.fluent };
    teachs = { english: TeachLevel_1.TeachLevel.native };
    expect(utils_1.langMatch(learns, teachs)).toBe(true);
    learns = { english: LearnLevel_1.LearnLevel.fluent };
    teachs = { english: TeachLevel_1.TeachLevel.fluent };
    expect(utils_1.langMatch(learns, teachs)).toBe(false);
    learns = { french: LearnLevel_1.LearnLevel.beginner };
    teachs = { spanish: TeachLevel_1.TeachLevel.native };
    expect(utils_1.langMatch(learns, teachs)).toBe(false);
});
it("sortByDistance", () => {
    expect(utils_1.sortByDistance(1, 1, [{ lat: 10, lon: 10 }, { lat: 2, lon: 2 }])).toEqual([{ lat: 2, lon: 2 }, { lat: 10, lon: 10 }]);
});
