import AlpacaHistoryChart from '@/components/alpaca/history-charts/AlpacaHistoryChart';
import * as React from 'react';
import "@/app/globals.css";
import AlpacaAssets from '@/components/alpaca/assets/AlpacaAssets';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/alpaca/dashboard/dashboard';


export default async function AlpacaDashboardPage() {

 
  const session = await getServerSession(authOptions) 

  if (session === null) {
    redirect('/en/brokers');
  }
  return (
    <Dashboard email={session.user?.email as string} />
  );
}