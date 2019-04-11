"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intl_1 = require("./config/intl");
exports.default = (english, args) => {
    return intl_1.translate(dictionary, english, args);
};
const dictionary = {
    English: { fr: "Anglais", de: "Englisch", it: "Inglese", es: "Inglés" },
    French: { fr: "Français", de: "Französisch", it: "Francese", es: "Francés" },
    German: { fr: "Allemand", de: "Deutsche", it: "Tedesco", es: "Alemán" },
    Italian: { fr: "Italien", de: "Italienisch", it: "Italiano", es: "Italiano" },
    Spanish: { fr: "Espagnol", de: "Spanisch", it: "Spagnolo", es: "Español" },
    Dutch: {
        fr: "Néerlandais",
        de: "Niederländisch",
        it: "Olandese",
        es: "Holandés"
    },
    Polish: { fr: "Polonais", de: "Polieren", it: "Polacco", es: "Polaco" },
    Romanian: { fr: "Roumain", de: "Rumänisch", it: "Rumeno", es: "Rumano" },
    Russian: { fr: "Russe", de: "Russisch", it: "Russo", es: "Ruso" },
    Czech: { fr: "Tchèque", de: "Tschechisch", it: "Ceco", es: "Checo" },
    Hungarian: {
        fr: "Hongrois",
        de: "Ungarisch",
        it: "Ungherese",
        es: "Húngaro"
    },
    Portuguese: {
        fr: "Portugais",
        de: "Portugiesisch",
        it: "Portoghese",
        es: "Portugués"
    },
    Greek: { fr: "Grec", de: "Griechisch", it: "Greco", es: "Griego" },
    Swedish: { fr: "Suédois", de: "Schwedisch", it: "Svedese", es: "Sueco" },
    Bulgarian: { fr: "Bulgare", de: "Bulgarisch", it: "Bulgaro", es: "Búlgaro" },
    Catalan: { fr: "Catalan", de: "Katalanisch", it: "Catalano", es: "Catalán" },
    Danish: { fr: "Danois", de: "Dänisch", it: "Danese", es: "Danés" },
    Slovak: { fr: "Slovaque", de: "Slowakisch", it: "Slovacco", es: "Eslovaco" },
    Finnish: {
        fr: "Finlandais",
        de: "Finnisch",
        it: "Finlandese",
        es: "Finlandés"
    },
    Arabic: { fr: "Arabe", de: "Arabisch", it: "Arabo", es: "Arábica" },
    Lithuanian: {
        fr: "Lituanien",
        de: "Litauisch",
        it: "Lituano",
        es: "Lituano"
    },
    Turkish: { fr: "Turc", de: "Türkisch", it: "Turco", es: "Turco" },
    Galician: { fr: "Galicien", de: "Galizisch", it: "Galiziano", es: "Gallego" },
    Slovenian: { fr: "Slovène", de: "Slowenisch", it: "Sloveno", es: "Esloveno" },
    Latvian: { fr: "Letton", de: "Lettisch", it: "Lettone", es: "Letón" },
    Croatian: { fr: "Croate", de: "Kroatisch", it: "Croato", es: "Croata" },
    Basque: { fr: "Basque", de: "Baskisch", it: "Basco", es: "Vasco" },
    Estonian: { fr: "Estonien", de: "Estnisch", it: "Estone", es: "Estonio" },
    Urdu: { fr: "Ourdou", de: "Urdu", it: "Urdu", es: "Urdu" },
    "Irish Gaelic": {
        fr: "Gaélique Irlandais",
        de: "Irisch-Gälisch",
        it: "Gaelico irlandese",
        es: "Gaélico irlandés"
    },
    Hindi: { fr: "Hindi", de: "Hindi", it: "Hindi", es: "Hindi" },
    Chinese: { fr: "Chinois", de: "Chinesisch", it: "Cinese", es: "Chino" },
    Welsh: { fr: "Gallois", de: "Walisisch", it: "Gallese", es: "Galés" },
    Japanese: {
        fr: "Japonais",
        de: "Japanisch",
        it: "Giapponese",
        es: "Japonés"
    },
    Maltese: { fr: "Maltais", de: "Maltesisch", it: "Maltese", es: "Maltés" },
    Luxembourgish: {
        fr: "Luxembourgeois",
        de: "Luxemburgisch",
        it: "Lussemburghese",
        es: "Luxemburgués"
    },
    Korean: { fr: "Coréen", de: "Koreanisch", it: "Coreano", es: "Coreano" },
    "Scottish Gaelic": {
        fr: "Gaélique Ecossais",
        de: "Schottisch Gälisch",
        it: "Gaelico Scozzese",
        es: "Gaélico escocés"
    },
    "Beginner A1/A2": {
        fr: "Débutant A1/A2",
        de: "Anfänger A1 / A2",
        it: "Principiante A1 / A2",
        es: "Principiante A1 / A2"
    },
    "Intermediate B1/B2": {
        fr: "Intermédiaire B1/B2",
        de: "Mittelstufe B1 / B2",
        it: "Intermedio B1 / B2",
        es: "Intermedio B1 / B2"
    },
    "Fluent C1/C2": {
        fr: "Courant C1/C2",
        de: "Fließend C1 / C2",
        it: "Fluente C1 / C2",
        es: "Fluido C1 / C2"
    },
    Unknow: { fr: "Inconnu", de: "Unbekannt", it: "Unknow", es: "Desconocido" },
    Native: { fr: "Natif", de: "Native", it: "Nativo", es: "Nativo" },
    Bilingual: {
        fr: "Bilingue",
        de: "Zweisprachig",
        it: "Bilingue",
        es: "Bilingüe"
    },
    Fluent: { fr: "Courant", de: "Fließend", it: "Fluente", es: "Fluido" }
};
