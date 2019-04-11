import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import * as React from "react";
import ChatHeader from "../ChatHeader";
import MessagesUi from "../MessagesUi";

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
    profession: "profession"
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
    id: "IEY3I5fpxQilwKzPt0Sc"
  },
  loadAuthor: {
    data: [
      {
        message: "other message from user",
        recipient: "IEY3I5fpxQilwKzPt0Sc",
        time: 1551091662000 + 20000,
        author: "C3iSMgBhdmazzcOngiTBpo7USNv2"
      },
      {
        message: "some message from user",
        recipient: "IEY3I5fpxQilwKzPt0Sc",
        time: 1551091662000,
        author: "C3iSMgBhdmazzcOngiTBpo7USNv2"
      }
    ]
  },
  loadRecipient: {
    data: [
      {
        message: "other message to user",
        recipient: "C3iSMgBhdmazzcOngiTBpo7USNv2",
        userIds: "C3iSMgBhdmazzcOngiTBpo7USNv2-IEY3I5fpxQilwKzPt0Sc",
        time: 1551091662000 + 30000,
        author: "IEY3I5fpxQilwKzPt0Sc"
      },
      {
        message: "some message to user",
        recipient: "C3iSMgBhdmazzcOngiTBpo7USNv2",
        userIds: "C3iSMgBhdmazzcOngiTBpo7USNv2-IEY3I5fpxQilwKzPt0Sc",
        time: 1551091662000 + 10000,
        author: "IEY3I5fpxQilwKzPt0Sc"
      }
    ]
  },
  loadRoom: { fetching: false }
};
it("MessagesUi", () => {
  // @ts-ignore
  let tree = shallow(<MessagesUi {...initialProps} />);
  expect(toJson(tree)).toMatchSnapshot();
  tree = shallow(
    // @ts-ignore
    <MessagesUi {...initialProps} loadRoom={{ fetching: true }} />
  );
  expect(toJson(tree)).toMatchSnapshot();
});
