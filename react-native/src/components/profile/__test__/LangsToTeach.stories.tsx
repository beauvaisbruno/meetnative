import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { TeachLevel } from "../../../TeachLevel";
import { baseDecorator } from "../../../utils/decorators";
import LangsToTeachSelector from "../LangsToTeachSelector";

storiesOf("LangsToTeachSelector", module)
  .addDecorator(baseDecorator)
  .add("default", () => (
    <LangsToTeachSelector
      languagesToTeach={{
        english: TeachLevel.native,
        spanish: TeachLevel.fluent
      }}
      onChange={(languagesToTeach: { [key: string]: string }) =>
        console.log("onChange, languagesToTeach: ", languagesToTeach)
      }
    />
  ));
