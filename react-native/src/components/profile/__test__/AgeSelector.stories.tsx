import { storiesOf } from "@storybook/react-native";
import { baseDecorator } from "../../../utils/decorators";
import * as React from "react";
import { AgeSelector } from "../AgeSelector";

storiesOf("AgeSelector", module)
  .addDecorator(baseDecorator)
  .add("container", () => (
    <AgeSelector
      value={20}
      onChange={value => console.log("onChange: ", value)}
    />
  ));
