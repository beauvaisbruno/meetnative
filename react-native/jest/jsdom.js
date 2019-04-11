"use strict";
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = function() {
  try {
    const { JSDOM } = require("jsdom");
    const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
    const { window } = jsdom;
    // @ts-ignore
    function copyProps(src, target) {
      Object.defineProperties(
        target,
        Object.assign(
          {},
          Object.getOwnPropertyDescriptors(src),
          Object.getOwnPropertyDescriptors(target)
        )
      );
    }
    // @ts-ignore
    global.window = window;
    // @ts-ignore
    global.document = window.document;
    // @ts-ignore
    global.navigator = {
      userAgent: "node.js"
    };
    copyProps(window, global);
    // @ts-ignore
    global.fetch = require("jest-fetch-mock");
    const originalConsoleError = console.error;
    console.error = message => {
      if (message.startsWith("Warning:")) {
        return;
      }
      originalConsoleError(message);
    };
  } catch (error) {
    console.log("JSDOM error: ", error);
  }
};
exports.default = jsdom;
