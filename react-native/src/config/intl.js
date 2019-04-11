"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageformat_1 = __importDefault(require("messageformat"));
exports.changeLocale = (pLocale) => {
    lLocale = pLocale;
    mf = new messageformat_1.default(pLocale);
};
let lLocale = "en";
let mf = new messageformat_1.default(lLocale);
function format(msgSrc, args = {}) {
    return mf.compile(msgSrc)(args);
}
exports.translate = (dictionary, english, args) => {
    if (lLocale === "en" || !dictionary[english] || !dictionary[english][lLocale])
        return format(english, args);
    return format(dictionary[english][lLocale], args);
};
exports.locale = () => lLocale;
