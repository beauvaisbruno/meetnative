"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
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
Object.defineProperty(exports, "__esModule", { value: true });
// based on iphone 5s's scale
const react_native_1 = require("react-native");
const geolib_1 = __importDefault(require("geolib"));
const utils_1 = require("./utils");
const native_base_1 = require("native-base");
const Language_1 = __importDefault(require("../Language"));
const TeachLevel_1 = require("../TeachLevel");
const React = __importStar(require("react"));
const LearnLevel_1 = require("../LearnLevel");
// @ts-ignore
const moment_with_locales_1 = __importDefault(
  require("moment/min/moment-with-locales")
);
const intl_1 = require("../config/intl");
const custom_1 = __importDefault(
  require("../config/native-base-theme/variables/custom")
);
exports.shortFormat = (text, max) => {
  if (text.length <= max) return "« " + text + " »";
  return "... « " + text.substr(0, text.lastIndexOf(" ", max)) + "...»";
};
exports.createLangPickers = () => {
  let langs = [];
  Language_1.default.all.forEach(value => {
    langs.push({ value, label: Language_1.default.lang(value) });
  });
  langs = langs.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
  const rows = [];
  langs.forEach(({ value, label }) => {
    rows.push(
      React.createElement(native_base_1.Picker.Item, {
        label: label,
        value: value,
        key: value
      })
    );
  });
  return rows;
};
exports.formatDuration = since => {
  const lang = intl_1.locale();
  const now = new Date().getTime();
  if (now - since < 24 * 60 * 60 * 1000)
    return moment_with_locales_1
      .default(since)
      .locale(lang)
      .fromNow();
  return moment_with_locales_1
    .default(since)
    .locale(lang)
    .calendar();
};
const scale = react_native_1.Dimensions.get("window").width / 320;
function font(s) {
  const newSize = s * scale;
  if (react_native_1.Platform.OS === "ios") {
    return Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize)) - 2;
}
exports.font = font;
function distanceKm(fromLat, fromLon, toLat, toLon) {
  return Math.round(
    geolib_1.default.getDistance(
      { latitude: fromLat, longitude: fromLon },
      { latitude: toLat, longitude: toLon }
    ) / 1000
  );
}
exports.distanceKm = distanceKm;
function teachRows(profile, fontSize, userLearn, bestMatchOnly = false) {
  const teachRows = [];
  Object.keys(profile.langsToTeach).some(key => {
    const style = { fontSize, color: custom_1.default.textGreyLight };
    const matched = utils_1.langMatch(userLearn, {
      [key]: profile.langsToTeach[key]
    });
    if (matched) style.color = custom_1.default.brandSecondary;
    if (!bestMatchOnly || matched)
      teachRows.push(
        React.createElement(
          native_base_1.Text,
          { style: style, key: "teach-" + key },
          Language_1.default.lang(key) +
            " " +
            TeachLevel_1.TeachLevel.lang(profile.langsToTeach[key])
        )
      );
    return bestMatchOnly && matched;
  });
  return teachRows;
}
exports.teachRows = teachRows;
function learnRows(profile, fontSize, userTeach, bestMatchOnly = false) {
  const learnRows = [];
  Object.keys(profile.langsToLearn).some(key => {
    const style = { fontSize, color: custom_1.default.textGreyLight };
    const matched = utils_1.langMatch(
      { [key]: profile.langsToLearn[key] },
      userTeach
    );
    if (matched) style.color = custom_1.default.brandSecondary;
    if (!bestMatchOnly || matched)
      learnRows.push(
        React.createElement(
          native_base_1.Text,
          { style: style, key: "learn-" + key },
          Language_1.default.lang(key) +
            " " +
            LearnLevel_1.LearnLevel.lang(profile.langsToLearn[key])
        )
      );
    return bestMatchOnly && matched;
  });
  return learnRows;
}
exports.learnRows = learnRows;
exports.noMarPad = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  marginBottom: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0
};
exports.noMarPadVert = {
  paddingBottom: 0,
  paddingTop: 0,
  marginBottom: 0,
  marginTop: 0
};
exports.border = (color, width = 1) => ({
  borderBottomWidth: width,
  borderBottomColor: color,
  borderTopWidth: width,
  borderTopColor: color,
  borderRightWidth: width,
  borderRightColor: color,
  borderLeftWidth: width,
  borderLeftColor: color
});
exports.margin = margin => ({
  marginLeft: margin,
  marginRight: margin,
  marginBottom: margin,
  marginTop: margin
});
exports.padding = padding => ({
  paddingBottom: padding,
  paddingTop: padding,
  paddingRight: padding,
  paddingLeft: padding
});
exports.msgOnError = (touched, error) => {
  if (touched && error)
    return React.createElement(
      native_base_1.Text,
      { style: { color: custom_1.default.brandDanger } },
      error
    );
  return undefined;
};
//# sourceMappingURL=utilsUi.js.map
