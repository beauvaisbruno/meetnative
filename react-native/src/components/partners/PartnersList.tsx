import { Spinner, Text, View } from "native-base";
import lang from "./lang";
import * as React from "react";
import { ILastMessageProfiles, lastMessagesFields } from "./partnersTypes";
import PartnerRow from "./PartnerRow";
import { IProfile } from "../../rootReducers";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import { SubscribeToMoreOptions } from "apollo-client";
import custom from "../../config/native-base-theme/variables/custom";
import Loading from "../../utils/Loading";

export const getLastMessages = gql`
  query getLastMessages($userId: ID!) {
    getLastMessages(recipientId: $userId) {
      ...lastMessagesFields
    }
  }
  ${lastMessagesFields}
`;

export const getLastMessagesSync = gql`
  subscription getLastMessagesSync($userId: ID!) {
    getLastMessagesSync(recipientId: $userId) {
      ...lastMessagesFields
    }
  }
  ${lastMessagesFields}
`;

export const PartnersList = ({ userProfile }: { userProfile: IProfile }) => (
  <View>
    <Query query={getLastMessages} variables={{ userId: userProfile.id }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (error) console.log("getLastMessages error: ", error);
        if (error)
          return (
            <Text
              style={{
                color: custom.brandDanger,
                alignSelf: "center"
              }}
              testID={"error"}
            >
              {lang("Impossible to load new messages")}
            </Text>
          );
        if (loading || !data.getLastMessages) return <Loading />;
        let lastMessages = data.getLastMessages;

        exportFunctions.subscribe(subscribeToMore, {
          document: getLastMessagesSync,
          variables: { userId: userProfile.id },
          updateQuery: (prev, { subscriptionData }) => ({
            ...prev,
            getLastMessages: subscriptionData.data.getLastMessagesSync
          }),
          onError: error => {
            console.log("subscribeToMore error, userProfile: ", userProfile);
            console.log("subscribeToMore error: ", error);
          }
        });
        if (data.getLastMessages.length === 0)
          return (
            <View testID={"noPartner"}>
              <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                {lang("You have no partner yet")}
              </Text>
            </View>
          );
        lastMessages = lastMessages.sort(
          (b: ILastMessageProfiles, a: ILastMessageProfiles): number => {
            if (!a.lastReadTime) return -1;
            if (!b.lastReadTime) return 1;
            return a.lastReadTime - b.lastReadTime;
          }
        );
        const rows: JSX.Element[] = [];
        lastMessages.forEach((message: ILastMessageProfiles) => {
          rows.push(
            <PartnerRow key={message.author.id} {...{ message, userProfile }} />
          );
        });
        return rows;
      }}
    </Query>
  </View>
);
function subscribe(subscribeToMore: any, options: SubscribeToMoreOptions) {
  subscribeToMore(options);
}
const exportFunctions = {
  subscribe,
  PartnersList
};

export default exportFunctions;
