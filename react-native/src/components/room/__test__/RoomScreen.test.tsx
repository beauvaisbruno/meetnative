import { mockDate, unMockDate } from "../../../../jest/testUtils";

const addListener = jest.fn();
const doSendMessages = jest.fn();
const doSyncMessages = jest.fn();
const getParam = jest.fn();

jest.mock("react-native-firebase", () => {
  return {
    auth: () => ({ currentUser: { uid: "uid" } })
  };
});

import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
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
  navigation: { addListener, getParam },
  sendMessage: { fetching: false },
  doSendMessages,
  doSyncMessages
};
getParam.mockReturnValue({
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
});
it("RoomScreen", () => {
  mockDate();
  // @ts-ignore
  let tree = shallow(<RoomScreen {...initialProps} />);
  expect(toJson(tree)).toMatchSnapshot();
  expect(getParam).toBeCalledWith("contactProfile", null);
  expect(addListener.mock.calls[0][0]).toBe("willFocus");
  addListener.mock.calls[0][1]();
  expect(toJson(tree)).toMatchSnapshot();
  tree
    .find("Styled(Input)")
    .props()
    // @ts-ignore
    .onChangeText("someTextToSend");
  tree
    .find("Styled(Button)")
    .props()
    // @ts-ignore
    .onPress();
  expect(doSendMessages).toBeCalledWith({
    message: "someTextToSend",
    time: Date.now(),
    authorId: "C3iSMgBhdmazzcOngiTBpo7USNv2",
    recipientId: "IEY3I5fpxQilwKzPt0Sc"
  });
  tree = shallow(
    // @ts-ignore
    <RoomScreen {...initialProps} sendMessage={{ fetching: true }} />
  );
  expect(toJson(tree)).toMatchSnapshot();
  unMockDate();
});
