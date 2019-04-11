import React, { Component } from "react";
import { Icon, Button, Text, View, Toast, Spinner } from "native-base";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import { LoginActions } from "./loginReducer";
import { IApplicationState } from "../../rootReducers";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";

export type IProps = IActionResult<any> & {
  googleLogin: () => void;
};

export const mapStateToProps = (state: IApplicationState) => {
  return {
    ...state.login.loginGoogle
  };
};
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    googleLogin: () => dispatch(fetchingAction(LoginActions.loginGoogle))
  };
};

export class GoogleLoginButton extends Component<IProps,
  any
> {
  render() {
    return (
      <View padder>
        <Button
          block
          rounded
          style={{ backgroundColor: "#dd4b39" }}
          onPress={() => this.props.googleLogin()}
          testID={"googleLoginBtn"}
        >
          {this.props.fetching ? (
            <Icon name="spinner" color="white" type="EvilIcons" fontSize={30} />
          ) : (
            <Icon
              name="google-plus-square"
              type="FontAwesome5"
              color="white"
              fontSize={30}
            />
          )}
          <Text>{lang("Login with Google")}</Text>
        </Button>
        {this.props.error && (
          <Text
            style={{
              color: custom.brandDanger,
              alignSelf: "center"
            }}
          >
            {lang("Sign in impossible")}
          </Text>
        )}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleLoginButton);
