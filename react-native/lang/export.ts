/* eslint-disable quotes */
/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */

import {
  getDico,
  getFormattedDate,
  keepRelevantFiles,
  readLinesSync,
  resolvePaths,
  walkSync,
  writeFile
} from "./util";

const srcPath = "../src";
const locale = "fr";
const langs = {};
const exportLang = () => {
  console.log("export langs ", locale, " from path: ", srcPath);
  const paths = walkSync(srcPath);
  // console.log("path: ", paths);
  const codePaths = keepRelevantFiles(paths);
  console.log("codePaths: ", codePaths);
  codePaths.forEach(path => {
    const lines: [] = readLinesSync(path);
    let langPath;
    let useLang = false;
    lines.forEach((line: string) => {
      if (line.includes("import lang from ")) {
        const split = line.split('"');
        langPath = split[1];
      }
      if (line.includes('lang("')) useLang = true;
    });
    if (!langPath) {
      if (useLang) throw Error("no lang import detected in " + path);
      else return;
    }
    langPath = resolvePaths(path, langPath);
    if (!langs[langPath]) langs[langPath] = {};
    const dico = langs[langPath];
    lines.forEach((line: string) => {
      if (line.includes('lang("')) {
        const keys = line.match(/lang\("([^)]+)"/g);
        if (!keys) console.log("!line.match && includes, line: ", line, keys);
        keys.forEach(key => {
          key = key.replace('lang("', "").replace('"', "");
          // if (key.includes(" ")) key = '"' + key + '"';
          dico[key] = "";
        });
      }
    });
  });
  Object.keys(langs).forEach(path => {
    const dico = getDico(path);
    Object.keys(dico).forEach(key => {
      if (langs[path][key] === undefined) {
        console.warn("key not used in ", path, ": ", key);
        return;
      }
      if (dico[key][locale]) langs[path][key] = dico[key][locale];
    });
  });
  console.log("langs: ", Object.keys(langs));
  let content = locale + "\t" + getFormattedDate() + "\r\n";
  Object.keys(langs).forEach(path => {
    content += "[" + path + "]\r\n";
    Object.keys(langs[path]).forEach(key => {
      content += key + "\t" + langs[path][key] + "\r\n";
    });
    content += "\r\n";
  });
  const fileName = "export/" + locale + "_" + getFormattedDate() + ".tsv";
  writeFile(fileName, content);
  console.log("write export file to: ", fileName);
  // console.log("content: ", content);
};
exportLang();
