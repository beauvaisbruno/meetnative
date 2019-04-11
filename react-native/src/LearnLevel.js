"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = __importDefault(require("./lang"));
class LearnLevel {
    static lang(level) {
        if (level === LearnLevel.beginner)
            return lang_1.default("Beginner A1/A2");
        if (level === LearnLevel.intermediate)
            return lang_1.default("Intermediate B1/B2");
        if (level === LearnLevel.fluent)
            return lang_1.default("Fluent C1/C2");
        return lang_1.default("Unknow");
    }
    static sortKeysByValue(langs) {
        const resObj = {};
        const keys = Object.keys(langs);
        keys.sort((a, b) => {
            if (langs[a] === langs[b])
                return 0;
            if (langs[a] === LearnLevel.fluent)
                return -1;
            if (langs[a] === LearnLevel.beginner)
                return 1;
            if (langs[b] === LearnLevel.fluent)
                return 1;
            // if (langs[b] === TeachLevel.fluent)
            return -1;
        });
        keys.forEach(key => {
            resObj[key] = langs[key];
        });
        return resObj;
    }
}
LearnLevel.beginner = "beginner";
LearnLevel.intermediate = "intermediate";
LearnLevel.fluent = "fluent";
LearnLevel.all = [
    LearnLevel.beginner,
    LearnLevel.intermediate,
    LearnLevel.fluent
];
exports.LearnLevel = LearnLevel;
