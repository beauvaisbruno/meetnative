"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// based on iphone 5s's scale
var react_native_1 = require("react-native");
var geolib_1 = require("geolib");
var utils_1 = require("./utils");
var native_base_1 = require("native-base");
var Language_1 = require("../Language");
var TeachLevel_1 = require("../TeachLevel");
var React = require("react");
var LearnLevel_1 = require("../LearnLevel");
// @ts-ignore
var moment_with_locales_1 = require("moment/min/moment-with-locales");
var intl_1 = require("../config/intl");
var custom_1 = require("../config/native-base-theme/variables/custom");
exports.logAsyncStorage = function () {
    react_native_1.AsyncStorage.getAllKeys(function (error, keys) {
        if (error)
            console.log("getAllKeys error: ", error);
        console.log("logAsyncStorage keys: ", keys);
        if (keys)
            keys.forEach(function (key) {
                react_native_1.AsyncStorage.getItem(key).then(function (value) {
                    console.log("key: ", key, "=> ", value);
                });
            });
    });
};
exports.shortFormat = function (text, max) {
    if (text.length <= max)
        return "« " + text + " »";
    return "... « " + text.substr(0, text.lastIndexOf(" ", max)) + "...»";
};
exports.createLangPickers = function () {
    var langs = [];
    Language_1.default.all.forEach(function (value) {
        langs.push({ value: value, label: Language_1.default.lang(value) });
    });
    langs = langs.sort(function (a, b) {
        return a.label.localeCompare(b.label);
    });
    var rows = [];
    langs.forEach(function (_a) {
        var value = _a.value, label = _a.label;
        rows.push(<native_base_1.Picker.Item label={label} value={value} key={value}/>);
    });
    return rows;
};
exports.formatDuration = function (since) {
    var lang = intl_1.locale();
    var now = new Date().getTime();
    if (now - since < 24 * 60 * 60 * 1000)
        return moment_with_locales_1.default(since)
            .locale(lang)
            .fromNow();
    return moment_with_locales_1.default(since)
        .locale(lang)
        .calendar();
};
var scale = react_native_1.Dimensions.get("window").width / 320;
function font(s) {
    var newSize = s * scale;
    if (react_native_1.Platform.OS === "ios") {
        return Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize)) - 2;
}
exports.font = font;
function distanceKm(fromLat, fromLon, toLat, toLon) {
    return Math.round(geolib_1.default.getDistance({ latitude: fromLat, longitude: fromLon }, { latitude: toLat, longitude: toLon }) / 1000);
}
exports.distanceKm = distanceKm;
function teachRows(profile, fontSize, userLearn, bestMatchOnly) {
    if (bestMatchOnly === void 0) { bestMatchOnly = false; }
    var teachRows = [];
    Object.keys(profile.langsToTeach).some(function (key) {
        var _a;
        var style = { fontSize: fontSize, color: custom_1.default.textGreyLight };
        var matched = utils_1.langMatch(userLearn, (_a = {}, _a[key] = profile.langsToTeach[key], _a));
        if (matched)
            style.color = custom_1.default.brandSecondary;
        if (!bestMatchOnly || matched)
            teachRows.push(<native_base_1.Text style={style} key={"teach-" + key}>
          {Language_1.default.lang(key) +
                " " +
                TeachLevel_1.TeachLevel.lang(profile.langsToTeach[key])}
        </native_base_1.Text>);
        return bestMatchOnly && matched;
    });
    return teachRows;
}
exports.teachRows = teachRows;
function learnRows(profile, fontSize, userTeach, bestMatchOnly) {
    if (bestMatchOnly === void 0) { bestMatchOnly = false; }
    var learnRows = [];
    Object.keys(profile.langsToLearn).some(function (key) {
        var _a;
        var style = { fontSize: fontSize, color: custom_1.default.textGreyLight };
        var matched = utils_1.langMatch((_a = {}, _a[key] = profile.langsToLearn[key], _a), userTeach);
        if (matched)
            style.color = custom_1.default.brandSecondary;
        if (!bestMatchOnly || matched)
            learnRows.push(<native_base_1.Text style={style} key={"learn-" + key}>
          {Language_1.default.lang(key) +
                " " +
                LearnLevel_1.LearnLevel.lang(profile.langsToLearn[key])}
        </native_base_1.Text>);
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
exports.border = function (color, width) {
    if (width === void 0) { width = 1; }
    return ({
        borderBottomWidth: width,
        borderBottomColor: color,
        borderTopWidth: width,
        borderTopColor: color,
        borderRightWidth: width,
        borderRightColor: color,
        borderLeftWidth: width,
        borderLeftColor: color
    });
};
exports.margin = function (margin) { return ({
    marginLeft: margin,
    marginRight: margin,
    marginBottom: margin,
    marginTop: margin
}); };
exports.padding = function (padding) { return ({
    paddingBottom: padding,
    paddingTop: padding,
    paddingRight: padding,
    paddingLeft: padding
}); };
exports.msgOnError = function (touched, error) {
    if (touched && error)
        return <native_base_1.Text style={{ color: custom_1.default.brandDanger }}>{error}</native_base_1.Text>;
    return undefined;
};
