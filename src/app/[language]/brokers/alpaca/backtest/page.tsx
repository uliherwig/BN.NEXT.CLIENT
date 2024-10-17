import * as React from 'react';
import "@/app/globals.css";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { getDictionary } from '@/app/lib/dictionaries/dictionaries';
import { LanguageProps } from '@/models/common/language-props';
import TestSettingsForm from '@/components/alpaca/test-settings-form';
import TestList from '@/components/alpaca/test-list';
import TestPositions from '@/components/alpaca/test-results';
import Backtests from '@/components/alpaca/backtests';


export default async function AlpacaSettingsPage({ params }: LanguageProps) {

  const dict = await getDictionary(params.language)
  const session = await getServerSession(authOptions)


  if (session !== null) {
    if (session.user) {
      // console.log("session", session)

    }
  }

  if (session === null) {

    return (
      <div className="content-container flex flex-col items-center w-full pt-[10%]">
        <p className='text-slate-800 font-semibold text-2xl mt-6'>Sie müssen angemeldet sein um diese Funktion zu nutzen.</p>
      </div>
    )


  }


  // eingabe test settings
  // übersicht tests
  // Anzeige test ergebnisse
  // Anzeige positions
  // Anzeige  chart mit positionen/trades

  return (

    <Backtests email={session.user?.email as string} />

  );
}