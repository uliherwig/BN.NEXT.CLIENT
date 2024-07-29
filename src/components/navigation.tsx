// src/components/Navigation.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, InformationCircleIcon, RectangleGroupIcon, ChartBarIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid';  

const Navigation = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleView = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="flex flex-col items-start p-6">
      <ul className="space-y-8">
        <li>
          <Link href="/" className="flex items-center space-x-2" title="Home">
              <HomeIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span>{('welcome')}</span>}
      
          </Link>
        </li>
        <li>
          <Link href="/dashboard"className="flex items-center space-x-2" title="Dashboard">
              <RectangleGroupIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span>{('dashboard')}</span>}
          
          </Link>
        </li>
        <li>
          <Link href="/alpaca" className="flex items-center space-x-2" title="Alpaca">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              {expanded && <span>Alpaca</span>}
        
          </Link>
        </li>
      </ul>
      <button onClick={toggleView} className="mt-auto mb-0 flex items-center space-x-2 self-end">
        {expanded ? (
          <ChevronDoubleLeftIcon className="h-8 w-8 text-blue-500" />
        ) : (
          <ChevronDoubleRightIcon className="h-8 w-8 text-blue-500" />
        )}
      
      </button>
    </nav>
  );
};

export default Navigation;