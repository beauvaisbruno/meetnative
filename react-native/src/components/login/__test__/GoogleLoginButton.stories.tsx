import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { GoogleLoginButton, IProps } from "../GoogleLoginButton";

const props : IProps = {
  fetching: false,
  error: false,
  data: undefined,
  errorData: undefined,
  googleLogin:()=> {
    console.log("googleLogin: ");
  },
};


storiesOf("GoogleLoginButton", module)
  .add("default", () => (
    <GoogleLoginButton {...props}/>
  ))
  .add("fetching", () => (
    <GoogleLoginButton {...props} fetching/>
  ))
  .add("error", () => (
    <GoogleLoginButton {...props} error/>
  ))

;
