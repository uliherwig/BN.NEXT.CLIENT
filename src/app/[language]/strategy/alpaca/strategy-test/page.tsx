import * as React from 'react';
import { LanguageProps } from '@/app/models/common/language-props';
import StrategyTest from '@/app/components/alpaca/strategy-test/strategy-test';


export default async function AlpacaStrategyTestPage({ params }: LanguageProps) {
  return (
    <div className="w-full h-full" >
      <StrategyTest />
    </div>
  );
}