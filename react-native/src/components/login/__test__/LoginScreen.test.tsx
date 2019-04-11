import { shallow } from "enzyme";
import * as React from "react";
import toJson from "enzyme-to-json";
import LoginScreen from "../LoginScreen";

it("Logout Button", () => {
  const tree = shallow(<LoginScreen />);
  expect(toJson(tree)).toMatchSnapshot();
});
