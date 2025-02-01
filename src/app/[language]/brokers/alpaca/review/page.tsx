import * as React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { LanguageProps } from '@/models/common/language-props';
import { redirect } from 'next/navigation';
import AlpacaReview from '@/components/alpaca/review/review';

export default async function AlpacaReviewPage({ params }: LanguageProps) {

  const session = await getServerSession(authOptions) 

  if (session === null) {
    redirect(`/${params.language}/brokers`)
  }
  return (
    <AlpacaReview />
  );
}