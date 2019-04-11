import Mutation from "react-apollo/Mutation";
import { noMarPad } from "../../utils/utilsUi";
import { Button, Icon, View, Text } from "native-base";
import React from "react";
import gql from "graphql-tag";
import { ILastMessageProfiles, lastMessagesFields } from "./partnersTypes";
import { getLastMessages } from "./PartnersList";
import { IProfile } from "../../rootReducers";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";

export const setLastMessageRead = gql`
  mutation setLastMessageRead($recipientId: ID!, $authorId: ID!) {
    setLastMessageRead(recipientId: $recipientId, authorId: $authorId) {
      ...lastMessagesFields
    }
  }
  ${lastMessagesFields}
`;

export const MessageUnread = ({
  size,
  userProfile,
  contactProfile,
  message,
  testID,
  stories
}: {
  size: number;
  userProfile: IProfile;
  contactProfile: IProfile;
  message: ILastMessageProfiles;
  testID?: string;
  stories?: any;
}) => (
  <Mutation
    mutation={setLastMessageRead}
    // Unnecessary, for reference only, ui is automatically updated because:
    // (1) old and new ids are matching, so update is auto
    // (2) getLastMessage use subscription
    update={(
      cache,
      {
        data: {
          setLastMessageRead: { lastReadTime }
        }
      }
    ) => {
      cache.writeFragment({
        id: contactProfile.id + "-" + userProfile.id,
        fragment: gql`
          fragment _ on LastMessage {
            lastReadTime
          }
        `,
        data: { lastReadTime }
      });
    }}
    refetchQueries={() => [
      {
        query: getLastMessages,
        variables: {
          userId: userProfile.id
        }
      }
    ]}
  >
    {(setLastMessageRead, { data, error, loading }) => {
      if (stories && stories.loading) loading = stories.loading;
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...noMarPad
          }}
        >
          <Text style={{ color: custom.brandDanger, fontSize: size }}>
            {lang("Unread message")}
          </Text>
          <Button
            block
            transparent
            onPress={() => {
              setLastMessageRead({
                variables: {
                  recipientId: userProfile.id,
                  authorId: contactProfile.id
                },
                optimisticResponse: {
                  setLastMessageRead: {
                    ...message,
                    lastReadTime: Date.now()
                  }
                }
              });
            }}
            testID={"setLastMessageReadBtn"}
            style={{ ...noMarPad, height: size + 5, marginRight: 5 }}
          >
            {loading || (
              <Icon
                name="close-circle-outline"
                type="MaterialCommunityIcons"
                style={{ ...noMarPad, fontSize: size }}
              />
            )}
            {loading && (
              <Icon
                name="spinner"
                type="EvilIcons"
                style={{ ...noMarPad, fontSize: size }}
              />
            )}
          </Button>
        </View>
      );
    }}
  </Mutation>
);
