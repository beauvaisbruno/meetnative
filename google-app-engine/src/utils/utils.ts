import { TeachLevel } from "../../../react-native/src/TeachLevel";
import { LearnLevel } from "../../../react-native/src/LearnLevel";
import { IProfile } from "../../../react-native/src/rootReducers";
import { avatars } from "../../../react-native/src/components/profile/img/Avatars";
import { getRandomKey } from "../../../react-native/src/utils/utils";
import { firestore } from "../firebase";
// @ts-ignore
import * as g from "ngeohash";
import geolib from "geolib";

export const distance = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number => {
  return geolib.getDistance(
    { latitude: fromLat, longitude: fromLon },
    { latitude: toLat, longitude: toLon }
  );
};
export const distanceKm = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number => {
  return Math.round(distance(fromLat, fromLon, toLat, toLon) / 1000);
};

const names = require("./names.json");
export const getRandomName = (): string => {
  return names[Math.floor(Math.random() * names.length)];
};

const professions = require("./professions.json");
export const getRandomProfession = (): string => {
  return professions[Math.floor(Math.random() * professions.length)];
};

const getRandomCloseLon = (lon: number): number => {
  // 0.5° ~ 50km
  return lon - 0.25 + Math.random() * 0.5;
};
const getRandomCloseLat = (lat: number): number => {
  // 0.5° ~ 50km
  return lat - 0.25 + Math.random() * 0.5;
};

export const createFakeProfiles = (
  langsToTeach: { [key: string]: string } = { english: TeachLevel.native },
  langsToLearn: { [key: string]: string } = { french: LearnLevel.beginner },
  lon = 6.081338,
  lat = 46.144516
): IProfile => {
  const rLon = getRandomCloseLon(lon);
  const rLat = getRandomCloseLat(lat);
  const defaultsValues = {
    fake: true,
    langsToTeach,
    langsToLearn,
    age: 23,
    city: "Genève",
    pseudo: getRandomName(),
    profession: getRandomProfession(),
    avatar: getRandomKey(avatars),
    lon: rLon,
    lat: rLat,
    geohash: g.encode_int(rLat, rLon, 30), //1km
    isMale: Math.random() > 0.5
  };
  return defaultsValues;
};

export const createDoc = (doc: FirebaseFirestore.DocumentData) => {
  firestore
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
