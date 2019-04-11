// import { filterPngRequire } from "./lib/firebase-functions/src/compatibility";
// import { filterPngRequire } from "./src/compatibility";
// filterPngRequire();
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;
