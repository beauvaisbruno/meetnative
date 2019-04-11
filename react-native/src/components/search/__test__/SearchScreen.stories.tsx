import { storiesOf } from "@storybook/react-native";
import { baseDecorator } from "../../../utils/decorators";
import * as React from "react";
import { SearchScreen } from "../SearchScreen";
const initialProps = {
  doSearchProfile: () => console.log("doSearchProfile"),
  navigation: {
    navigate: (screen: string) => console.log("navigate, screen: ", screen),
    addListener: () => {}
  },

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
    profession: "profession"
  },
  searchProfiles: {
    fetching: false,
    error: false,
    data: [
      {
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
      },
      {
        langsToLearn: {
          spanish: "beginner"
        },
        profession: "Account Coordinator",
        city: "Genève",
        geohash: 872960830,
        langsToTeach: {
          italian: "native"
        },
        lon: 5.888429037561815,
        fake: true,
        pseudo: "Garçon",
        avatar: "cygne",
        lat: 46.17698933378991,
        age: 23,
        id: "9mFX4VcFVzjYMfuc2UC7",
        isMale: true
      }
    ]
  }
};
storiesOf("SearchScreen", module)
  .addDecorator(baseDecorator)
  // @ts-ignore
  .add("container", () => <SearchScreen {...initialProps} />)
  .add("error", () => (
    // @ts-ignore
    <SearchScreen
      {...initialProps}
      searchProfiles={{
        fetching: false,
        error: true,
        data: undefined
      }}
    />
  ));
