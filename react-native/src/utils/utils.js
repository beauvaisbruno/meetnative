"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeachLevel_1 = require("../TeachLevel");
const LearnLevel_1 = require("../LearnLevel");
const geolib_1 = __importDefault(require("geolib"));
exports.MIN = 60 * 1000;
exports.HOUR = 60 * exports.MIN;
exports.DAY = 24 * exports.HOUR;
exports.sortByDistance = (userLat, userLon, profilesData) => {
    return profilesData.sort((a, b) => {
        const aDistance = distanceKm(userLat, userLon, a.lat, a.lon);
        const bDistance = distanceKm(userLat, userLon, b.lat, b.lon);
        if (aDistance < bDistance)
            return -1;
        if (aDistance > bDistance)
            return 1;
        return 0;
    });
};
exports.sortByTimeAsc = (data) => {
    return data.sort((a, b) => {
        if (a.time < b.time)
            return -1;
        if (a.time > b.time)
            return 1;
        return 0;
    });
};
function objsToArrayWithKey(obj) {
    return Object.keys(obj).map(key => {
        obj[key].key = key;
        return obj[key];
    });
}
exports.objsToArrayWithKey = objsToArrayWithKey;
function isEmpty(value) {
    const isEmptyObject = (a) => {
        if (typeof a.length === "undefined") {
            // it's an Object, not an Array
            const hasNonempty = Object.keys(a).some(element => !isEmpty(a[element]));
            return hasNonempty ? false : isEmptyObject(Object.keys(a));
        }
        return !a.some((element) => {
            // check if array is really not empty as JS thinks
            return !isEmpty(element); // at least one element should be non-empty
        });
    };
    return (!value ||
        typeof value === "undefined" ||
        value === null ||
        (typeof value === "object" && isEmptyObject(value)));
}
exports.isEmpty = isEmpty;
function getRandomProp(obj) {
    const keys = Object.keys(obj);
    const randKey = keys[Math.floor(Math.random() * keys.length)];
    return obj[randKey];
}
exports.getRandomProp = getRandomProp;
function getRandomKey(obj) {
    const keys = Object.keys(obj);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return key;
}
exports.getRandomKey = getRandomKey;
function intersectObjKey(obj1, obj2) {
    return Object.keys(obj1).filter(function (n) {
        return Object.keys(obj2).indexOf(n) > -1;
    });
}
exports.intersectObjKey = intersectObjKey;
function langMatch(learnLangsLevels, teachLangsLevels) {
    const learnLangs = Object.keys(learnLangsLevels);
    const teachLangs = Object.keys(teachLangsLevels);
    for (const learnLang of learnLangs) {
        if (teachLangs.indexOf(learnLang) !== -1 &&
            (teachLangsLevels[learnLang] !== TeachLevel_1.TeachLevel.fluent ||
                learnLangsLevels[learnLang] !== LearnLevel_1.LearnLevel.fluent))
            return true;
    }
    return false;
}
exports.langMatch = langMatch;
function distanceKm(fromLat, fromLon, toLat, toLon) {
    return Math.round(geolib_1.default.getDistance({ latitude: fromLat, longitude: fromLon }, { latitude: toLat, longitude: toLon }) / 1000);
}
exports.distanceKm = distanceKm;
