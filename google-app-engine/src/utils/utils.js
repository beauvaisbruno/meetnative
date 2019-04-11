"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TeachLevel_1 = require("../../../react-native/src/TeachLevel");
var LearnLevel_1 = require("../../../react-native/src/LearnLevel");
var Avatars_1 = require("../../../react-native/src/components/profile/img/Avatars");
var utils_1 = require("../../../react-native/src/utils/utils");
var firebase_1 = require("../firebase");
// @ts-ignore
var g = __importStar(require("ngeohash"));
var geolib_1 = __importDefault(require("geolib"));
exports.distance = function (fromLat, fromLon, toLat, toLon) {
    return geolib_1.default.getDistance({ latitude: fromLat, longitude: fromLon }, { latitude: toLat, longitude: toLon });
};
exports.distanceKm = function (fromLat, fromLon, toLat, toLon) {
    return Math.round(exports.distance(fromLat, fromLon, toLat, toLon) / 1000);
};
var names = require("./names.json");
exports.getRandomName = function () {
    return names[Math.floor(Math.random() * names.length)];
};
var professions = require("./professions.json");
exports.getRandomProfession = function () {
    return professions[Math.floor(Math.random() * professions.length)];
};
var getRandomCloseLon = function (lon) {
    // 0.5° ~ 50km
    return lon - 0.25 + Math.random() * 0.5;
};
var getRandomCloseLat = function (lat) {
    // 0.5° ~ 50km
    return lat - 0.25 + Math.random() * 0.5;
};
exports.createFakeProfiles = function (langsToTeach, langsToLearn, lon, lat) {
    if (langsToTeach === void 0) { langsToTeach = { english: TeachLevel_1.TeachLevel.native }; }
    if (langsToLearn === void 0) { langsToLearn = { french: LearnLevel_1.LearnLevel.beginner }; }
    if (lon === void 0) { lon = 6.081338; }
    if (lat === void 0) { lat = 46.144516; }
    var rLon = getRandomCloseLon(lon);
    var rLat = getRandomCloseLat(lat);
    var defaultsValues = {
        fake: true,
        langsToTeach: langsToTeach,
        langsToLearn: langsToLearn,
        age: 23,
        city: "Genève",
        pseudo: exports.getRandomName(),
        profession: exports.getRandomProfession(),
        avatar: utils_1.getRandomKey(Avatars_1.avatars),
        lon: rLon,
        lat: rLat,
        geohash: g.encode_int(rLat, rLon, 30),
        isMale: Math.random() > 0.5
    };
    return defaultsValues;
};
exports.createDoc = function (doc) {
    firebase_1.firestore
        .collection("profiles")
        .doc()
        .create(doc)
        .then(function (res) {
        console.log("create: ", res);
    })
        .catch(function (err) {
        console.log("Failed to create document: ", err);
    });
};
