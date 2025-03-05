import { LanguageProps } from '@/models/common/language-props';
import { redirect } from 'next/navigation';
import * as React from 'react';

export default async function Auth({ params }: LanguageProps) {
  redirect(`/${params.language}/auth/account`);
}