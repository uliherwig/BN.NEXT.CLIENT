import * as React from 'react';

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { LanguageProps } from '@/models/common/language-props';
import Backtests from '@/components/alpaca/strategy-test/back-tests';
import { redirect } from 'next/navigation';


export default async function AlpacaStrategyTestPage({ params }: LanguageProps) {

  const session = await getServerSession(authOptions) 

  if (session === null) {
    redirect('/en/brokers')
  }
  return (
    <Backtests />
  );
}