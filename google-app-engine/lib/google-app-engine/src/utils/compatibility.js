"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mockRequire;
function filterPngRequire() {
  if (mockRequire) return;
  //eslint-disable-next-line
  const Module = require("module");
  const originalRequire = Module.prototype.require;
  Module.prototype.require = function(file) {
    return file.indexOf("png") === -1
      ? //eslint-disable-next-line
        originalRequire.apply(this, arguments)
      : file;
  };
  mockRequire = true;
}
exports.filterPngRequire = filterPngRequire;
//# sourceMappingURL=compatibility.js.map
