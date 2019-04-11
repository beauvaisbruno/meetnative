import { onCreateMessage } from "./onCreateMessage";

try {
  module.exports = {
    onCreateMessage
  };
} catch (error) {
  console.log("error: ", error);
}
