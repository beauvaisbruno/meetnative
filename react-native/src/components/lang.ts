import { translate } from "../config/intl";

export default (
  english: string,
  args?: { [key: string]: string | number } | undefined
) => {
  return translate(dictionary, english, args);
};

const dictionary = {
  "New Message": {
    fr: "Nouveau Message",
    de: "Neue Nachricht",
    it: "Nuovo messaggio",
    es: "Nuevo mensaje"
  },
  "Display a notification when you receive a new message": {
    fr: "Affiche une notification lors de la réception d'un nouveau message",
    de: "Zeigt eine Benachrichtigung an, wenn Sie eine neue Nachricht erhalten",
    it: "Visualizza una notifica quando ricevi un nuovo messaggio",
    es: "Mostrar una notificación cuando reciba un nuevo mensaje"
  },
  "Save your profile info before to start": {
    fr: "Enregistrez vos informations de profile pour pouvoir commencer",
    de: "Speichern Sie Ihre Profilinformationen, bevor Sie beginnen",
    it: "Salva le informazioni del tuo profilo prima di iniziare",
    es: "Guarda la información de tu perfil antes de comenzar"
  },
  Profile: { fr: "Profile", de: "Profil", it: "Profilo", es: "Perfil" }
};
