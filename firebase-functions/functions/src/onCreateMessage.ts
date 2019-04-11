import * as functions from "firebase-functions";
import { IMessage } from "../../../react-native/src/components/room/roomReducer";
import { IProfile } from "../../../react-native/src/rootReducers";
import { firebase, firestore } from "../../../google-app-engine/src/firebase";

export const onCreateMessage = functions
  .region("europe-west1")
  .firestore.document("messages/{messageId}")
  .onCreate(async (snap: any) => {
    const msg = snap.data() as IMessage;
    console.log("onCreate, msg: ", msg);
    const recipient: IProfile = (await firestore
      .doc("profiles/" + msg.recipientId)
      .get()).data() as any;
    if (recipient.fake) {
      console.log("recipient.fake: ", recipient);
      return;
    }
    const author: IProfile = (await firestore
      .doc("profiles/" + msg.authorId)
      .get()).data() as any;
    if (!recipient.fcmId) {
      console.error("recipient.fcmId: ", recipient);
      return;
    }
    const payload = {
      notification: {
        title: author.pseudo,
        body: msg.message
      },
      data: { author: JSON.stringify(author) }
    };
    console.log("onCreate, send: ", recipient.fcmId!, payload);
    firebase.messaging().sendToDevice(recipient.fcmId!, payload);
  });
