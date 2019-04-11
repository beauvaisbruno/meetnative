"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-redux-85834.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true });
exports.firebase = admin;
exports.firestore = admin.firestore();
exports.getLastMessageById = async id => {
  return (await exports.firestore
    .collection("lastMessages")
    .doc(id)
    .get()).data();
};
exports.getLastMessage = async (recipientId, authorId) => {
  const res = await exports.firestore
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
exports.updateMessage = async (id, data) => {
  return await exports.firestore
    .collection("lastMessages")
    .doc(id)
    .update(data);
};
exports.getLastMessages = async recipientId => {
  const res = await exports.firestore
    .collection("lastMessages")
    .where("recipientId", "==", recipientId)
    .get();
  return res.docs.map(lastMessage => lastMessage.data());
};
exports.getProfile = async id =>
  (await exports.firestore.doc("profiles/" + id).get()).data();
//# sourceMappingURL=firebase.js.map
