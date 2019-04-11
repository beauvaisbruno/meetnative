/* eslint-disable no-var */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable no-eval */
const fs = require("fs");
const path = require("path");

export const writeFile = (path, content) => {
  fs.writeFile(path, content, function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

export const readLinesSync = path => {
  return fs.readFileSync(path, "utf-8").split("\n");
};

export const parseCsv = path => {
  const lang = {};
  let locale = "";
  let currentLang = "";
  fs.readFileSync(path, "utf-8")
    .split("\r\n")
    .forEach(line => {
      const cols = line.split("\t");
      if (locale === "") locale = cols[0];
      else {
        if (cols.length === 1) currentLang = cols[0];
        else {
        }
      }
    });
  return { lang, locale };
};

export const getDico = path => {
  let content = fs.readFileSync(path + ".ts", "utf-8");
  content = content.substring(content.indexOf("const dictionary = "));
  const dico = eval(content + "dictionary;");
  if (!dico) throw Error("impossible to load dictionary: " + path);
  return dico;
};
export const resolvePaths = (codePath, langPath) => {
  return path.relative(
    __dirname,
    path.resolve(path.dirname(codePath), langPath)
  );
};

export const keepRelevantFiles = paths => {
  const codePaths = [];
  paths.forEach(path => {
    if (!path.includes(".ts")) return;
    if (
      path.includes(".stories.") ||
      path.includes(".test.") ||
      path.includes("__test__")
    )
      return;
    if (path.includes("lang.ts")) return;
    codePaths.push(path);
  });
  return codePaths;
};
export const walkSync = (dir, filelist?) => {
  var path = path || require("path");
  var fs = fs || require("fs"),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

export const getFormattedDate = () => {
  const date = new Date();
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();
  let hour: any = date.getHours();
  let min: any = date.getMinutes();
  let sec: any = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    "_" +
    hour +
    "-" +
    min +
    "-" +
    sec
  );
};
