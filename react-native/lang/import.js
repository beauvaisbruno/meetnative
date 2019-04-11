"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-eval */
/* eslint-disable quotes */
/* eslint-disable no-lonely-if */
var util_1 = require("./util");
var src = "import/es.tsv";
var langs = {};
var fs = require("fs");
var importLang = function () {
    var lang = {};
    var locale = "";
    var currentLang = "";
    console.log("import file: ", src);
    fs.readFileSync(src, "utf-8")
        .split("\r\n")
        .forEach(function (line) {
        var _a;
        var cols = line.split("\t");
        cols = cols.filter(function (col) { return col !== ""; });
        if (cols.length === 0)
            return;
        // console.log("cols: ", cols);
        if (locale === "" && cols[0].length === 2) {
            locale = cols[0];
            return;
        }
        if (locale === "")
            throw Error("Impossible to parse locale, line: " + line);
        if (RegExp(/^\[.+\]/).test(cols[0])) {
            currentLang = cols[0].replace("[", "").replace("]", "");
            return;
        }
        if (currentLang === "")
            throw Error("Impossible to parse currentLang, line: " + line);
        if (cols.length !== 2) {
            console.log("cols: ", cols);
            throw Error("Impossible to parse this line: " + line);
        }
        else {
            if (!lang[currentLang])
                lang[currentLang] = {};
            var key = cols[0];
            if (lang[currentLang][key])
                throw Error("This traduction already exist: " + currentLang + " " + cols[0]);
            lang[currentLang][key] = (_a = {},
                _a[locale] = cols[1],
                _a);
        }
    });
    // console.log("csv: ", lang);
    var oldLang = {};
    Object.keys(lang).forEach(function (path) {
        oldLang[path] = util_1.getDico(path);
        Object.keys(lang[path]).forEach(function (key) {
            if (!oldLang[path][key])
                oldLang[path][key] = {};
            if (!oldLang[path][key][locale])
                oldLang[path][key][locale] = "";
            var oldTrad = oldLang[path][key][locale];
            var newTrad = lang[path][key][locale];
            if (oldTrad !== "" && oldTrad !== newTrad) {
                console.warn("traduction replaced, old: ", oldTrad, " => ", newTrad);
            }
            lang[path][key] = __assign({}, oldLang[path][key], lang[path][key]);
        });
    });
    // console.log("merged: ", lang);
    Object.keys(lang).forEach(function (path) {
        var content = fs.readFileSync(path + ".ts", "utf-8");
        var header = content.substring(0, content.indexOf("const dictionary = "));
        var newContent = header + "const dictionary = " + JSON.stringify(lang[path]) + ";\r\n";
        // console.log(path, ": ", newContent);
        console.log("writeFile: ", path + ".ts");
        util_1.writeFile(path + ".ts", newContent);
    });
};
importLang();
