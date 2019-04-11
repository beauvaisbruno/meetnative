import React, { Component } from "react";
import { Button, Text, View, Icon } from "native-base";
import { connect } from "react-redux";
import { ProfileActions } from "./profileReducer";
import { Dispatch } from "redux";
import { IApplicationState } from "../../rootReducers";
import { fetchingAction, IActionResult } from "../../utils/reducerHelper";
import lang from "./lang";

interface IProps {
  doLogout: () => void;
}

export class LogoutButton extends Component<IProps & IActionResult<undefined>> {
  render() {
    return (
      <View padder>
        <Button testID={"logoutButton"} block rounded primary onPress={() => this.props.doLogout()}>
          <Icon name="logout" type="AntDesign" color="white" fontSize={30} />
          <Text>{lang("Logout")}</Text>
        </Button>
      </View>
    );
  }
}

export const mapStateToProps = (state: IApplicationState) => {
  return { ...state.profile.profileLogout };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    doLogout: () => dispatch(fetchingAction(ProfileActions.profileLogout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);
