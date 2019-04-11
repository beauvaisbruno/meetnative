import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import * as React from "react";
import ChatHeader from "../ChatHeader";


const initialProps = {
  user: {
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
  profile: {
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
  }
};

it("ChatHeader", () => {
  const tree = shallow(
    // @ts-ignore
    <ChatHeader {...initialProps} />
  );
  expect(toJson(tree)).toMatchSnapshot();
  tree
    .find("Styled(Button)")
    .props()
    // @ts-ignore
    .onPress();
  expect(toJson(tree)).toMatchSnapshot();
});
