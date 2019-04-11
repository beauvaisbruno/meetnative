/* eslint-disable */

const jsdom = function() {
  try {
    const { JSDOM } = require("jsdom");
    const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
    const { window } = jsdom;

    // @ts-ignore
    function copyProps(src: any, target: any) {
      Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target)
      });
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
    console.error = (message: any) => {
      if (message.startsWith("Warning:")) {
        return;
      }
      originalConsoleError(message);
    };
  } catch (error) {
    console.log("JSDOM error: ", error);
  }
};
export default jsdom;
