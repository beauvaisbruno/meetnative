"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intl_1 = require("./intl");
exports.default = (english, args) => {
  return intl_1.translate(dictionary, english, args);
};
const dictionary = {
  English: {
    fr: "Anglais"
  }
};
//# sourceMappingURL=lang.js.map
