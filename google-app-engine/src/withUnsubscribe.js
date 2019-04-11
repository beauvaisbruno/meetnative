"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iterall_1 = require("iterall");
exports.withUnsubscribe = function (asyncIterator, onClose) {
    var _a;
    return _a = {
            next: function () {
                return asyncIterator.next();
            },
            return: function () {
                onClose();
                console.log("close...");
                // @ts-ignore
                return asyncIterator.return();
            },
            throw: function (error) {
                return Promise.reject(error);
            }
        },
        _a[iterall_1.$$asyncIterator] = function () {
            return this;
        },
        _a;
};
