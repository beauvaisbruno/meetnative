import { shallow } from "enzyme";
import * as React from "react";
import toJson from "enzyme-to-json";
import { TeachLevel } from "../../../TeachLevel";
import LangsToTeachSelector from "../LangsToTeachSelector";

it("LangsToTeachSelector", () => {
  const onChange = jest.fn();
  const tree = shallow(
    <LangsToTeachSelector
      languagesToTeach={{ spanish: TeachLevel.fluent }}
      onChange={onChange}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const addBtn = tree.findWhere(node => node.prop("testID") === "addBtn");
  addBtn.props().onPress();
  expect(onChange).toBeCalledWith({
    spanish: TeachLevel.fluent,
    english: TeachLevel.fluent
  });
  const tree2 = shallow(
    <LangsToTeachSelector
      languagesToTeach={{
        english: TeachLevel.fluent,
        spanish: TeachLevel.fluent,
        italian: TeachLevel.fluent
      }}
      onChange={onChange}
    />
  );
  expect(toJson(tree2)).toMatchSnapshot();
  const langPicker = tree2.findWhere(
    node => node.prop("testID") === "lang-english"
  );
  langPicker.props().onValueChange("spanish");
  expect(onChange).toBeCalledWith({
    spanish: TeachLevel.fluent,
    italian: TeachLevel.fluent
  });
  const levelPicker = tree2.findWhere(
    node => node.prop("testID") === "level-english"
  );
  levelPicker.props().onValueChange(TeachLevel.native);
  expect(onChange).toBeCalledWith({
    english: TeachLevel.native,
    spanish: TeachLevel.fluent,
    italian: TeachLevel.fluent
  });
  const deleteBtn = tree2.findWhere(
    node => node.prop("testID") === "delete-english"
  );
  deleteBtn.props().onPress();
  expect(onChange).toBeCalledWith({
    spanish: TeachLevel.fluent,
    italian: TeachLevel.fluent
  });
});
