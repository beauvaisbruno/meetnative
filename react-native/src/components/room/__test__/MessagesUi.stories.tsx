import { storiesOf } from "@storybook/react-native";
import {
  baseDecorator,
  storeBaseAndNavigatorDecorator
} from "../../../utils/decorators";
import * as React from "react";
import { RoomScreen } from "../RoomScreen";
import { DAY, HOUR, MIN } from "../../../utils/utils";
import { MessagesUi } from "../MessagesUi";

const now = Date.now();

function toUser(
  delay: number,
  message = "I available to meet up this afternoon. And you ?"
) {
  return {
    message,
    time: now - delay,
    authorId: "IEY3I5fpxQilwKzPt0Sc",
    recipientId: "C3iSMgBhdmazzcOngiTBpo7USNv2"
  };
}
function fromUser(
  delay: number,
  message = "Yes, I am available. Let's meet up."
) {
  return {
    message,
    recipientId: "IEY3I5fpxQilwKzPt0Sc",
    time: now - delay - 1,
    authorId: "C3iSMgBhdmazzcOngiTBpo7USNv2"
  };
}

const initialProps = {
  userProfile: {
    langsToLearn: {
      french: "intermediate",
      italian: "beginner",
      spanish: "fluent"
    },
    age: 23,
    lat: 46.144516,
    pseudo: "pseudo",
    lon: 6.081338,
    langsToTeach: {
      english: "native",
      spanish: "fluent"
    },
    geohash: 3661469831164302,
    city: "Genève",
    avatar: "cute",
    profession: "profession",
    id: "IEY3I5fpxQilwKzPt0Sc"
  },
  contactProfile: {
    langsToLearn: {
      english: "beginner",
      french: "fluent",
      german: "intermediate"
    },
    profession: "Legal Assistant",
    city: "Genève",
    geohash: 872962206,
    langsToTeach: {
      french: "fluent",
      italian: "bilingual",
      spanish: "native"
    },
    lon: 6.107057129141845,
    pseudo: "Maëlle",
    avatar: "pelican",
    lat: 46.08995392215012,
    age: 23,
    id: "C3iSMgBhdmazzcOngiTBpo7USNv2"
  },
  loadAuthor: {
    data: [
      fromUser(0),
      fromUser(24 * MIN),
      fromUser(25 * MIN),
      fromUser(10 * HOUR),
      fromUser(25 * HOUR),
      fromUser(5 * DAY),
      fromUser(8 * DAY),
      fromUser(8 * DAY - 1, "Hello !")
    ]
  },
  loadRecipient: {
    data: [
      toUser(0),
      toUser(24 * MIN),
      toUser(25 * MIN),
      toUser(10 * HOUR),
      toUser(25 * HOUR),
      toUser(5 * DAY),
      toUser(8 * DAY - 2),
      toUser(8 * DAY - 3, "Hello !")
    ]
  },
  navigation: { addListener: () => {} },
  loadRoom: { fetching: false },
  doLoadMessages: () => {
    console.log("doLoadMessages");
  }
};

storiesOf("MessagesUi", module)
  .addDecorator(baseDecorator)
  // @ts-ignore
  .add("default", () => <MessagesUi {...initialProps} />);
