import { filterPngRequire } from "./compatibility";
filterPngRequire();
import { createDoc, createFakeProfiles } from "./utils";
import { TeachLevel } from "../../../react-native/src/TeachLevel";
import { LearnLevel } from "../../../react-native/src/LearnLevel";

const positive1 = createFakeProfiles(
  {
    spanish: TeachLevel.native,
    italian: TeachLevel.bilingual,
    french: TeachLevel.fluent
  },
  {
    english: LearnLevel.beginner,
    german: LearnLevel.intermediate,
    french: LearnLevel.fluent
  }
);
createDoc(positive1);
const positive2 = createFakeProfiles(
  { italian: TeachLevel.native },
  { spanish: LearnLevel.beginner }
);
createDoc(positive2);
const negative1 = createFakeProfiles(
  { spanish: TeachLevel.fluent },
  { english: LearnLevel.beginner }
);
createDoc(negative1);
const negative2 = createFakeProfiles(
  { italian: TeachLevel.native },
  { spanish: LearnLevel.fluent }
);
createDoc(negative2);
