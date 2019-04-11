import { storiesOf } from "@storybook/react-native";
import * as React from "react";
import { EmailLoginUi, IProps } from "../EmailLoginUi";
import { NavigationInjectedProps } from "react-navigation";
import lang from "../lang";

const props : NavigationInjectedProps & IProps = {
  navigation:{
    getParam:()=>"beauvaisbruno@gmail.com",
// @ts-ignore
    navigate:(param:string)=> console.log("navigate: ", param)
  },
  fetching: false,
  error: false,
  data: undefined,
  errorData: undefined,
  loginWithEmail:(values,actions)=> {
    console.log("loginWithEmail: ",values);
    actions.setSubmitting(false);
  },
};

const setErrors =(message: string) =>
  (values:any,actions:any)=> {
    actions.setErrors({ password:message});
    actions.setSubmitting(false);
};

const createErrorsComp =(message: string) =>
  (()=>(
    <EmailLoginUi
      {...props}
      error
      loginWithEmail={setErrors(message)}
      storyState={{formVisible:true}}
    />
  )
  )
;

storiesOf("EmailLoginUi", module)
  .add("collapsed", () => (
    <EmailLoginUi {...props}/>
  ))
  .add("success", () => (
    <EmailLoginUi {...props} storyState={{formVisible:true}}/>
  ))
  .add("fetching", () => (
    <EmailLoginUi {...props} fetching storyState={{formVisible:true}}/>
  ))
  .add("error", () => (
    // @ts-ignore
    <EmailLoginUi {...props} touched={{password:true}} errors={{password:lang("Connection impossible")}} storyState={{formVisible:true}}/>
  ))
  .add("no internet",createErrorsComp(lang("Connection impossible : internet is not available.")))
  .add("wrong-password",createErrorsComp(lang("This email account exist, but the password is wrong.")))
;
