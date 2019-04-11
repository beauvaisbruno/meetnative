import * as React from "react";

import { storiesOf } from "@storybook/react-native";
import LoginScreen from "../LoginScreen";
import ResetPasswordScreen from "../ResetPasswordScreen";
import { storeBaseAndNavigatorDecorator } from "../../../utils/decorators";

storiesOf("Login", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  .add("LoginScreen", () => (
    <LoginScreen/>
  ))
.add("ResetPasswordScreen", () => (
  <ResetPasswordScreen/>
))
;
