import { storiesOf } from "@storybook/react-native";
import { storeBaseAndNavigatorDecorator } from "../../../utils/decorators";
import * as React from "react";
import LogoutButton from "../LogoutButton";

storiesOf("LogoutButton", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  .add("container", () => (
    // @ts-ignore
    <LogoutButton/>
  ))
;
