import { shallow } from "enzyme";
import { AgeSelector } from "../AgeSelector";
import * as React from "react";
import toJson from "enzyme-to-json";
import LangsToLearnSelector from "../LangsToLearnSelector";
import { LearnLevel } from "../../../LearnLevel";

it("LangsToLearnSelector", async () => {
  const onChange = jest.fn();
  const tree = shallow(
    <LangsToLearnSelector
      languagesToLearn={{ spanish: LearnLevel.beginner }}
      onChange={onChange}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const addBtn = tree.findWhere(node => node.prop("testID") === "addBtn");
  addBtn.props().onPress();
  expect(onChange).toBeCalledWith({
    spanish: LearnLevel.beginner,
    english: LearnLevel.beginner
  });
  const tree2 = shallow(
    <LangsToLearnSelector
      languagesToLearn={{
        english: LearnLevel.beginner,
        spanish: LearnLevel.beginner,
        italian: LearnLevel.beginner
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
    spanish: LearnLevel.beginner,
    italian: LearnLevel.beginner
  });
  const levelPicker = tree2.findWhere(
    node => node.prop("testID") === "level-english"
  );
  levelPicker.props().onValueChange(LearnLevel.fluent);
  expect(onChange).toBeCalledWith({
    english: LearnLevel.fluent,
    spanish: LearnLevel.beginner,
    italian: LearnLevel.beginner
  });
  const deleteBtn = tree2.findWhere(
    node => node.prop("testID") === "delete-english"
  );
  deleteBtn.props().onPress();
  expect(onChange).toBeCalledWith({
    spanish: LearnLevel.beginner,
    italian: LearnLevel.beginner
  });
});
