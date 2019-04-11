import { storiesOf } from "@storybook/react-native";
import { baseDecorator } from "../../../utils/decorators";
import * as React from "react";
import { AvatarSelector } from "../AvatarSelector";

storiesOf("AvatarSelector", module)
  .addDecorator(baseDecorator)
  .add("default", () => (
    <AvatarSelector
      value={"cute"}
      onChange={(avatar: string) => console.log("onChange, avatar: ", avatar)}
      navigation={{
        // @ts-ignore
        navigate: (screen: string) => console.log("navigate, screen: ", screen),
        // @ts-ignore
        addListener: (_, __) => {}
        // state: { params: { avatar: "avatar" } }
      }}
    />
  ));
