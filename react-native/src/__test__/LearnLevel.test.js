"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LearnLevel_1 = require("../LearnLevel");
it("LearnLevel", () => {
    const langs = {
        key1: LearnLevel_1.LearnLevel.fluent,
        key2: LearnLevel_1.LearnLevel.beginner,
        key3: LearnLevel_1.LearnLevel.intermediate
    };
    const expects = {
        key1: LearnLevel_1.LearnLevel.fluent,
        key3: LearnLevel_1.LearnLevel.intermediate,
        key2: LearnLevel_1.LearnLevel.beginner
    };
    expect(LearnLevel_1.LearnLevel.sortKeysByValue(langs)).toEqual(expects);
});
