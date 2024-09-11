import 'server-only'

const dictionaries: { [key: string]: () => Promise<Record<string,string>> } = {
  en: () => import('./en.json').then((module) => module.default),
  de: () => import('./de.json').then((module) => module.default),
}
 
export const getDictionary = async (locale : string) => dictionaries[locale]()