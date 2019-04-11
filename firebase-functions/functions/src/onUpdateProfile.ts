import { filterPngRequire } from "./compatibility";

filterPngRequire();
import * as functions from "firebase-functions";
import { firebase, firestore } from "../../../google-app-engine/src/firebase";
import { IProfile } from "../../../react-native/src/rootReducers";
import * as _ from "lodash";
import * as ngeohash from "ngeohash";
import { distanceKm, langMatch } from "../../../react-native/src/utils/utils";
import { avatars } from "../../../react-native/src/components/profile/img/Avatars";
import { LearnLevel } from "../../../react-native/src/LearnLevel";
import { TeachLevel } from "../../../react-native/src/TeachLevel";
import { Change } from "firebase-functions";
import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

function rdnRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function rnd(items: any[]) {
  return items[Math.floor(Math.random() * items.length)];
}

const fPseudos = [
  "Amanda",
  "Ambre",
  "Anna",
  "Sarah",
  "Alicia",
  "Alicia",
  "Lisa",
  "Michelle"
];

const profession = [
  "Hypnotherapist",
  "Chemist",
  "Photographer",
  "Social Worker",
  "Researcher",
  "Nurse"
];

export function createProfile(profile: IProfile) {
  const { lat, lon } = profile;
  const id = "fake" + Date.now();
  const fakeProfile: IProfile = {
    langsToLearn: {
      [rnd(Object.keys(profile.langsToTeach))]: rnd([
        LearnLevel.beginner,
        LearnLevel.fluent
      ])
    },
    langsToTeach: {
      [rnd(Object.keys(profile.langsToLearn))]: rnd([
        TeachLevel.native,
        TeachLevel.bilingual
      ])
    },
    age: Math.floor(rdnRange(18, 40)),
    pseudo: rnd(fPseudos),
    profession: rnd(profession),
    city: profile.city,
    avatar: rnd(Object.keys(avatars)),
    isMale: false,
    lat: lat! + rdnRange(0.02, 0.1),
    lon: lon! + rdnRange(0.02, 0.1),
    geohash: profile.geohash! + rdnRange(200, 1000),
    id,
    fake: true
  };

  return { id, fakeProfile };
}

const onUpdateProfileHandler = async (
  change: Change<DocumentSnapshot>,
  context: EventContext
) => {
  const profile = change.after!.exists
    ? (change.after!.data() as IProfile)
    : null;

  if (profile === null) {
    return;
  }

  const oldProfile = change.before!.exists
    ? (change.before!.data() as IProfile)
    : null;

  if (oldProfile !== null) {
    if (
      oldProfile.city === profile.city &&
      _.isEqual(oldProfile.langsToTeach, profile.langsToTeach) &&
      _.isEqual(oldProfile.langsToLearn, profile.langsToLearn)
    ) {
      return;
    }
  }

  const { lat, lon } = profile;
  if (!lon || !lat) throw new Error("User has no lon lat coordinates");
  const threshold = 2;
  const profiles = await firestore
    .collection("profiles")
    .where(
      "geohash",
      ">",
      ngeohash.encode_int(lat - threshold, lon - threshold, 30)
    )
    .where(
      "geohash",
      "<",
      ngeohash.encode_int(lat + threshold, lon + threshold, 30)
    )
    .get();

  let match = false;
  profiles.docs.forEach((snapProfile: any) => {
    const otherProfile = snapProfile.data();
    otherProfile.id = profile.id;
    if (
      langMatch(profile.langsToLearn, otherProfile.langsToTeach) &&
      langMatch(otherProfile.langsToLearn, profile.langsToTeach)
    ) {
      match = true;
    }
  });
  if (match) return;
  const { id, fakeProfile } = createProfile(profile);

  await firestore
    .collection("profiles")
    .doc(id)
    .set(fakeProfile);
};
export const onUpdateProfile = functions
  .region("europe-west1")
  .firestore.document("profiles/{profileId}")
  .onWrite(onUpdateProfileHandler);
