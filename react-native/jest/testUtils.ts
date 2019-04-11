// @ts-ignore
import { ReactWrapper, ShallowWrapper } from "enzyme";

//tree.findWhere((node => node.prop("testID") === "prop")).exists();
export function expectTestIDPropExists(
  tree: ShallowWrapper | ReactWrapper,
  prop: string
) {
  let treefindWhere;
  if (tree instanceof ReactWrapper)
    treefindWhere = tree.findWhere(node => node.prop("testID") === prop);
  else treefindWhere = tree.findWhere(node => node.prop("testID") === prop);
  expect(treefindWhere.exists()).toEqual(true);
}
export function expectExists(
  tree: ShallowWrapper | ReactWrapper,
  component: string
) {
  expect(tree.find(component).exists()).toEqual(true);
}

const mathCopy = Object.create(global.Math);
export function mockMath(rndValue = 0.5) {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;
  return rndValue;
}

export function unMockMath() {
  global.Math = mathCopy;
}

const nowCopy = Date.now;
// const dateCopy = Object.create(global.Date);
export function mockDate(date = 1546300800000 /*01/01/2019*/) {
  // const mockDate = Object.create(global.Date);
  Date.now = () => date;
  // global.Date = mockDate;
  return date;
}

export function unMockDate() {
  // global.Date = dateCopy;
  Date.now = nowCopy;
}
