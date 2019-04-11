jest.mock("react-navigation", () => {
  return {
    withNavigation: (param: any) => param
  };
});

jest.mock("../img/Avatars", () => {
  return {
    avatars: ["avatar1", "avatar2"]
  };
});

import * as React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { AvatarScreen } from "../AvatarScreen";

it("Age Selector", async () => {
  const navigate = jest.fn();
  // @ts-ignore
  const tree = shallow(<AvatarScreen navigation={{ navigate }} />);
  expect(toJson(tree)).toMatchSnapshot();
  const TouchableHighlight = tree.findWhere(
    node => node.prop("testID") === "1"
  );
  TouchableHighlight.props().onPress();
  expect(navigate).toBeCalledWith("ProfileContainer", { avatar: "1" });
});
