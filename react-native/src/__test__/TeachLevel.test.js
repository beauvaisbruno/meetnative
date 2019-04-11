"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeachLevel_1 = require("../TeachLevel");
it("TeachLevel", () => {
    const langs = {
        key1: TeachLevel_1.TeachLevel.fluent,
        key2: TeachLevel_1.TeachLevel.native,
        key3: TeachLevel_1.TeachLevel.bilingual
    };
    const expects = {
        key2: TeachLevel_1.TeachLevel.native,
        key3: TeachLevel_1.TeachLevel.bilingual,
        key1: TeachLevel_1.TeachLevel.fluent
    };
    console.log("TeachLevel.sort(langs): ", TeachLevel_1.TeachLevel.sortKeysByValue(langs));
    expect(TeachLevel_1.TeachLevel.sortKeysByValue(langs)).toEqual(expects);
});
