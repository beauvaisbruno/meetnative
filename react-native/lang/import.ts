/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-eval */
/* eslint-disable quotes */
/* eslint-disable no-lonely-if */
import { getDico, writeFile } from "./util";

const src = "import/es.tsv";
const langs = {};

const fs = require("fs");
const importLang = () => {
  const lang = {};
  let locale = "";
  let currentLang = "";
  console.log("import file: ", src);
  fs.readFileSync(src, "utf-8")
    .split("\r\n")
    .forEach(line => {
      let cols: string[] = line.split("\t");
      cols = cols.filter(col => col !== "");
      if (cols.length === 0) return;
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
      } else {
        if (!lang[currentLang]) lang[currentLang] = {};
        const key = cols[0];
        if (lang[currentLang][key])
          throw Error(
            "This traduction already exist: " + currentLang + " " + cols[0]
          );
        lang[currentLang][key] = {
          [locale]: cols[1]
        };
      }
    });
  // console.log("csv: ", lang);
  const oldLang = {};
  Object.keys(lang).forEach(path => {
    oldLang[path] = getDico(path);

    Object.keys(lang[path]).forEach(key => {
      if (!oldLang[path][key]) oldLang[path][key] = {};
      if (!oldLang[path][key][locale]) oldLang[path][key][locale] = "";

      const oldTrad = oldLang[path][key][locale];
      const newTrad = lang[path][key][locale];
      if (oldTrad !== "" && oldTrad !== newTrad) {
        console.warn("traduction replaced, old: ", oldTrad, " => ", newTrad);
      }
      lang[path][key] = { ...oldLang[path][key], ...lang[path][key] };
    });
  });
  // console.log("merged: ", lang);
  Object.keys(lang).forEach(path => {
    const content = fs.readFileSync(path + ".ts", "utf-8");
    const header = content.substring(0, content.indexOf("const dictionary = "));
    const newContent =
      header + "const dictionary = " + JSON.stringify(lang[path]) + ";\r\n";
    // console.log(path, ": ", newContent);
    console.log("writeFile: ", path + ".ts");
    writeFile(path + ".ts", newContent);
  });
};
importLang();
