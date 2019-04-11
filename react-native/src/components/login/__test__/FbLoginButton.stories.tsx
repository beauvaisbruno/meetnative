import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { FbLoginButton, IProps } from "../FbLoginButton";

const props : IProps = {
  fetching: false,
  error: false,
  data: undefined,
  errorData: undefined,
  facebookLogin:()=> {
    console.log("facebookLogin: ");
  },
};


storiesOf("FbLoginButton", module)
  .add("default", () => (
    <FbLoginButton {...props}/>
  ))
  .add("fetching", () => (
    <FbLoginButton {...props} fetching/>
  ))
  .add("error", () => (
    <FbLoginButton {...props} error/>
  ))

;
