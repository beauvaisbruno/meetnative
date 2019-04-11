"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilsUi_1 = require("../utilsUi");
it("formatDuration", () => {
    let since = Date.now() - 5 * 60 * 60 * 1000;
    console.log("formatDuration: ", utilsUi_1.formatDuration(since));
    since = Date.now() - 26 * 60 * 60 * 1000;
    console.log("formatDuration: ", utilsUi_1.formatDuration(since));
});
