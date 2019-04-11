"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-eval */
var fs = require("fs");
var path = require("path");
exports.writeFile = function (path, content) {
    fs.writeFile(path, content, function (err) {
        if (err) {
            return console.log(err);
        }
    });
};
exports.readLinesSync = function (path) {
    return fs.readFileSync(path, "utf-8").split("\n");
};
exports.parseCsv = function (path) {
    var lang = {};
    var locale = "";
    var currentLang = "";
    fs.readFileSync(path, "utf-8")
        .split("\r\n")
        .forEach(function (line) {
        var cols = line.split("\t");
        if (locale === "")
            locale = cols[0];
        else {
            if (cols.length === 1)
                currentLang = cols[0];
            else {
            }
        }
    });
    return { lang: lang, locale: locale };
};
exports.getDico = function (path) {
    var content = fs.readFileSync(path + ".ts", "utf-8");
    content = content.substring(content.indexOf("const dictionary = "));
    var dico = eval(content + "dictionary;");
    if (!dico)
        throw Error("impossible to load dictionary: " + path);
    return dico;
};
exports.resolvePaths = function (codePath, langPath) {
    return path.relative(__dirname, path.resolve(path.dirname(codePath), langPath));
};
exports.keepRelevantFiles = function (paths) {
    var codePaths = [];
    paths.forEach(function (path) {
        if (!path.includes(".ts"))
            return;
        if (path.includes(".stories.") ||
            path.includes(".test.") ||
            path.includes("__test__"))
            return;
        if (path.includes("lang.ts"))
            return;
        codePaths.push(path);
    });
    return codePaths;
};
exports.walkSync = function (dir, filelist) {
    var path = path || require("path");
    var fs = fs || require("fs"), files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = exports.walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};
exports.getFormattedDate = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    return (date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        "_" +
        hour +
        "-" +
        min +
        "-" +
        sec);
};
