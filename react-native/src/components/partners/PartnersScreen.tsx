import * as React from "react";
import { Button, Icon, Spinner, Text, View } from "native-base";
import PageTemplate from "../PageTemplate";
import lang from "./lang";

import { profileFields } from "./partnersTypes";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import { IProfile } from "../../rootReducers";
import { PartnersList } from "./PartnersList";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FirebaseActions } from "../FirebaseActions";
import { action } from "typesafe-actions";
import Loading from "../../utils/Loading";
import { cache } from "../../config/apollo";

export const getUserProfile = gql`
  query getUserProfile {
    getUserProfile @client {
      ...profileFields
    }
  }
  ${profileFields}
`;

export const PartnersScreen = (props: { removeAllNotification: Function }) => (
  <View>
    <NavigationEvents onDidFocus={() => props.removeAllNotification()} />
    <Query query={getUserProfile}>
      {({
        loading,
        error,
        data,
        startPolling,
        stopPolling
      }: { data: { getUserProfile: IProfile } } | any) => {
        startPolling(500);
        if (error) console.log("error: ", error);
        if (!data || !data.getUserProfile) return <Loading />;
        stopPolling();
        return <PartnersList userProfile={data.getUserProfile} />;
      }}
    </Query>
  </View>
);

export default connect(
  null,
  (dispatch: Dispatch) => ({
    removeAllNotification: () =>
      dispatch(action(FirebaseActions.removeAllNotification))
  })
)(PageTemplate(PartnersScreen, lang("Last Messages"), false));
