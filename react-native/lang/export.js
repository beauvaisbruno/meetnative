"use strict";
/* eslint-disable quotes */
/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var srcPath = "../src";
var locale = "fr";
var langs = {};
var exportLang = function () {
    console.log("export langs ", locale, " from path: ", srcPath);
    var paths = util_1.walkSync(srcPath);
    // console.log("path: ", paths);
    var codePaths = util_1.keepRelevantFiles(paths);
    console.log("codePaths: ", codePaths);
    codePaths.forEach(function (path) {
        var lines = util_1.readLinesSync(path);
        var langPath;
        var useLang = false;
        lines.forEach(function (line) {
            if (line.includes("import lang from ")) {
                var split = line.split('"');
                langPath = split[1];
            }
            if (line.includes('lang("'))
                useLang = true;
        });
        if (!langPath) {
            if (useLang)
                throw Error("no lang import detected in " + path);
            else
                return;
        }
        langPath = util_1.resolvePaths(path, langPath);
        if (!langs[langPath])
            langs[langPath] = {};
        var dico = langs[langPath];
        lines.forEach(function (line) {
            if (line.includes('lang("')) {
                var keys = line.match(/lang\("([^)]+)"/g);
                if (!keys)
                    console.log("!line.match && includes, line: ", line, keys);
                keys.forEach(function (key) {
                    key = key.replace('lang("', "").replace('"', "");
                    // if (key.includes(" ")) key = '"' + key + '"';
                    dico[key] = "";
                });
            }
        });
    });
    Object.keys(langs).forEach(function (path) {
        var dico = util_1.getDico(path);
        Object.keys(dico).forEach(function (key) {
            if (langs[path][key] === undefined) {
                console.warn("key not used in ", path, ": ", key);
                return;
            }
            if (dico[key][locale])
                langs[path][key] = dico[key][locale];
        });
    });
    console.log("langs: ", Object.keys(langs));
    var content = locale + "\t" + util_1.getFormattedDate() + "\r\n";
    Object.keys(langs).forEach(function (path) {
        content += "[" + path + "]\r\n";
        Object.keys(langs[path]).forEach(function (key) {
            content += key + "\t" + langs[path][key] + "\r\n";
        });
        content += "\r\n";
    });
    var fileName = "export/" + locale + "_" + util_1.getFormattedDate() + ".tsv";
    util_1.writeFile(fileName, content);
    console.log("write export file to: ", fileName);
    // console.log("content: ", content);
};
exportLang();
