"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compatibility_1 = require("./compatibility");
compatibility_1.filterPngRequire();
const utils_1 = require("./utils");
const TeachLevel_1 = require("../../../react-native/src/TeachLevel");
const LearnLevel_1 = require("../../../react-native/src/LearnLevel");
const positive1 = utils_1.createFakeProfiles(
  {
    spanish: TeachLevel_1.TeachLevel.native,
    italian: TeachLevel_1.TeachLevel.bilingual,
    french: TeachLevel_1.TeachLevel.fluent
  },
  {
    english: LearnLevel_1.LearnLevel.beginner,
    german: LearnLevel_1.LearnLevel.intermediate,
    french: LearnLevel_1.LearnLevel.fluent
  }
);
utils_1.createDoc(positive1);
const positive2 = utils_1.createFakeProfiles(
  { italian: TeachLevel_1.TeachLevel.native },
  { spanish: LearnLevel_1.LearnLevel.beginner }
);
utils_1.createDoc(positive2);
const negative1 = utils_1.createFakeProfiles(
  { spanish: TeachLevel_1.TeachLevel.fluent },
  { english: LearnLevel_1.LearnLevel.beginner }
);
utils_1.createDoc(negative1);
const negative2 = utils_1.createFakeProfiles(
  { italian: TeachLevel_1.TeachLevel.native },
  { spanish: LearnLevel_1.LearnLevel.fluent }
);
utils_1.createDoc(negative2);
//# sourceMappingURL=addFakeProfiles.js.map
