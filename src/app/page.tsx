import LanguageSwitch from '@/components/LanguageSwitch';
import Menu from '@/components/Menu';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div className="flex">
      <nav>
        <Menu />
      </nav>
      <main className="grid-middle w-full bg-violet-950">
        <div className="flex h-full items-stretch bg-white rounded-lg p-3">
          <div>
            <h1 className='text-blue-500'>{t('title')}</h1>
            <h6 className='text-blue-500'>{t('description')}</h6></div>
        </div>
      </main>
    </div>
  )









}