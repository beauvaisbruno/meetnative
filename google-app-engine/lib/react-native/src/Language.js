"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = __importDefault(require("./lang"));
class Language {
  static lang(key) {
    if (key === Language.english) return lang_1.default("English");
    if (key === Language.french) return lang_1.default("French");
    if (key === Language.german) return lang_1.default("German");
    if (key === Language.italian) return lang_1.default("Italian");
    if (key === Language.spanish) return lang_1.default("Spanish");
    if (key === Language.dutch) return lang_1.default("Dutch");
    if (key === Language.polish) return lang_1.default("Polish");
    if (key === Language.romanian) return lang_1.default("Romanian");
    if (key === Language.russian) return lang_1.default("Russian");
    if (key === Language.czech) return lang_1.default("Czech");
    if (key === Language.hungarian) return lang_1.default("Hungarian");
    if (key === Language.portuguese) return lang_1.default("Portuguese");
    if (key === Language.greek) return lang_1.default("Greek");
    if (key === Language.swedish) return lang_1.default("Swedish");
    if (key === Language.bulgarian) return lang_1.default("Bulgarian");
    if (key === Language.catalan) return lang_1.default("Catalan");
    if (key === Language.danish) return lang_1.default("Danish");
    if (key === Language.slovak) return lang_1.default("Slovak");
    if (key === Language.finnish) return lang_1.default("Finnish");
    if (key === Language.arabic) return lang_1.default("Arabic");
    if (key === Language.lithuanian) return lang_1.default("Lithuanian");
    if (key === Language.turkish) return lang_1.default("Turkish");
    if (key === Language.galician) return lang_1.default("Galician");
    if (key === Language.slovenian) return lang_1.default("Slovenian");
    if (key === Language.latvian) return lang_1.default("Latvian");
    if (key === Language.croatian) return lang_1.default("Croatian");
    if (key === Language.basque) return lang_1.default("Basque");
    if (key === Language.estonian) return lang_1.default("Estonian");
    if (key === Language.urdu) return lang_1.default("Urdu");
    if (key === Language.irish_gaelic) return lang_1.default("Irish Gaelic");
    if (key === Language.hindi) return lang_1.default("Hindi");
    if (key === Language.chinese) return lang_1.default("Chinese");
    if (key === Language.welsh) return lang_1.default("Welsh");
    if (key === Language.japanese) return lang_1.default("Japanese");
    if (key === Language.maltese) return lang_1.default("Maltese");
    if (key === Language.luxembourgish) return lang_1.default("Luxembourgish");
    if (key === Language.korean) return lang_1.default("Korean");
    if (key === Language.scottish_gaelic)
      return lang_1.default("Scottish Gaelic");
    return lang_1.default(key);
  }
}
Language.english = "english";
Language.french = "french";
Language.german = "german";
Language.italian = "italian";
Language.spanish = "spanish";
Language.dutch = "dutch";
Language.polish = "polish";
Language.romanian = "romanian";
Language.russian = "russian";
Language.czech = "czech";
Language.hungarian = "hungarian";
Language.portuguese = "portuguese";
Language.greek = "greek";
Language.swedish = "swedish";
Language.bulgarian = "bulgarian";
Language.catalan = "catalan";
Language.danish = "danish";
Language.slovak = "slovak";
Language.finnish = "finnish";
Language.arabic = "arabic";
Language.lithuanian = "lithuanian";
Language.turkish = "turkish";
Language.galician = "galician";
Language.slovenian = "slovenian";
Language.latvian = "latvian";
Language.croatian = "croatian";
Language.basque = "basque";
Language.estonian = "estonian";
Language.urdu = "urdu";
Language.irish_gaelic = "irish_gaelic";
Language.hindi = "hindi";
Language.chinese = "chinese";
Language.welsh = "welsh";
Language.japanese = "japanese";
Language.maltese = "maltese";
Language.luxembourgish = "luxembourgish";
Language.korean = "korean";
Language.scottish_gaelic = "scottish_gaelic";
Language.all = [
  Language.english,
  Language.french,
  Language.german,
  Language.italian,
  Language.spanish,
  Language.dutch,
  Language.polish,
  Language.romanian,
  Language.russian,
  Language.czech,
  Language.hungarian,
  Language.portuguese,
  Language.greek,
  Language.swedish,
  Language.bulgarian,
  Language.catalan,
  Language.danish,
  Language.slovak,
  Language.finnish,
  Language.arabic,
  Language.lithuanian,
  Language.turkish,
  Language.galician,
  Language.slovenian,
  Language.latvian,
  Language.croatian,
  Language.basque,
  Language.estonian,
  Language.urdu,
  Language.irish_gaelic,
  Language.hindi,
  Language.chinese,
  Language.welsh,
  Language.japanese,
  Language.maltese,
  Language.luxembourgish,
  Language.korean,
  Language.scottish_gaelic
];
exports.Language = Language;
exports.default = Language;
//# sourceMappingURL=Language.js.map
