"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intl_1 = require("../../config/intl");
exports.default = (english, args) => {
  return intl_1.translate(dictionary, english, args);
};
const dictionary = {
  Contact: { fr: "Contact", de: "Kontakt", it: "Contatto", es: "Contacto" },
  yo: { fr: "ans", de: "jä", it: "an", es: "añ" },
  Speak: { fr: "Apprend", de: "Sprechen", it: "Parlare", es: "Hablar" },
  Learn: { fr: "Message", de: "Lernen", it: "Imparare", es: "Aprender" },
  "Impossible to load profiles": {
    fr: "Impossible de charger les profiles",
    de: "Profile können nicht geladen werden",
    it: "Impossibile caricare i profili",
    es: "Imposible cargar perfiles."
  },
  "No user match your profile": {
    fr: "Aucun utilisateur vous correspond",
    de: "Kein Benutzer passt zu Ihrem Profil",
    it: "Nessun utente corrisponde al tuo profilo",
    es: "Ningún usuario coincide con tu perfil"
  },
  "Find a partner": {
    fr: "Trouver un partenaire",
    de: "Einen Partner finden",
    it: "Trova un partner",
    es: "Encuentra un compañero"
  }
};
//# sourceMappingURL=lang.js.map
