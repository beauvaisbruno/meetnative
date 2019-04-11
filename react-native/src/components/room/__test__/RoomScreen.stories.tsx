import { storiesOf } from "@storybook/react-native";
import {
  baseDecorator,
  storeBaseAndNavigatorDecorator
} from "../../../utils/decorators";
import * as React from "react";
import { RoomScreen } from "../RoomScreen";

const initialProps = {
  userProfile: {
    id: "C3iSMgBhdmazzcOngiTBpo7USNv2",
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
    profession: "profession"
  },
  navigation: {
    addListener: () => {},
    getParam: () => ({
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
      id: "IEY3I5fpxQilwKzPt0Sc"
    })
  },
  sendMessage: { fetching: false, error: false },
  doSendMessages: (message: string) => {
    console.log("message: ", message);
  }
};
storiesOf("RoomScreen", module)
  .addDecorator(storeBaseAndNavigatorDecorator)
  // @ts-ignore
  .add("default", () => <RoomScreen {...initialProps} />)
  .add("load", () => (
    // @ts-ignore
    <RoomScreen
      {...initialProps}
      sendMessage={{
        fetching: true,
        error: false
      }}
    />
  ))
  .add("error", () => (
    // @ts-ignore
    <RoomScreen
      {...initialProps}
      sendMessage={{
        fetching: false,
        error: true
      }}
    />
  ));
