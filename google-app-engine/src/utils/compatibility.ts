let mockRequire: boolean;
export function filterPngRequire() {
  if (mockRequire) return;
  //eslint-disable-next-line
  const Module = require("module");
  const originalRequire = Module.prototype.require;
  Module.prototype.require = function(file: string) {
    return file.indexOf("png") === -1
      ? //eslint-disable-next-line
        originalRequire.apply(this, arguments)
      : file;
  };
  mockRequire = true;
}
