import en from './dictionaries/en.json';
import de from './dictionaries/de.json';

const staticDictionaries: { [key: string]: Record<string, string> } = {
  en,
  de,
};

export const getDictionary = (locale: string): Record<string, string> => {
  return staticDictionaries[locale] || staticDictionaries.en;
};