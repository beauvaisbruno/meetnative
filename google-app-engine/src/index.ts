console.log("start");
import { createApolloServer } from "./apollo";
try {
  const PORT = Number(process.env.PORT) || 8080;
  console.log("start server port:", PORT);
  createApolloServer()
    .listen({ port: PORT })
    .then(({ url }) => console.log(`🚀 Server ready at ${url} port ${PORT}`));
} catch (error) {
  console.log("error: ", error);
}
