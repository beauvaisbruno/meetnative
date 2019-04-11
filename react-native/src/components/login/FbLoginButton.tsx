import React, { Component } from "react";
import { Button, Icon, Text, Toast, View } from "native-base";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import { LoginActions } from "./loginReducer";
import { IApplicationState } from "../../rootReducers";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";

export type IProps = IActionResult<any> & {
  facebookLogin: () => void;
};

export const mapStateToProps = (state: IApplicationState) => {
  return {
    ...state.login.loginFacebook
  };
};
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    facebookLogin: () => dispatch(fetchingAction(LoginActions.loginFacebook))
  };
};

export class FbLoginButton extends Component<IProps> {
  render() {
    return (
      <View padder>
        <Button
          block
          rounded
          style={{ backgroundColor: custom.brandPrimary }}
          onPress={() => this.props.facebookLogin()}
          testID={"facebookLoginButton"}
        >
          {this.props.fetching || (
            <Icon
              name="facebook-square"
              color="white"
              type="AntDesign"
              fontSize={30}
            />
          )}
          {this.props.fetching && (
            <Icon name="spinner" color="white" type="EvilIcons" fontSize={30} />
          )}

          <Text>{lang("Login with Facebook")}</Text>
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
)(FbLoginButton);
