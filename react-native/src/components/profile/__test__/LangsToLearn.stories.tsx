import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { GooglePlacesInput } from "../GooglePlacesInput";
import { LearnLevel } from "../../../LearnLevel";
import LangsToLearnSelector from "../LangsToLearnSelector";
import { baseDecorator } from "../../../utils/decorators";

storiesOf("LangsToLearnSelector", module)
  .addDecorator(baseDecorator)
  .add("default", () => (
    <LangsToLearnSelector
      languagesToLearn={{
        english: LearnLevel.fluent,
        spanish: LearnLevel.beginner
      }}
      onChange={(languagesToLearn: { [key: string]: string }) =>
        console.log("onChange, languagesToLearn: ", languagesToLearn)
      }
    />
  ));
