import { storiesOf } from "@storybook/react-native";
import { baseDecorator } from "../../../utils/decorators";
import * as React from "react";
import { AvatarScreen } from "../AvatarScreen";

storiesOf("AvatarScreen", module)
  .addDecorator(baseDecorator)
  .add("container", () => (
    <AvatarScreen
      navigation={{
        // @ts-ignore
        navigate: (screen: string) => console.log("navigate, screen: ", screen)
      }}
    />
  ));
