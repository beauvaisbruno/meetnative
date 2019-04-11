"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = __importDefault(require("./lang"));
class TeachLevel {
    static lang(level) {
        if (level === TeachLevel.native)
            return lang_1.default("Native");
        if (level === TeachLevel.bilingual)
            return lang_1.default("Bilingual");
        if (level === TeachLevel.fluent)
            return lang_1.default("Fluent");
        return lang_1.default("Unknow");
    }
    static sortKeysByValue(langs) {
        const resObj = {};
        const keys = Object.keys(langs);
        keys.sort((a, b) => {
            if (langs[a] === langs[b])
                return 0;
            if (langs[a] === TeachLevel.native)
                return -1;
            if (langs[a] === TeachLevel.fluent)
                return 1;
            if (langs[b] === TeachLevel.native)
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
TeachLevel.fluent = "fluent";
TeachLevel.bilingual = "bilingual";
TeachLevel.native = "native";
TeachLevel.all = [TeachLevel.native, TeachLevel.bilingual, TeachLevel.fluent];
exports.TeachLevel = TeachLevel;
