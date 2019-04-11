import * as React from "react";
import { StatusBar, View } from "react-native";
import { Spinner } from "native-base";

import { connect } from "react-redux";
import { ILoginState, LoginActions } from "./loginReducer";
import { Dispatch } from "redux";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import Loading from "../../utils/Loading";

export type IProps = IActionResult<any> & {
  loadUser: () => void;
};

export class AuthLoadingScreen extends React.Component<IProps> {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <View>
        <Loading />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export const mapStateToProps = (state: ILoginState) => {
  return { ...state.loginLoadUser };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadUser: () => dispatch(fetchingAction(LoginActions.loginLoadUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
