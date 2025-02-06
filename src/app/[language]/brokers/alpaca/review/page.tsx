import * as React from 'react';
import { LanguageProps } from '@/models/common/language-props';

import AlpacaReview from '@/components/alpaca/review/review';

export default async function AlpacaReviewPage({ params }: LanguageProps) {
  return (
    <AlpacaReview />
  );
}