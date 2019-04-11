import React, { Component, Props } from "react";
import {
  View,
  Button,
  Icon,
  Text,
  Item as FormItem,
  Input,
  Label
} from "native-base";
import { Formik, FormikActions, InjectedFormikProps } from "formik";
import * as Yup from "yup";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import { IApplicationState } from "../../rootReducers";
import { LoginActions } from "./loginReducer";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";
import { msgOnError } from "../../utils/utilsUi";

export interface IState {
  formVisible: boolean;
}
export interface IUser {
  email: string;
  password: string;
}

export type IProps = IActionResult<any> & {
  storyState?: object;
  loginWithEmail: (
    values: IUser,
    action: FormikActions<IUser | undefined>
  ) => void;
};

export class EmailLoginUi extends Component<
  NavigationInjectedProps & IProps,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      formVisible: false,
      ...props.storyState
    };
  }
  render() {
    return (
      <View>
        {this.state.formVisible && (
          <Formik
            enableReinitialize
            // initialValues={{
            //   email: this.props.navigation.getParam("resetEmail", "a@a.com"),
            //   password: "azazazaz"
            // }}
            initialValues={{
              email: this.props.navigation.getParam("resetEmail", ""),
              password: "",
              connection: undefined
            }}
            validationSchema={getValidationSchema()}
            onSubmit={(values, actions) => {
              this.props.loginWithEmail(values, actions);
            }}
          >
            {(injectedProps: InjectedFormikProps<IUser, IUser> & IProps) => (
              <FormUi {...injectedProps} {...this.props} />
            )}
          </Formik>
        )}
        {this.state.formVisible || (
          <View padder>
            <Button
              block
              rounded
              success
              onPress={() => this.handleSetFormVisible()}
              testID={"formVisibleBtn"}
            >
              <Icon name="ios-mail" fontSize={30} />
              <Text>{lang("Login with your email")}</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }

  handleSetFormVisible() {
    this.setState({ formVisible: true });
  }
}

export const mapStateToProps = (state: IApplicationState) => ({
  ...state.login.loginWithEmail
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginWithEmail: (values: IUser, actions: FormikActions<IUser | undefined>) =>
    dispatch(fetchingAction(LoginActions.loginWithEmail, values, actions))
});

export const FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  navigation,
  fetching
}: NavigationInjectedProps & InjectedFormikProps<IUser, IUser> & IProps) => (
  <View>
    <View padder>
      <FormItem
        stackedLabel
        error={touched.email && errors.email !== undefined}
        success={touched.email && errors.email === undefined}
      >
        <Label>{lang("Email")}</Label>
        <Input
          onChangeText={handleChange("email")}
          onBlur={() => setFieldTouched("email")}
          value={values.email}
        />
      </FormItem>
      {msgOnError(touched.email, errors.email)}
    </View>
    <View padder>
      <FormItem
        stackedLabel
        error={touched.password && errors.password !== undefined}
        success={touched.email && errors.email === undefined}
      >
        <Label>{lang("Password")}</Label>
        <Input
          secureTextEntry
          onChangeText={handleChange("password")}
          onBlur={() => setFieldTouched("password")}
          value={values.password}
        />
      </FormItem>
      {msgOnError(touched.password, errors.password)}
    </View>
    <View padder>
      <Button
        block
        rounded
        success
        onPress={() => handleSubmit()}
        testID={"signinBtn"}
      >
        {fetching || <Icon name="ios-mail" color="white" fontSize={30} />}
        {fetching && (
          <Icon name="spinner" color="white" type="EvilIcons" fontSize={30} />
        )}

        <Text>{lang("Login")}</Text>
      </Button>
    </View>
    <Button
      block
      transparent
      onPress={() => navigation.navigate("ResetPasswordScreen")}
      testID={"forgottenBtn"}
    >
      <Text>{lang("Forgotten password")}</Text>
    </Button>
  </View>
);

export function getValidationSchema() {
  return Yup.object().shape({
    email: Yup.string()
      .email(lang("E-mail is not valid!"))
      .required(lang("E-mail is required!")),
    password: Yup.string()
      .min(6, lang("Password has to be longer than 6 characters!"))
      .required(lang("Password is required!"))
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(EmailLoginUi));
