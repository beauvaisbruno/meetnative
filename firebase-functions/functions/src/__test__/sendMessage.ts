import { firebase } from "../../../../google-app-engine/src/firebase";
try {
  const author = {
    profession: "profession",
    avatar: "chouette",
    fcmId:
      "dogT0_gjVlU:APA91bFWNmB_NR_nMPCcoKYul4Tt3fSWC06d-OqcE_HDFs-oMBg35sdAHVnfIlkvzsyh-yU_6CqalZIS0PZ0XEdfqBUQDkhUAXlr6vGBMGmE-oIbI9k2kjyeUADe_NrwacEclMmoFJqK",
    isMale: false,
    geohash: 872962543,
    lat: 46.2043907,
    langsToTeach: { english: "native" },
    id: "gYkHT0YXuLRQ0yfI5OyarNuNj9c2",
    lon: 6.143157700000001,
    langsToLearn: { french: "beginner" },
    age: 21,
    city: "Genève",
    pseudo: "Facebook"
  };
  const payload = {
    notification: {
      title: "author.pseudo",
      body: "msg.message"
    },
    data: { author: JSON.stringify(author) }
  };
  console.log(
    "onCreate, send: ",
    "dogT0_gjVlU:APA91bFWNmB_NR_nMPCcoKYul4Tt3fSWC06d-OqcE_HDFs-oMBg35sdAHVnfIlkvzsyh-yU_6CqalZIS0PZ0XEdfqBUQDkhUAXlr6vGBMGmE-oIbI9k2kjyeUADe_NrwacEclMmoFJqK",
    payload
  );
  firebase
    .messaging()
    // @ts-ignore
    .sendToDevice(recipient.fcmId!, payload)
    .then((res: any) => {
      console.log("done: ", res);
    });
} catch (error) {
  console.log("error: ", error);
}
