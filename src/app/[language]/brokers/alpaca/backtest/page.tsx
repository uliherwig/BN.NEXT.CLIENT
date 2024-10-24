import * as React from 'react';
import "@/app/globals.css";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { LanguageProps } from '@/models/common/language-props';
import Backtests from '@/components/alpaca/back-tests';
import { redirect } from 'next/navigation';


export default async function AlpacaSettingsPage({ params }: LanguageProps) {

  const session = await getServerSession(authOptions) 

  if (session === null) {
    redirect('/en/brokers');
    return null;
  }
  return (
    <Backtests email={session.user?.email as string} />
  );
}