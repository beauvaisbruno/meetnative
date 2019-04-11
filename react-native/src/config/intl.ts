import MessageFormat from "messageformat";

export const changeLocale = (pLocale: string) => {
  lLocale = pLocale;
  mf = new MessageFormat(pLocale);
};
let lLocale = "en";
let mf = new MessageFormat(lLocale);

function format(msgSrc: string, args = {}) {
  return mf.compile(msgSrc)(args);
}

export const translate = (
  dictionary: { [key: string]: { [key: string]: string } },
  english: string,
  args?: { [key: string]: string | number }
) => {
  if (lLocale === "en" || !dictionary[english] || !dictionary[english][lLocale])
    return format(english, args);
  return format(dictionary[english][lLocale], args);
};

export const locale = (): string => lLocale;
