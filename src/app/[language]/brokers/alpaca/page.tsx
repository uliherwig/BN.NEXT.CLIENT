import * as React from 'react';
import "@/app/globals.css";
import { redirect } from 'next/navigation';

export default function Alpaca() {
  redirect('/en/brokers/alpaca/info');
 
}