"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    sortByDistance: (lat, lon, profile) => profile
}));
const encode_int = jest.fn();
jest.mock("ngeohash", () => ({ encode_int }));
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const reducerHelper_1 = require("../../../utils/reducerHelper");
const searchSaga_1 = require("../searchSaga");
const searchReducer_1 = require("../searchReducer");
const firebase_1 = require("../../../config/firebase");
describe("searchProfilesSaga", () => {
    it("user has no lon lat", () => {
        getUserProfile.mockReturnValue({});
        redux_saga_test_plan_1.testSaga(searchSaga_1.searchProfilesSaga)
            .next()
            .throw(new Error("User has no lon lat coordinates"))
            .put(reducerHelper_1.errorAction(searchReducer_1.SearchActions.searchProfiles, new Error("User has no lon lat coordinates")))
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
        redux_saga_test_plan_1.testSaga(searchSaga_1.searchProfilesSaga)
            .next()
            .select(getUserProfile)
            .next({ lat: 1, lon: 2 })
            .call(firebase_1.firesaga.firestore.getCollection, "query")
            .next(mockProfiles)
            .put(reducerHelper_1.successAction(searchReducer_1.SearchActions.searchProfiles, 
        // @ts-ignore
        Array(4).fill({
            langsToLearn: "learn",
            langsToTeach: "teach",
            lat: 1,
            lon: 1,
            id: "id"
        })))
            .next()
            .isDone();
    });
});
