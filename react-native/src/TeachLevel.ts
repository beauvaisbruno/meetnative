import lang from "./lang";

export class TeachLevel {
  static fluent = "fluent";
  static bilingual = "bilingual";
  static native = "native";

  static all = [TeachLevel.native, TeachLevel.bilingual, TeachLevel.fluent];
  static lang(level: string): string {
    if (level === TeachLevel.native) return lang("Native");
    if (level === TeachLevel.bilingual) return lang("Bilingual");
    if (level === TeachLevel.fluent) return lang("Fluent");
    return lang("Unknow");
  }

  static sortKeysByValue(langs: {
    [p: string]: string;
  }): { [p: string]: string } {
    const resObj: { [p: string]: string } = {};
    const keys = Object.keys(langs);
    keys.sort(
      (a: string, b: string): number => {
        if (langs[a] === langs[b]) return 0;
        if (langs[a] === TeachLevel.native) return -1;
        if (langs[a] === TeachLevel.fluent) return 1;
        if (langs[b] === TeachLevel.native) return 1;
        // if (langs[b] === TeachLevel.fluent)
        return -1;
      }
    );
    keys.forEach(key => {
      resObj[key] = langs[key];
    });
    return resObj;
  }
}
