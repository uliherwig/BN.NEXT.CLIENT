"use client"
import "../app/globals.css";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Navigation = () => {
  const [expanded, setExpanded] = useState(true);
  const t = useTranslations('Navigation');

  const toggleView = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="p-4 pr-8 px flex flex-col">
      <ul className="space-y-4  py-4  border-t border-b border-slate-400">
        <li>
          <Link href="/" className="grid grid-cols-[20px_auto] items-center gap-2" title="Home">
              <HomeIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span className='text-base'>{t('home')}</span>}
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="grid grid-cols-[20px_auto] items-center gap-2" title="Dashboard">
              <DashboardIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span className='text-base'>{t('dashboard')}</span>}
          </Link>
        </li>
        <li>
          <Link href="/alpaca" className="grid grid-cols-[20px_auto] items-center gap-2" title="Alpaca">
              <BarChartIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span className='text-base'>{t('alpaca')}</span>}
          </Link>
        </li>
      </ul>
      <button onClick={toggleView} className="flex justify-end items-end my-4">
        {!expanded ? (
          <ChevronRightIcon className="h-8 w-8 text-blue-500" />
        ) : (
          <ChevronLeftIcon className="h-8 w-8 text-blue-500" />
        )}
      </button>
    </div>
  );
};

export default Navigation;