import LanguageSwitch from '@/components/LanguageSwitch';
import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('Home');
  return <>
  
  <h1 className='text-blue-500'>{t('title')}</h1>
  <h6 className='text-blue-500'>{t('description')}</h6>
  </> 
}