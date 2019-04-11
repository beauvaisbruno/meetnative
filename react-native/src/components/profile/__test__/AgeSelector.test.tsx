import { shallow } from "enzyme";
import { AgeSelector } from "../AgeSelector";
import * as React from "react";
import toJson from "enzyme-to-json";

it("Age Selector", async () => {
  const onChange = jest.fn();
  const tree = shallow(<AgeSelector value={1} onChange={onChange} />);
  expect(toJson(tree)).toMatchSnapshot();
  const picker = tree.findWhere(node => node.prop("testID") === "picker");
  picker.props().onValueChange(10);
  expect(onChange).toBeCalledWith(10);
});
