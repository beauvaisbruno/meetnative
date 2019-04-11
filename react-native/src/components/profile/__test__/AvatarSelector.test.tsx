jest.mock("react-navigation", () => {
  return {
    withNavigation: (param: any) => param
  };
});
import { shallow } from "enzyme";
import * as React from "react";
import toJson from "enzyme-to-json";
import { AvatarSelector } from "../AvatarSelector";

it("Avatar Selector", async () => {
  const navigate = jest.fn();
  const addListener = jest.fn((eventName, callback) => {
    callback("mockPayload");
  });
  const onChange = jest.fn();
  const tree = shallow(
    <AvatarSelector
      onChange={onChange}
      navigation={{
        navigate,
        // @ts-ignore
        addListener,
        // @ts-ignore
        state: { params: { avatar: "avatar" } }
      }}
    />
  );

  expect(toJson(tree)).toMatchSnapshot();
  expect(addListener.mock.calls[0][0]).toBe("willFocus");
  expect(onChange).toBeCalledWith("avatar");
  const TouchableHighlight = tree.findWhere(
    node => node.prop("testID") === "TouchableHighlight"
  );
  TouchableHighlight.props().onPress();

  expect(navigate).toBeCalledWith("AvatarScreen");
});
