import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = cookies();
  const storedLanguage = cookieStore.get('bn-trading-app-language');
  const locale = storedLanguage?.value || 'en';
 
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});