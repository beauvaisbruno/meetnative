const where2 = jest.fn();
const where = jest.fn(() => ({ where: where2 }));
const collection = jest.fn(() => ({ where }));
const firestore = jest.fn(() => ({ collection }));
jest.mock("react-native-firebase", () => {
  return {
    // auth,
    firestore
  };
});
jest.mock("../../../config/firebase", () => {
  return {
    firesaga: {
      firestore: {
        getCollection: jest.fn()
      }
    }
  };
});
const getUserProfile = jest.fn();
jest.mock("../../../utils/sagaHelper", () => ({ getUserProfile }));
const langMatch = jest.fn();
jest.mock("../../../utils/utils", () => ({
  langMatch,
  sortByDistance: (lat: any, lon: any, profile: any) => profile
}));

const encode_int = jest.fn();
jest.mock("ngeohash", () => ({ encode_int }));

import { testSaga } from "redux-saga-test-plan";
import { errorAction, successAction } from "../../../utils/reducerHelper";
import { searchProfilesSaga } from "../searchSaga";
import { SearchActions } from "../searchReducer";
import { firesaga } from "../../../config/firebase";

describe("searchProfilesSaga", () => {
  it("user has no lon lat", () => {
    getUserProfile.mockReturnValue({});
    testSaga(searchProfilesSaga)
      .next()
      .throw(new Error("User has no lon lat coordinates"))
      .put(
        errorAction(
          SearchActions.searchProfiles,
          new Error("User has no lon lat coordinates")
        )
      )
      .next()
      .isDone();
  });
  it("searchProfilesSaga", () => {
    getUserProfile.mockReturnValue({ lat: 1, lon: 2 });
    encode_int.mockReturnValue("encode_int");
    langMatch.mockReturnValue(true);
    where2.mockReturnValue("query");
    // @ts-ignore
    const mockProfiles = Array(4).fill({
      data: () => ({
        langsToLearn: "learn",
        langsToTeach: "teach",
        lat: 1,
        lon: 1
      }),
      id: "id"
    });
    testSaga(searchProfilesSaga)
      .next()
      .select(getUserProfile)
      .next({ lat: 1, lon: 2 })
      .call(firesaga.firestore.getCollection, "query")
      .next(mockProfiles)
      .put(
        successAction(
          SearchActions.searchProfiles,
          // @ts-ignore
          Array(4).fill({
            langsToLearn: "learn",
            langsToTeach: "teach",
            lat: 1,
            lon: 1,
            id: "id"
          })
        )
      )
      .next()
      .isDone();
  });
});
