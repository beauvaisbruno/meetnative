import { translate } from "../../config/intl";

export default (
  english: string,
  args?: { [key: string]: string | number } | undefined
) => {
  return translate(dictionary, english, args);
};

const dictionary = {
  "Unread message": {
    fr: "Nouveau Message",
    de: "Ungelesene Nachricht",
    it: "Messaggio non letto",
    es: "Mensaje no leído"
  },
  Contact: {
    fr: "Contact",
    de: "Kontaktieren",
    it: "Contatto",
    es: "Contacto"
  },
  yo: { fr: "ans", de: "jä", it: "an", es: "añ" },
  "Read message": {
    fr: "Dernier message",
    de: "Nachricht lesen",
    it: "Leggi il messaggio",
    es: "Mensaje leído"
  },
  "Impossible to load new messages": {
    fr: "Chargement des messages impossible.",
    de: "Neue Nachrichten können nicht geladen werden",
    it: "Impossibile caricare nuovi messaggi",
    es: "Imposible cargar nuevos mensajes."
  },
  "You have no partner yet": {
    fr: "Aucune discussion ouverte pour l'instant.",
    de: "Du hast noch keinen Partner",
    it: "Non hai ancora un partner",
    es: "Aún no tienes pareja"
  },
  "Last Messages": {
    fr: "Derniers Messages",
    de: "Letzte Nachrichten",
    it: "Ultimi messaggi",
    es: "Últimos mensajes"
  }
};
