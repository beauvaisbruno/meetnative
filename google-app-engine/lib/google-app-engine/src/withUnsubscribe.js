"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterall_1 = require("iterall");
exports.withUnsubscribe = (asyncIterator, onClose) => {
  return {
    next() {
      return asyncIterator.next();
    },
    return() {
      onClose();
      console.log("close...");
      // @ts-ignore
      return asyncIterator.return();
    },
    throw(error) {
      return Promise.reject(error);
    },
    [iterall_1.$$asyncIterator]() {
      return this;
    }
  };
};
//# sourceMappingURL=withUnsubscribe.js.map
