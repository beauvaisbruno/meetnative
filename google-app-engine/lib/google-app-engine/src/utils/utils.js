"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const TeachLevel_1 = require("../../../react-native/src/TeachLevel");
const LearnLevel_1 = require("../../../react-native/src/LearnLevel");
const Avatars_1 = require("../../../react-native/src/components/profile/img/Avatars");
const utils_1 = require("../../../react-native/src/utils/utils");
const firebase_1 = require("../firebase");
// @ts-ignore
const g = __importStar(require("ngeohash"));
const geolib_1 = __importDefault(require("geolib"));
exports.distance = (fromLat, fromLon, toLat, toLon) => {
  return geolib_1.default.getDistance(
    { latitude: fromLat, longitude: fromLon },
    { latitude: toLat, longitude: toLon }
  );
};
exports.distanceKm = (fromLat, fromLon, toLat, toLon) => {
  return Math.round(exports.distance(fromLat, fromLon, toLat, toLon) / 1000);
};
const names = require("./names.json");
exports.getRandomName = () => {
  return names[Math.floor(Math.random() * names.length)];
};
const professions = require("./professions.json");
exports.getRandomProfession = () => {
  return professions[Math.floor(Math.random() * professions.length)];
};
const getRandomCloseLon = lon => {
  // 0.5° ~ 50km
  return lon - 0.25 + Math.random() * 0.5;
};
const getRandomCloseLat = lat => {
  // 0.5° ~ 50km
  return lat - 0.25 + Math.random() * 0.5;
};
exports.createFakeProfiles = (
  langsToTeach = { english: TeachLevel_1.TeachLevel.native },
  langsToLearn = { french: LearnLevel_1.LearnLevel.beginner },
  lon = 6.081338,
  lat = 46.144516
) => {
  const rLon = getRandomCloseLon(lon);
  const rLat = getRandomCloseLat(lat);
  const defaultsValues = {
    fake: true,
    langsToTeach,
    langsToLearn,
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
exports.createDoc = doc => {
  firebase_1.firestore
    .collection("profiles")
    .doc()
    .create(doc)
    .then(res => {
      console.log("create: ", res);
    })
    .catch(err => {
      console.log("Failed to create document: ", err);
    });
};
//# sourceMappingURL=utils.js.map
