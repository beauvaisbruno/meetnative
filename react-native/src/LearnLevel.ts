import lang from "./lang";

export class LearnLevel {
  static beginner = "beginner";
  static intermediate = "intermediate";
  static fluent = "fluent";
  static all = [
    LearnLevel.beginner,
    LearnLevel.intermediate,
    LearnLevel.fluent
  ];
  static lang(level: string): string {
    if (level === LearnLevel.beginner) return lang("Beginner A1/A2");
    if (level === LearnLevel.intermediate) return lang("Intermediate B1/B2");
    if (level === LearnLevel.fluent) return lang("Fluent C1/C2");
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
        if (langs[a] === LearnLevel.fluent) return -1;
        if (langs[a] === LearnLevel.beginner) return 1;
        if (langs[b] === LearnLevel.fluent) return 1;
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
