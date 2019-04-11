import lang from "./lang";

export class Language {
  static english = "english";
  static french = "french";
  static german = "german";
  static italian = "italian";
  static spanish = "spanish";
  static dutch = "dutch";
  static polish = "polish";
  static romanian = "romanian";
  static russian = "russian";
  static czech = "czech";
  static hungarian = "hungarian";
  static portuguese = "portuguese";
  static greek = "greek";
  static swedish = "swedish";
  static bulgarian = "bulgarian";
  static catalan = "catalan";
  static danish = "danish";
  static slovak = "slovak";
  static finnish = "finnish";
  static arabic = "arabic";
  static lithuanian = "lithuanian";
  static turkish = "turkish";
  static galician = "galician";
  static slovenian = "slovenian";
  static latvian = "latvian";
  static croatian = "croatian";
  static basque = "basque";
  static estonian = "estonian";
  static urdu = "urdu";
  static irish_gaelic = "irish_gaelic";
  static hindi = "hindi";
  static chinese = "chinese";
  static welsh = "welsh";
  static japanese = "japanese";
  static maltese = "maltese";
  static luxembourgish = "luxembourgish";
  static korean = "korean";
  static scottish_gaelic = "scottish_gaelic";

  static all = [
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
  static lang(key: string): string {
    if (key === Language.english) return lang("English");
    if (key === Language.french) return lang("French");
    if (key === Language.german) return lang("German");
    if (key === Language.italian) return lang("Italian");
    if (key === Language.spanish) return lang("Spanish");
    if (key === Language.dutch) return lang("Dutch");
    if (key === Language.polish) return lang("Polish");
    if (key === Language.romanian) return lang("Romanian");
    if (key === Language.russian) return lang("Russian");
    if (key === Language.czech) return lang("Czech");
    if (key === Language.hungarian) return lang("Hungarian");
    if (key === Language.portuguese) return lang("Portuguese");
    if (key === Language.greek) return lang("Greek");
    if (key === Language.swedish) return lang("Swedish");
    if (key === Language.bulgarian) return lang("Bulgarian");
    if (key === Language.catalan) return lang("Catalan");
    if (key === Language.danish) return lang("Danish");
    if (key === Language.slovak) return lang("Slovak");
    if (key === Language.finnish) return lang("Finnish");
    if (key === Language.arabic) return lang("Arabic");
    if (key === Language.lithuanian) return lang("Lithuanian");
    if (key === Language.turkish) return lang("Turkish");
    if (key === Language.galician) return lang("Galician");
    if (key === Language.slovenian) return lang("Slovenian");
    if (key === Language.latvian) return lang("Latvian");
    if (key === Language.croatian) return lang("Croatian");
    if (key === Language.basque) return lang("Basque");
    if (key === Language.estonian) return lang("Estonian");
    if (key === Language.urdu) return lang("Urdu");
    if (key === Language.irish_gaelic) return lang("Irish Gaelic");
    if (key === Language.hindi) return lang("Hindi");
    if (key === Language.chinese) return lang("Chinese");
    if (key === Language.welsh) return lang("Welsh");
    if (key === Language.japanese) return lang("Japanese");
    if (key === Language.maltese) return lang("Maltese");
    if (key === Language.luxembourgish) return lang("Luxembourgish");
    if (key === Language.korean) return lang("Korean");
    if (key === Language.scottish_gaelic) return lang("Scottish Gaelic");

    return lang(key);
  }
}
export default Language;
