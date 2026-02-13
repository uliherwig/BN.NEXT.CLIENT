import * as React from 'react';
import { LanguageProps } from '@/app/models/common/language-props';

import AlpacaReview from '@/app/components/alpaca/review/review';

export default async function AlpacaReviewPage({ params }: LanguageProps) {
  return (
    <AlpacaReview />
  );
}