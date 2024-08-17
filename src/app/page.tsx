import { useTranslations } from 'next-intl';


export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div className="content-container flex flex-col items-center w-full pt-[10%]">
      <h1 className='text-slate-800 font-bold text-5xl'>{t('title')}</h1>
      <p className='text-slate-800 font-semibold text-2xl mt-6'>{t('description')}</p>
    </div>
  )









}