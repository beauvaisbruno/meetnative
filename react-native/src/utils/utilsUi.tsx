// based on iphone 5s's scale
import { AsyncStorage, Dimensions, PixelRatio, Platform } from "react-native";
import geolib from "geolib";
import { IProfile } from "../rootReducers";
import { langMatch } from "./utils";
import { Text, Picker } from "native-base";
import Language from "../Language";
import { TeachLevel } from "../TeachLevel";
import * as React from "react";
import { LearnLevel } from "../LearnLevel";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { locale } from "../config/intl";
import custom from "../config/native-base-theme/variables/custom";

export const logAsyncStorage = () => {
  AsyncStorage.getAllKeys((error, keys) => {
    if (error) console.log("getAllKeys error: ", error);
    if (keys)
      keys.forEach(key => {
        AsyncStorage.getItem(key).then(value => {
          console.log("key: ", key, "=> ", value);
        });
      });
  });
};

export const shortFormat = (text: string, max: number) => {
  if (text.length <= max) return "« " + text + " »";
  return "... « " + text.substr(0, text.lastIndexOf(" ", max)) + "...»";
};

export const createLangPickers = () => {
  let langs: { value: string; label: string }[] = [];
  Language.all.forEach(value => {
    langs.push({ value, label: Language.lang(value) });
  });
  langs = langs.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
  const rows: JSX.Element[] = [];
  langs.forEach(({ value, label }) => {
    rows.push(<Picker.Item label={label} value={value} key={value} />);
  });
  return rows;
};

export const formatDuration = (since: number) => {
  const lang = locale();
  const now = new Date().getTime();
  if (now - since < 24 * 60 * 60 * 1000)
    return moment(since)
      .locale(lang)
      .fromNow();
  return moment(since)
    .locale(lang)
    .calendar();
};

const scale = Dimensions.get("window").width / 320;
export function font(s: number) {
  const newSize = s * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
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

export function teachRows(
  profile: IProfile,
  fontSize: number,
  userLearn: { [p: string]: string },
  bestMatchOnly = false
) {
  const teachRows: JSX.Element[] = [];
  Object.keys(profile.langsToTeach).some((key: string) => {
    const style = { fontSize, color: custom.textGreyLight };
    const matched = langMatch(userLearn, { [key]: profile.langsToTeach[key] });
    if (matched) style.color = custom.brandSecondary;
    if (!bestMatchOnly || matched)
      teachRows.push(
        <Text style={style} key={"teach-" + key}>
          {Language.lang(key) +
            " " +
            TeachLevel.lang(profile.langsToTeach[key])}
        </Text>
      );
    return bestMatchOnly && matched;
  });
  return teachRows;
}

export function learnRows(
  profile: IProfile,
  fontSize: number,
  userTeach: { [p: string]: string },
  bestMatchOnly = false
) {
  const learnRows: JSX.Element[] = [];
  Object.keys(profile.langsToLearn).some((key: string) => {
    const style = { fontSize, color: custom.textGreyLight };
    const matched = langMatch({ [key]: profile.langsToLearn[key] }, userTeach);
    if (matched) style.color = custom.brandSecondary;
    if (!bestMatchOnly || matched)
      learnRows.push(
        <Text style={style} key={"learn-" + key}>
          {Language.lang(key) +
            " " +
            LearnLevel.lang(profile.langsToLearn[key])}
        </Text>
      );
    return bestMatchOnly && matched;
  });
  return learnRows;
}
export const noMarPad = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  marginBottom: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0
};
export const noMarPadVert = {
  paddingBottom: 0,
  paddingTop: 0,
  marginBottom: 0,
  marginTop: 0
};

export const border = (color: string, width = 1) => ({
  borderBottomWidth: width,
  borderBottomColor: color,
  borderTopWidth: width,
  borderTopColor: color,
  borderRightWidth: width,
  borderRightColor: color,
  borderLeftWidth: width,
  borderLeftColor: color
});

export const margin = (margin: number) => ({
  marginLeft: margin,
  marginRight: margin,
  marginBottom: margin,
  marginTop: margin
});

export const padding = (padding: number) => ({
  paddingBottom: padding,
  paddingTop: padding,
  paddingRight: padding,
  paddingLeft: padding
});

export const msgOnError = (touched: any, error: any) => {
  if (touched && error)
    return <Text style={{ color: custom.brandDanger }}>{error}</Text>;
  return undefined;
};
