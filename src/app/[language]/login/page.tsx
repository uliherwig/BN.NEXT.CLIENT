import Login from '@/components/account/Login';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import "@/app/globals.css";


export default function UserAccount() {

  const t = useTranslations('Alpaca');
  return (
    <div className="flex bg-slate-100 text-slate-800 content-container w-[50%]">
      <nav className="w-[240px] p-5 border-r border-slate-500">
        <h1 className="text-xl  font-bold mb-4">User Account</h1>
    
        Status: <span className="text-green-500">Active</span>
      </nav>
      <main className="h-full w-full content-container">
        <Login />
      </main>
    </div>

  );
}