import { IProfile } from "../../rootReducers";
import gql from "graphql-tag";

export interface ILastMessage {
  id: string;
  recipientId: string;
  lastReadTime?: number;
  lastMsgReceived?: string;
  lastMsgReceivedTime?: number;
  authorId: string;
}

export interface ILastMessageProfiles extends ILastMessage {
  author: IProfile;
  recipient: IProfile;
}

export const profileFields = gql`
  fragment profileFields on Profile {
    id
    age
    pseudo
    profession
    city
    avatar
    isMale
    lat
    lon
    langsToLearn
    langsToTeach
  }
`;

export const lastMessagesFields = gql`
  fragment lastMessagesFields on LastMessage {
    id
    author {
      ...profileFields
    }
    recipient {
      id
    }
    lastReadTime
    lastMsgReceived
    lastMsgReceivedTime
  }
  ${profileFields}
`;
