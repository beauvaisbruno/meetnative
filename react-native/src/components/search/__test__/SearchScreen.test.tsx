import { shallow } from "enzyme";
import * as React from "react";
import { SearchScreen } from "../SearchScreen";
import toJson from "enzyme-to-json";
const doSearchProfile = jest.fn();
const navigate = jest.fn();
const addListener = jest.fn();

const contactProfile = {
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
};
const initialProps = {
  doSearchProfile,
  navigation: { navigate, addListener },
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
    data: [contactProfile]
  }
};

it("SearchScreen", () => {
  let tree = shallow(
    // @ts-ignore
    <SearchScreen {...initialProps} />
  );
  expect(toJson(tree)).toMatchSnapshot();
  addListener.mock.calls[0][1]();
  expect(doSearchProfile).toBeCalled();

  tree
    .find("Styled(Button)")
    .props()
    // @ts-ignore
    .onPress();
  expect(navigate).toBeCalledWith("RoomScreen", {
    contactProfile
  });
  tree = shallow(
    // @ts-ignore
    <SearchScreen
      {...initialProps}
      searchProfiles={{
        fetching: true,
        error: false,
        data: undefined
      }}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
  tree = shallow(
    // @ts-ignore
    <SearchScreen
      {...initialProps}
      searchProfiles={{
        fetching: false,
        error: true,
        data: undefined
      }}
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
});
