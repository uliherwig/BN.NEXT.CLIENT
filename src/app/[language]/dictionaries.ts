import 'server-only'

const dictionaries: { [key: string]: () => Promise<Record<string,string>> } = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
}
 
export const getDictionary = async (locale : string) => dictionaries[locale]()