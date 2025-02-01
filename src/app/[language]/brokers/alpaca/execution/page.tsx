import * as React from 'react';
import "@/app/globals.css";
import { authOptions } from '@/app/lib/auth';
import Dashboard from '@mui/icons-material/Dashboard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AlpacaExec from '@/components/alpaca/execution/alpaca-execution';
import { AlpacaAccountModel } from '@/models/alpaca/alpaca-account-model';
import { ExecutionModel } from '@/models/strategy/execution-model';


export default async function AlpacaExecution() {

  const session = await getServerSession(authOptions)

  let executionModel = {} as ExecutionModel;


  if (session === null) {
    redirect('/en/brokers');
  } 
  return (
    <AlpacaExec />
  );
}