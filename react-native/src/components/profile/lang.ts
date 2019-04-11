import { translate } from "../../config/intl";

export default (
  english: string,
  args?: { [key: string]: string | number } | undefined
) => {
  return translate(dictionary, english, args);
};

const dictionary = {
  "{age} yo": {
    fr: "{age} ans",
    de: "{age} jä",
    it: "{age} anni",
    es: "{age} yo"
  },
  "Select your age": {
    fr: "Sélectionnez votre âge",
    de: "Wähle dein Alter aus",
    it: "Seleziona la tua età",
    es: "Selecciona tu edad"
  },
  "Select your gender": {
    fr: "Sélectionnez votre genre",
    de: "Wähle dein Geschlecht",
    it: "Seleziona il tuo sesso",
    es: "Selecciona tu género"
  },
  Male: { fr: "Homme", de: "Mann", it: "Maschio", es: "Masculino" },
  Female: { fr: "Femme", de: "Frau", it: "Femmina", es: "Hembra" },
  Search: { fr: "Rechercher", de: "Suche", it: "Ricerca", es: "Buscar" },
  "Current location": {
    fr: "Position Actuelle",
    de: "Aktueller Standort",
    it: "Posizione attuale",
    es: "Ubicación actual"
  },
  "Langage to learn": {
    fr: "Apprentissage des langues",
    de: "Langzeit zu lernen",
    it: "Langage per imparare",
    es: "Langage para aprender"
  },
  "Add a langage": {
    fr: "Ajouter une langue",
    de: "Sprache hinzufügen",
    it: "Aggiungi un langage",
    es: "Añadir una lengua"
  },
  "Langage to teach": {
    fr: "Enseignement des langues",
    de: "Sprache zu lehren",
    it: "Langage per insegnare",
    es: "Langage para enseñar"
  },
  Logout: {
    fr: "Se déconnecter",
    de: "Ausloggen",
    it: "Disconnettersi",
    es: "Cerrar sesión"
  },
  "Impossible to load the profile": {
    fr: "Vos informations de profile ne sont pas accessible",
    de: "Das Profil kann nicht geladen werden",
    it: "Impossibile caricare il profilo",
    es: "Imposible cargar el perfil."
  },
  Pseudo: { fr: "Pseudo", de: "Pseudo", it: "Pseudo", es: "Seudo" },
  Profession: {
    fr: "Profession",
    de: "Beruf",
    it: "Professione",
    es: "Profesión"
  },
  City: { fr: "Ville", de: "Stadt", it: "Città", es: "Ciudad" },
  "Update Profile": {
    fr: "Mettre à jour le profile",
    de: "Profil aktualisieren",
    it: "Aggiorna il profilo",
    es: "Actualización del perfil"
  },
  "Update impossible": {
    fr: "Mise à jour impossible",
    de: "Update unmöglich",
    it: "Aggiornamento impossibile",
    es: "Actualización imposible"
  },
  "Pseudo has to be longer than 3 characters!": {
    fr: "Le pseudo doit faire plus de 3 caractères !",
    de: "Pseudo muss länger als 3 Zeichen sein!",
    it: "Lo pseudo deve essere più lungo di 3 caratteri!",
    es: "¡El pseudo tiene que tener más de 3 caracteres!"
  },
  "Pseudo is required!": {
    fr: "Un pseudo est requis !",
    de: "Pseudo ist erforderlich!",
    it: "Pseudo è richiesto!",
    es: "Se requiere pseudo!"
  },
  "Profession has to be longer than 3 characters!": {
    fr: "La profession doit faire plus de 3 caractères !",
    de: "Der Beruf muss länger als 3 Zeichen sein!",
    it: "La professione deve essere più lunga di 3 caratteri!",
    es: "¡La profesión debe tener más de 3 caracteres!"
  },
  "Profession is required!": {
    fr: "Une profession est requise !",
    de: "Beruf ist erforderlich!",
    it: "La professione è richiesta!",
    es: "¡Se requiere profesión!"
  },
  "Please select a city": {
    fr: "Sélectionnez une ville",
    de: "Bitte wählen Sie eine Stadt aus",
    it: "Si prega di selezionare una città",
    es: "Por favor seleccione una ciudad"
  },
  "You couldn't teach and learn {lang}": {
    fr: "Vous ne pouvez pas apprendre et enseigner : {lang}",
    de: "Sie konnten nicht {lang} unterrichten und lernen",
    it: "Non potresti insegnare e imparare {lang}",
    es: "No pudiste enseñar y aprender {lang}"
  }
};
