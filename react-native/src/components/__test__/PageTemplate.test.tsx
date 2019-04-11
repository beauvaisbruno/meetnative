import { shallow } from "enzyme";
import * as React from "react";
import PageTemplate from "../PageTemplate";
import { View } from "react-native";
import toJson from "enzyme-to-json";

it("pageTemplate", () => {
  class Comp extends React.Component<any> {
    render() {
      return <View />;
    }
  }
  const openDrawer = jest.fn();
  const Node = PageTemplate(Comp, "Home");
  // @ts-ignore
  const tree = shallow(<Node navigation={{ openDrawer }} />);
  expect(toJson(tree)).toMatchSnapshot();
});
