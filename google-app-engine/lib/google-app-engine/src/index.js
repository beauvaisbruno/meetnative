"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start");
const apollo_1 = require("./apollo");
try {
  const PORT = Number(process.env.PORT) || 8080;
  console.log("start server port:", PORT);
  apollo_1
    .createApolloServer()
    .listen({ port: PORT })
    .then(({ url }) => console.log(`🚀 Server ready at ${url} port ${PORT}`));
} catch (error) {
  console.log("error: ", error);
}
//# sourceMappingURL=index.js.map
