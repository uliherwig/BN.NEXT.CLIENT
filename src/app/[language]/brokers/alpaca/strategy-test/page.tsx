import * as React from 'react';
import { LanguageProps } from '@/models/common/language-props';
import StrategyTest from '@/components/alpaca/strategy-test/strategy-test';


export default async function AlpacaStrategyTestPage({ params }: LanguageProps) {
  return (
    <StrategyTest />
  );
}