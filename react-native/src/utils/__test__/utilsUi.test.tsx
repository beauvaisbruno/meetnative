import { formatDuration } from "../utilsUi";

it("formatDuration", () => {
  let since = Date.now() - 5 * 60 * 60 * 1000;
  console.log("formatDuration: ", formatDuration(since));
  since = Date.now() - 26 * 60 * 60 * 1000;
  console.log("formatDuration: ", formatDuration(since));
});
