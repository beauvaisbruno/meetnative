import React, { Component } from "react";
import { Button, Item, Input, Label, Text, View, Icon } from "native-base";
import * as Yup from "yup";
import { Formik, FormikActions, InjectedFormikProps } from "formik";
import { connect } from "react-redux";
import { LoginActions } from "./loginReducer";
import { Dispatch } from "redux";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import { IApplicationState } from "../../rootReducers";
import lang from "./lang";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";
import { msgOnError } from "../../utils/utilsUi";

export interface IUser {
  email: string;
}

export type IProps = IActionResult<any> & {
  resetEmail: (values: IUser, action: FormikActions<IUser | undefined>) => void;
};

export const mapStateToProps = (state: IApplicationState) => ({
  ...state.login.loginResetEmail
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetEmail: (values: IUser, actions: FormikActions<IUser | undefined>) =>
    dispatch(fetchingAction(LoginActions.loginResetEmail, values, actions))
});

export function getValidationSchema() {
  return Yup.object().shape({
    email: Yup.string()
      .email(lang("E-mail is not valid!"))
      .required(lang("E-mail is required!"))
  });
}

export class ResetPasswordScreen extends Component<IProps> {
  static navigationOptions = {
    headerTitle: lang("Reset password")
  };

  render() {
    return (
      <View>
        <AutoHeightImage
          source={require("./img/header.png")}
          width={wp("100%")}
        />
        <Formik
          initialValues={{ email: "", connection: null }}
          validationSchema={getValidationSchema()}
          onSubmit={(values, actions) => {
            this.props.resetEmail(values, actions);
          }}
        >
          {(injectedProps: InjectedFormikProps<IUser, IUser>) => (
            <FormUi {...injectedProps} {...this.props} />
          )}
        </Formik>
      </View>
    );
  }
}

export const FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  fetching,
  error
}: InjectedFormikProps<IUser, IUser> & IActionResult<any>) => (
  <View>
    <View padder>
      <Item
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
      </Item>
      {msgOnError(touched.email, errors.email)}
    </View>
    <View padder>
      <Button
        block
        rounded
        success
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
        testID={"resetBtn"}
      >
        {fetching ? (
          <Icon name="spinner" color="white" type="EvilIcons" fontSize={30} />
        ) : (
          <Icon
            name="lock-reset"
            type="MaterialCommunityIcons"
            color="white"
            fontSize={30}
          />
        )}
        <Text>{lang("Reset the password")}</Text>
      </Button>
    </View>
  </View>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);
