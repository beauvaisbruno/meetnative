import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { ResetPasswordScreen } from "../ResetPasswordScreen";
import lang from "../lang";

const compErr =(message: string) =>
  (()=>(
      // @ts-ignore
      <ResetPasswordScreen
        error
        touched={{email:true}} errors={{email:message}}
      />
    )
  )
;

storiesOf("ResetPasswordScreen", module)
  .add("default", () => (
    // @ts-ignore
    <ResetPasswordScreen/>
  ))
  .add("fetching", () => (
    // @ts-ignore
    <ResetPasswordScreen fetching />
  ))
  .add("error", compErr(lang("Connection impossible.")))
  .add("no internet",compErr(lang("Connection impossible : internet is not available.")))
  .add("wrong-account",compErr(lang("This email account doesn't exist.")))
;
