import { FormikActions } from "formik";
import PageTemplate from "../PageTemplate";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState, IProfile } from "../../rootReducers";
import { fetchingAction } from "../../utils/reducerHelper";
import { ProfileActions } from "./profileReducer";
import ProfileScreen from "./ProfileScreen";
import lang from "../lang";
import { withNavigation } from "react-navigation";

export const mapStateToProps = (state: IApplicationState) => state.profile;

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProfile: (values: IProfile, actions: FormikActions<IProfile>) =>
      dispatch(fetchingAction(ProfileActions.profileUpdate, values, actions)),
    loadProfile: () => dispatch(fetchingAction(ProfileActions.profileLoad))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(PageTemplate(ProfileScreen, lang("Profile"))));
