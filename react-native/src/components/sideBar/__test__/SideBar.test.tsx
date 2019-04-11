import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import SideBar, { renderRows } from "../SideBar";

it("sidebar", () => {
  const navigate = jest.fn();

  const navigation = {
    closeDrawer: jest.fn(),
    navigate,
    state: { routeName: "routeName" }
  };

  const routes = {
    one: { menuLabel: "menuLabelOne" },
    two: { menuLabel: "menuLabelTwo" }
  };
  // @ts-ignore
  const tree = shallow(<SideBar routes={routes} navigation={navigation} />);
  expect(toJson(tree)).toMatchSnapshot();

  const dataArray: [{ key: string; menuLabel: string }] = tree
    .find("Styled(List)")
    .prop("dataArray");

  dataArray.forEach(data => {
    // @ts-ignore
    const listItems = shallow(renderRows(data, navigation));
    expect(toJson(listItems)).toMatchSnapshot();
    const submitBtn = listItems.findWhere(
      node => node.prop("testID") === data.key
    );
    submitBtn.props().onPress();
    expect(navigate).toBeCalledWith(data.key);
  });
});
