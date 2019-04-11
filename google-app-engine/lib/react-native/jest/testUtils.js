"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const enzyme_1 = require("enzyme");
//tree.findWhere((node => node.prop("testID") === "prop")).exists();
function expectTestIDPropExists(tree, prop) {
  let treefindWhere;
  if (tree instanceof enzyme_1.ReactWrapper)
    treefindWhere = tree.findWhere(node => node.prop("testID") === prop);
  else treefindWhere = tree.findWhere(node => node.prop("testID") === prop);
  expect(treefindWhere.exists()).toEqual(true);
}
exports.expectTestIDPropExists = expectTestIDPropExists;
function expectExists(tree, component) {
  expect(tree.find(component).exists()).toEqual(true);
}
exports.expectExists = expectExists;
const mathCopy = Object.create(global.Math);
function mockMath(rndValue = 0.5) {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;
  return rndValue;
}
exports.mockMath = mockMath;
function unMockMath() {
  global.Math = mathCopy;
}
exports.unMockMath = unMockMath;
const nowCopy = Date.now;
// const dateCopy = Object.create(global.Date);
function mockDate(date = 1546300800000 /*01/01/2019*/) {
  // const mockDate = Object.create(global.Date);
  Date.now = () => date;
  // global.Date = mockDate;
  return date;
}
exports.mockDate = mockDate;
function unMockDate() {
  // global.Date = dateCopy;
  Date.now = nowCopy;
}
exports.unMockDate = unMockDate;
//# sourceMappingURL=testUtils.js.map
