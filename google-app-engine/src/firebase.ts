import * as admin from "firebase-admin";
import * as firebaseI from "firebase";
import DocumentData = firebaseI.firestore.DocumentData;

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-redux-85834.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true });

export const firebase = admin;
export const firestore = admin.firestore();

export const getLastMessageById = async (
  id: string
): Promise<DocumentData | undefined> => {
  return (await firestore
    .collection("lastMessages")
    .doc(id)
    .get()).data();
};

export const getLastMessage = async (
  recipientId: string,
  authorId: string
): Promise<Object> => {
  const res = await firestore
    .collection("lastMessages")
    .where("recipientId", "==", recipientId)
    .where("authorId", "==", authorId)
    .get();
  if (res.docs.length !== 1)
    throw Error(
      "setLastMessageRead, messages.size !== 1, length: " + res.docs.length
    );
  return res.docs[0].data();
};

export const updateMessage = async (id: string, data: Object) => {
  return await firestore
    .collection("lastMessages")
    .doc(id)
    .update(data);
};

export const getLastMessages = async (
  recipientId: string
): Promise<Object[]> => {
  const res = await firestore
    .collection("lastMessages")
    .where("recipientId", "==", recipientId)
    .get();
  return res.docs.map(lastMessage => lastMessage.data());
};

export const getProfile = async (id: string): Promise<any> =>
  (await firestore.doc("profiles/" + id).get()).data();
