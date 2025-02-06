import * as React from 'react';
import { LanguageProps } from '@/models/common/language-props';
import Backtests from '@/components/alpaca/strategy-test/back-tests';


export default async function AlpacaStrategyTestPage({ params }: LanguageProps) {
  return (
    <Backtests />
  );
}