"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start");
var apollo_1 = require("./apollo");
try {
    var PORT_1 = Number(process.env.PORT) || 8080;
    console.log("start server port:", PORT_1);
    apollo_1.createApolloServer()
        .listen({ port: PORT_1 })
        .then(function (_a) {
        var url = _a.url;
        return console.log("\uD83D\uDE80 Server ready at " + url + " port " + PORT_1);
    });
}
catch (error) {
    console.log("error: ", error);
}
console.log("done");
