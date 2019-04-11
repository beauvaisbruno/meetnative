"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intl_1 = require("../config/intl");
exports.default = (english, args) => {
  return intl_1.translate(dictionary, english, args);
};
const dictionary = {
  OK: {
    fr: "OK"
  },
  yo: {
    fr: "ans"
  },
  Speak: {
    fr: "Parle"
  },
  Learn: {
    fr: "Apprend"
  },
  Native: {
    fr: "Natif"
  },
  Bilingual: {
    fr: "Bilingue"
  },
  Fluent: {
    fr: "Courant"
  },
  "Beginner A1/A2": {
    fr: "Débutant A1/A2"
  },
  "Intermediate B1/B2": {
    fr: "Intermédiaire B1/B2"
  },
  "Fluent C1/C2": {
    fr: "Courant C1/C2"
  }
};
//# sourceMappingURL=langC.js.map
