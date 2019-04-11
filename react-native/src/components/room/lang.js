"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intl_1 = require("../../config/intl");
exports.default = (english, args) => {
    return intl_1.translate(dictionary, english, args);
};
const dictionary = {
    Info: { fr: "Info", de: "Info", it: "Informazioni", es: "Información" },
    yo: { fr: "ans", de: "jä", it: "an", es: "añ" },
    Speak: { fr: "Parle", de: "Sprechen", it: "Parlare", es: "Hablar" },
    Learn: { fr: "Apprend", de: "Lernen", it: "Imparare", es: "Aprender" },
    Message: { fr: "Message", de: "Botschaft", it: "Messaggio", es: "Mensaje" },
    Chat: { fr: "Discussion", de: "Plaudern", it: "Chiacchierare", es: "Charla" }
};
