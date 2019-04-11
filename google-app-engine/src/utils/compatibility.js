"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mockRequire;
function filterPngRequire() {
    if (mockRequire)
        return;
    //eslint-disable-next-line
    var Module = require("module");
    var originalRequire = Module.prototype.require;
    Module.prototype.require = function (file) {
        // if (file.indexOf("png") === -1)
        return file.indexOf("png") === -1
            ? //eslint-disable-next-line
                originalRequire.apply(this, arguments)
            : file;
    };
    mockRequire = true;
}
exports.filterPngRequire = filterPngRequire;
