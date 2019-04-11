import { translate } from "../../config/intl";

export default (
  english: string,
  args?: { [key: string]: string | number } | undefined
) => {
  return translate(dictionary, english, args);
};

const dictionary = {
  "Login with your email": {
    fr: "Connexion par email",
    de: "Loggen Sie sich mit Ihrer E-Mail ein",
    it: "Accedi con la tua email",
    es: "Ingresa con tu email"
  },
  Email: { fr: "Email", de: "Email", it: "E-mail", es: "Email" },
  Password: {
    fr: "Mot de passe",
    de: "Passwort",
    it: "Password",
    es: "Contraseña"
  },
  Login: {
    fr: "Se connecter",
    de: "Anmeldung",
    it: "Accesso",
    es: "Iniciar sesión"
  },
  "Forgotten password": {
    fr: "Mot de passe oublié",
    de: "Passwort vergessen",
    it: "Password dimenticata",
    es: "Contraseña olvidada"
  },
  "E-mail is not valid!": {
    fr: "Email mal formaté !",
    de: "Email ist ungültig!",
    it: "L'email non è valida!",
    es: "¡El correo no es válido!"
  },
  "E-mail is required!": {
    fr: "Email requis",
    de: "E-Mail ist erforderlich!",
    it: "E-mail è richiesta!",
    es: "¡Correo electronico es requerido!"
  },
  "Password has to be longer than 6 characters!": {
    fr: "Le mot de passe doit avoir au moins 6 caractères !",
    de: "Das Passwort muss länger als 6 Zeichen sein!",
    it: "La password deve essere più lunga di 6 caratteri!",
    es: "¡La contraseña debe tener más de 6 caracteres!"
  },
  "Password is required!": {
    fr: "Mot de passe requis !",
    de: "Passwort wird benötigt!",
    it: "E 'richiesta la password!",
    es: "¡Se requiere contraseña!"
  },
  "Login with Facebook": {
    fr: "Connexion avec Facebook",
    de: "Mit Facebook einloggen",
    it: "Accedi con facebook",
    es: "Iniciar sesión con Facebook"
  },
  "Sign in impossible": {
    fr: "Connexion impossible",
    de: "Anmeldung unmöglich",
    it: "Accedi impossibile",
    es: "Inicia sesión imposible"
  },
  "Login with Google": {
    fr: "Connexion avec Google",
    de: "Mit Google anmelden",
    it: "Accedi con Google",
    es: "Inicia sesión con Google"
  },
  "Connection impossible : internet is not available.": {
    fr: "Connexion impossible : internet non disponible.",
    de: "Verbindung unmöglich: Internet ist nicht verfügbar.",
    it: "Connessione impossibile: internet non è disponibile.",
    es: "Conexión imposible: internet no está disponible."
  },
  "Connection impossible.": {
    fr: "Connexion impossible.",
    de: "Verbindung unmöglich",
    it: "Connessione impossibile.",
    es: "Conexión imposible."
  },
  "This email account exist, but the password is wrong.": {
    fr: "Cet email existe, mais le mot de passe est erroné.",
    de: "Dieses E-Mail-Konto ist vorhanden, das Passwort ist jedoch falsch.",
    it: "Questo account e-mail esiste, ma la password è sbagliata.",
    es:
      "Esta cuenta de correo electrónico existe, pero la contraseña es incorrecta."
  },
  "The password is too weak.": {
    fr: "Le mot de passe est trop faible.",
    de: "Das Passwort ist zu schwach.",
    it: "La password è troppo debole.",
    es: "La contraseña es demasiado débil."
  },
  "The email address is not valid.": {
    fr: "L'adresse email est mal formaté.",
    de: "Die E-Mail-adresse ist nicht gültig.",
    it: "L'indirizzo email non è valido.",
    es: "La dirección de correo electrónico no es válida."
  },
  "The connection is impossible.": {
    fr: "La connexion est impossible.",
    de: "Die Verbindung ist unmöglich.",
    it: "La connessione è impossibile.",
    es: "La conexión es imposible."
  },
  "Reset password": {
    fr: "Réinitialisation mot de passe",
    de: "Passwort zurücksetzen",
    it: "Resetta la password",
    es: "Restablecer la contraseña"
  },
  "Instruction has been sent to your email: {email}": {
    fr: "Suivez les instructions envoyées sur votre email: {email}",
    de: "Anweisung wurde an Ihre E-Mail gesendet: {email}",
    it: "L'istruzione è stata inviata alla tua email: {email}",
    es: "La instrucción ha sido enviada a su correo electrónico: {email}"
  },
  OK: { fr: "OK", de: "OK", it: "OK", es: "OK" },
  "The reset is impossible.": {
    fr: "Réinitialisation impossible.",
    de: "Das Zurücksetzen ist nicht möglich.",
    it: "Il reset è impossibile.",
    es: "El reinicio es imposible."
  },
  "This email account doesn't exist.": {
    fr: "Ce compte email n'existe pas.",
    de: "Dieses E-Mail-Konto existiert nicht.",
    it: "Questo account email non esiste.",
    es: "Esta cuenta de correo electrónico no existe."
  },
  "Reset the password": {
    fr: "Réinitialiser le mot de passe",
    de: "Setzen Sie das Passwort zurück",
    it: "Reimposta la password",
    es: "Restablecer la contraseña"
  }
};
