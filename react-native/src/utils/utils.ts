import { TeachLevel } from "../TeachLevel";
import { LearnLevel } from "../LearnLevel";
import geolib from "geolib";

export const MIN = 60 * 1000;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;

export const sortByDistance = (
  userLat: number,
  userLon: number,
  profilesData: { lat: number; lon: number }[]
) => {
  return profilesData.sort((a, b) => {
    const aDistance = distanceKm(userLat, userLon, a.lat, a.lon);
    const bDistance = distanceKm(userLat, userLon, b.lat, b.lon);
    if (aDistance < bDistance) return -1;
    if (aDistance > bDistance) return 1;
    return 0;
  });
};
export const sortByTimeAsc = (data: { time: number }[]) => {
  return data.sort((a: { time: number }, b: { time: number }) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });
};

export function objsToArrayWithKey(obj: { [x: string]: any }) {
  return Object.keys(obj).map(key => {
    obj[key].key = key;
    return obj[key];
  });
}

export function isEmpty(value: any): boolean {
  const isEmptyObject = (a: any): boolean => {
    if (typeof a.length === "undefined") {
      // it's an Object, not an Array
      const hasNonempty = Object.keys(a).some(element => !isEmpty(a[element]));
      return hasNonempty ? false : isEmptyObject(Object.keys(a));
    }

    return !a.some((element: any) => {
      // check if array is really not empty as JS thinks
      return !isEmpty(element); // at least one element should be non-empty
    });
  };
  return (
    !value ||
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "object" && isEmptyObject(value))
  );
}

export function getRandomProp<T>(obj: { [key: string]: T }): T {
  const keys = Object.keys(obj);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return obj[randKey];
}
export function getRandomKey(obj: { [key: string]: any }): string {
  const keys = Object.keys(obj);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return key;
}
export function intersectObjKey(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
): string[] {
  return Object.keys(obj1).filter(function(n) {
    return Object.keys(obj2).indexOf(n) > -1;
  });
}

export function langMatch(
  learnLangsLevels: { [p: string]: string },
  teachLangsLevels: { [p: string]: string }
): boolean {
  const learnLangs: string[] = Object.keys(learnLangsLevels);
  const teachLangs: string[] = Object.keys(teachLangsLevels);
  for (const learnLang of learnLangs) {
    if (
      teachLangs.indexOf(learnLang) !== -1 &&
      (teachLangsLevels[learnLang] !== TeachLevel.fluent ||
        learnLangsLevels[learnLang] !== LearnLevel.fluent)
    )
      return true;
  }
  return false;
}
export function distanceKm(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number {
  return Math.round(
    geolib.getDistance(
      { latitude: fromLat, longitude: fromLon },
      { latitude: toLat, longitude: toLon }
    ) / 1000
  );
}
